import React, { useState } from "react";
import ChatBot from "./components/ChatBot";
import Button from "./components/Button";
import "./App.css";

const App = (): JSX.Element => {
  const [displayChat, setDisplayChat] = useState<boolean>(true);

  const toggleDisplay = (): void => {
    setDisplayChat(!displayChat);
  };

  return (
    <div className="App">
      <div>
        <div>
          {displayChat ? (
            <ChatBot
              brandName="CHATBOT TEST"
              botApiUrl="https://chatbot-server-rmcs.onrender.com/api/v1/agent/text-input"
              click={toggleDisplay}
            />
          ) : null}
        </div>
        <Button click={toggleDisplay} />
      </div>
    </div>
  );
};

export default App;
