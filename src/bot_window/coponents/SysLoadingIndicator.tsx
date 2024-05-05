/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import root from 'react-shadow/emotion';

const offset = 187;
const duration = 1.4; // Duration is specified in seconds

// Keyframes for rotating the entire spinner
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(270deg);
  }
`;

// Keyframes for the dash effect
const dash = keyframes`
  0% {
    stroke-dashoffset: ${offset};
  }
  50% {
    stroke-dashoffset: ${offset / 4};
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: ${offset};
    transform: rotate(450deg);
  }
`;

// Keyframes for color changes
const colorChange = keyframes`
  0% {
    stroke: #0047AB;
  }
  25% {
    stroke: #1C2321;
  }
  50% {
    stroke: #7D98A1;
  }
  75% {
    stroke: #E8E8E8;
  }
  100% {
    stroke: #2964c7;
  }
`;

// CSS for the spinner container
const spinnerContainerCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500px; // Specified height for container
  position: relative;
  animation: ${rotate} ${duration}s linear infinite;
`;

// CSS for the path within the spinner
const pathCss = css`
  stroke-dasharray: ${offset};
  stroke-dashoffset: 0;
  transform-origin: center;
  animation:
          ${dash} ${duration}s ease-in-out infinite,
          ${colorChange} ${duration * 4}s ease-in-out infinite;
`;

function SysLoadingSpinner() {
  return (
    <root.section css={spinnerContainerCss} style={{display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '500px',
      backgroundColor: 'transparent',
      position: 'relative'}}>
      <svg width="50" height="50" viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
          css={pathCss}
        />
      </svg>
    </root.section>
  );
}


export default SysLoadingSpinner;
