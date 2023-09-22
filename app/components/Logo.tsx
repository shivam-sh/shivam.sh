const Logo = (props) => {
  let shadowoffset = 0;
  let shadowsize = 0;

  return (
    <div {...props}>
      <S shadowoffset={shadowoffset} shadowsize={shadowsize} />
    </div>
  );
};

export default Logo;

export const S = (props) => (
  <svg width={36} height={38} viewBox="0 0 36 38" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M13.555 32c-3.955 0-5.932 0-6.522-.611a2 2 0 0 1-.47-1.987c.255-.81 2.024-1.695 5.561-3.464l13.245-6.622c1.533-.767 2.3-1.15 2.923-1.058a2 2 0 0 1 1.347.832c.361.516.361 1.373.361 3.088V28.8c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C28.48 32 27.92 32 26.8 32H13.555Z" />
    <path d="M4 5.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C5.52 2 6.08 2 7.2 2h13.245c3.955 0 5.932 0 6.522.611a2 2 0 0 1 .47 1.987c-.255.81-2.024 1.695-5.561 3.464L8.63 14.685c-1.533.766-2.3 1.15-2.923 1.057a2 2 0 0 1-1.347-.832C4 14.394 4 13.537 4 11.822V5.2Z" />
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
        <feOffset dx={props.shadowoffset} dy={props.shadowoffset} />
        <feGaussianBlur stdDeviation={props.shadowsize} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_901_153" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_901_153" result="shape" />
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
        <feOffset dx={props.shadowoffset} dy={props.shadowoffset} />
        <feGaussianBlur stdDeviation={props.shadowsize} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_901_153" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_901_153" result="shape" />
      </filter>
    </defs>
  </svg>
);
