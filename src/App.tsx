import React, { useState, useEffect } from "react";
import ChatBot from "./components/ChatBot";
import Button from "./components/Button";
import "./App.css";

const App = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const handleResize = () => {
    setScreenSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDisplay = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="App">
      <div>
        <div>
          {isOpen ? (
            <ChatBot
              brandName="CHATBOT TEST"
              botApiUrl="https://chatbot-server-rmcs.onrender.com/api/v1/agent/text-input"
              click={toggleDisplay}
            />
          ) : null}
        </div>
        <div className={`${isOpen && screenSize < 960 ? "hidden" : ""}`}>
          <Button click={toggleDisplay} isOpen={isOpen} />
        </div>
      </div>
    </div>
  );
};

export default App;
