import React, { useState } from "react";

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  click: () => void;
  isOpen: boolean;
}

const Button = ({ click, isOpen }: ButtonProps) => {
  const handleClick = () => {
    click();
  };
  return (
    <div className="fixed right-10 bottom-30 font-bold underline bottom-20">
      <button
        className={`chatbot cursor-pointer bg-black bg-70% bg-center bg-no-repeat fixed right-0 bottom-5 font-bold right-10 bottom-5 w-12 h-12 rounded-full ${
          isOpen
            ? "bg-[url(/src/assets/img/chat_close.png)]"
            : "bg-[url(/src/assets/img/chat_bubble.png)]"
        }`}
        onClick={handleClick}
      ></button>
    </div>
  );
};

export default Button;
