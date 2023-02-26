import { ColorContext, colors } from 'assets/ColorPicker';
import { useContext } from 'react';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';

export default function Blob({ window }) {
  const { setColor } = useContext(ColorContext);
  const mesh = useRef<THREE.Mesh>();
  const hover = useRef(false);
  const click = useRef(false);
  const uniforms = useMemo(
    () => ({
      u_intensity: { value: 0.01 },
      u_time: { value: 0 },
    }),
    []
  );

  let timeStep = 0.001;

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
      const hoverMultiplier = hover.current ? 1.2 : 1;
      const clickMultiplier = click.current ? 1.5 : 1;

      uniforms.u_intensity.value = MathUtils.lerp(
        uniforms.u_intensity.value,
        0.5 * hoverMultiplier * clickMultiplier,
        0.1
      );

      uniforms.u_time.value += timeStep;
    }
  });

  if (mesh !== undefined) {
    
  }

  return (
    <mesh
      // @ts-ignore - mesh.current is incorrectly typed, shouldn't be null anyways
      ref={mesh}
      scale={1.2}
      position={[0, 0, 0]}
      onPointerOver={() => (hover.current = true)}
      onPointerOut={() => (hover.current = false)}
      onPointerDown={() => {
        click.current = true;
        timeStep = 0.003;
      }}
      onPointerUp={() => {
        click.current = false;
        timeStep = 0.001;

        const color =
          colors.accent[Math.floor(Math.random() * colors.accent.length)];
        setColor(color);
      }}
    >
      <icosahedronGeometry args={[2, 8]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={true}
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

varying vec2 vUv;
varying float vDisplacement;

void main() {
    vec3 color = vec3(abs(vUv - 0.5) * 2.0, 0.9);
    float gray = dot(color, vec3(0.299, 0.587, 0.114));
    color = vec3(gray);
    gl_FragColor = vec4(color, 0.2);
}
`;
