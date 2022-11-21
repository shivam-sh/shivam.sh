import { useEffect, useState } from 'react';

const Logo = (props) => {

    const [isDark, setIsDark] = useState(false);
  
    const updateColours = () => setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)")
            .addEventListener('change', updateColours);
  
    useEffect(updateColours, []);
  
    let foregroundColor = isDark ? '#EEEEEE' : '#232323';
    let accentColor = isDark ? '#40A3FF' : '#FE3F26';
  
    let shadowOffset = isDark ? 1 : 0;
    let shadowSize = isDark ? 1 : 0;
  
  return (
    <div
    {...props}
    >
          <S foregroundColor={foregroundColor} accentColor={accentColor} shadowOffset={shadowOffset} shadowSize={shadowSize} />
          <H foregroundColor={foregroundColor} accentColor={accentColor} shadowOffset={shadowOffset} shadowSize={shadowSize}/>
    </div>
  )
}

export default Logo;

export const S = (props) => (
  <svg
    width={36}
    height={38}
    viewBox="0 0 36 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 7.79c0-1.89 0-2.834.395-3.365a2 2 0 0 1 1.448-.8c.66-.053 1.46.45 3.06 1.455l19.6 12.312c.546.344.82.516 1.018.748a2 2 0 0 1 .388.702c.091.292.091.614.091 1.26v6.109c0 1.889 0 2.833-.395 3.364a2 2 0 0 1-1.448.8c-.66.052-1.46-.45-3.06-1.455l-19.6-12.312c-.546-.344-.82-.516-1.018-.748a2 2 0 0 1-.388-.702C4 14.867 4 14.544 4 13.898V7.789Z"
      fill={props.accentColor}
    />
    {/* <g filter="url(#a)"> */}
      <path
        d="M13.555 32c-3.955 0-5.932 0-6.522-.611a2 2 0 0 1-.47-1.987c.255-.81 2.024-1.695 5.561-3.464l13.245-6.622c1.533-.767 2.3-1.15 2.923-1.058a2 2 0 0 1 1.347.832c.361.516.361 1.373.361 3.088V28.8c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C28.48 32 27.92 32 26.8 32H13.555Z"
        fill={props.foregroundColor}
      />
    {/* </g> */}
    {/* <g filter="url(#b)"> */}
      <path
        d="M4 5.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C5.52 2 6.08 2 7.2 2h13.245c3.955 0 5.932 0 6.522.611a2 2 0 0 1 .47 1.987c-.255.81-2.024 1.695-5.561 3.464L8.63 14.685c-1.533.766-2.3 1.15-2.923 1.057a2 2 0 0 1-1.347-.832C4 14.394 4 13.537 4 11.822V5.2Z"
        fill={props.foregroundColor}
      />
    {/* </g> */}
    <defs>
      <filter
        id="a"
        x={4.472}
        y={16.244}
        width={31.528}
        height={21.756}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx={props.shadowOffset} dy={props.shadowOffset} />
        <feGaussianBlur stdDeviation={props.shadowSize} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_901_153" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_901_153"
          result="shape"
        />
      </filter>
      <filter
        id="b"
        x={2}
        y={0}
        width={31.528}
        height={21.756}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx={props.shadowOffset} dy={props.shadowOffset} />
        <feGaussianBlur stdDeviation={props.shadowSize} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_901_153" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_901_153"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export const H = (props) => (
  <svg
    width={38}
    height={38}
    viewBox="0 0 38 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x={2} y={12} width={30} height={10} rx={2} fill={props.accentColor} />
    {/* <g filter="url(#a)"> */}
      <rect x={2} y={2} width={10} height={30} rx={2} fill={props.foregroundColor} />
    {/* </g> */}
    {/* <g filter="url(#b)"> */}
      <rect x={22} y={2} width={10} height={30} rx={2} fill={props.foregroundColor} />
    {/* </g> */}
    <defs>
      <filter
        id="a"
        x={0}
        y={0}
        width={18}
        height={38}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx={props.shadowOffset} dy={props.shadowOffset} />
        <feGaussianBlur stdDeviation={props.shadowSize} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_901_154" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_901_154"
          result="shape"
        />
      </filter>
      <filter
        id="b"
        x={20}
        y={0}
        width={18}
        height={38}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx={props.shadowOffset} dy={props.shadowOffset} />
        <feGaussianBlur stdDeviation={props.shadowSize} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_901_154" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_901_154"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
