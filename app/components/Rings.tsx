'use client';

import { AppContext } from 'app/components/AppContextController';
import { useContext } from 'react';
import { MathUtils } from 'three';
import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import useWindowSize from 'app/lib/useWindowSize';

type RingsProps = {
  innerDiameter: number;
  thickness: number;
  opacity: number;
  intensity: number;
  timeOffset: number;
};

export default function Rings(props) {
  let rings: Array<RingsProps> = [];
  for (let i = 0; i < 5; i++) {
    let size = 0.2 * i + 0.1 * (0.5 - Math.random());
    let offset = 0.1 * (0.5 - Math.random());

    rings.push({
      innerDiameter: (1 + 2 * size) ** 2,
      thickness: (0.05 - size * 0.05) ** 1.1,
      opacity: 0.8 - size ** 2,
      intensity: 1 - size * 0.8,
      timeOffset: size * 2 + offset
    });
  }

  return (
    <Canvas {...props}>
      {rings.map((ring, index) => {
        return (
          <Ring
            key={index}
            position={[0, 0, 0]}
            innerDiameter={ring.innerDiameter}
            thickness={ring.thickness}
            opacity={ring.opacity}
            intensity={ring.intensity}
            timeOffset={ring.timeOffset}
          />
        );
      })}
    </Canvas>
  );
}

function Ring(props) {
  const window = useWindowSize({ defaultSize: { width: 0, height: 0 } });
  const { incrementAccent } = useContext(AppContext);
  const mesh = useRef<THREE.Mesh | null>(null);
  const click = useRef(false);
  const uniforms = useMemo(
    () => ({
      u_intensity: { value: props.intensity },
      u_time: { value: props.timeOffset },
      u_opacity: { value: props.opacity }
    }),
    [props.intensity, props.timeOffset, props.opacity]
  );

  let timeStep = 0.0005;

  useFrame(({ camera }) => {
    if (camera.view === null || camera.view.offsetX !== -window.width * 0.5) {
      camera.setViewOffset(
        window.width,
        window.height,
        -window.width * 0.5,
        0,
        window.width,
        window.height
      );
    }

    if (mesh.current) {
      const clickMultiplier = click.current ? 1.5 : 1;

      uniforms.u_intensity.value = MathUtils.lerp(
        uniforms.u_intensity.value,
        0.5 * clickMultiplier,
        0.1
      );

      uniforms.u_time.value += timeStep;
    }
  });

  return (
    <mesh
      ref={mesh}
      scale={1.2}
      position={[0, 0, 0]}
      onPointerDown={() => {
        click.current = true;
        timeStep = 0.003;
      }}
      onPointerUp={() => {
        click.current = false;
        timeStep = 0.001;

        incrementAccent();
      }}
      {...props}
    >
      <ringGeometry
        args={[
          props.innerDiameter,
          props.innerDiameter + props.thickness,
          Math.floor(100 * props.innerDiameter)
        ]}
      />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={true}
        transparent={true}
        wireframe={false}
      />
    </mesh>
  );
}

const vertexShader = `
uniform float u_intensity;
uniform float u_time;

varying vec2 vUv;
varying float vDisplacement;

float hash(float n) {
    return fract(sin(n) * 43758.5453123);
}

float mix(float x, float y, float a) {
    float k = 1.0 - cos(a * 3.1415927);
    float f = k * 0.5;
    return x * (1.0 - f) + y * f;
}

float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float n = i.x + i.y * 57.0 + 113.0 * i.z;
    return mix(
        mix(
            mix(
                hash(n + 0.0),
                hash(n + 1.0),
                f.x
            ),
            mix(
                hash(n + 57.0),
                hash(n + 58.0),
                f.x
            ),
            f.y
        ),
        mix(
            mix(
                hash(n + 113.0),
                hash(n + 114.0),
                f.x
            ),
            mix(
                hash(n + 170.0),
                hash(n + 171.0),
                f.x
            ),
            f.y
        ),
        f.z
    );
}

void main() {
    vUv = uv;
    vDisplacement = noise(position + vec3(2.0 * u_time));
    vec3 newPosition = position + normal * vDisplacement * u_intensity;
    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}
`;

const fragmentShader = `
uniform float u_intensity;
uniform float u_time;
uniform float u_opacity;

varying vec2 vUv;
varying float vDisplacement;

void main() {
  vec3 color = vec3(0.5); // Set the base color to grey
  float alpha = u_opacity; // Set the desired transparency level

  gl_FragColor = vec4(color, alpha);
}
`;
