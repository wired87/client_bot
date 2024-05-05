/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import root from 'react-shadow/emotion';

const loadingC = keyframes`
  0%, 100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
`;

const spinnerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 100%;  // Breite auf 100% gesetzt für bessere Darstellung im Container
`;

const wrapper = css`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;  
  height: 20px;
  padding: 5px  15px;
  border-radius: 5px;
  text-align: center;
  background-color: #d8d8d8;
`;

const line = (delay:  number) => css`
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 15px;
  background-color: #000000;
  animation: ${loadingC} 0.6s ${delay}s linear infinite;
`;

function MessageLoadingAnimation() {
  return (
    <root.section css={wrapper}>
      <div css={spinnerStyle}>
        <div css={line(0)}></div>
        <div css={line(0.2)}></div>
        <div css={line(0.4)}></div>
      </div>
    </root.section>
  );
}

export default MessageLoadingAnimation;
