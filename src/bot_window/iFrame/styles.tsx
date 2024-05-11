import React from 'react';

export const getStyles = () => {
  return (
    <style>
      {`
        /* Keyframes for rotating the entire spinner */
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(270deg);
          }
        }

        /* Keyframes for the dash effect */
        @keyframes dash {
          0% {
            stroke-dashoffset: 187;
          }
          50% {
            stroke-dashoffset: 46.75; /* This is offset/4 assuming offset = 187 */
            transform: rotate(135deg);
          }
          100% {
            stroke-dashoffset: 187;
            transform: rotate(450deg);
          }
        }

        /* Keyframes for color changes */
        @keyframes colorChange {
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
            stroke: #2964C7;
          }
        }

        /* CSS for the spinner container */
        .spinner-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 500px; /* Specified height for container */
          position: relative;
          animation: rotate 1.4s linear infinite; /* Assuming duration = 1.4s */
        }

        /* CSS for the path within the spinner */
        .spinner-path {
          stroke-dasharray: 187;
          stroke-dashoffset: 0;
          transform-origin: center;
          animation:
            dash 1.4s ease-in-out infinite,
            colorChange 5.6s ease-in-out infinite; /* Assuming duration * 4 = 5.6s */
        }
      `}
    </style>
  );
}



export const getLoadingDotsStyles = () => {
  return (
    <style>
      {`
        @keyframes loadingC {
          0%, 100% {
            transform: scale(0);
          }
          50% {
            transform: scale(1);
          }
        }

        .spinnerStyle {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 30px;
          width: 100%;  /* Width set to 100% for better display in the container */
        }

        .wrapper {
          display: flex;
          align-items: center;
          justify-content: space-around;
          width: 100%;
          height: 20px;
          padding: 5px 15px;
          border-radius: 5px;
          text-align: center;
          background-color: transparent;
        }

        .line {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 15px;
          background-color: #000000;
          animation: loadingC 0.6s linear infinite;
        }
        .delay0 {
          animation-delay: 0s;
        }
        .delay2 {
          animation-delay: 0.2s;
        }
        .delay4 {
          animation-delay: 0.4s;
        }
      `}
    </style>
  );
}

