import  { useState } from "react";
import { Button, ChatBot } from "chatbot-react-rollup";

function App(): JSX.Element {
  const [displayChat, setDisplayChat] = useState<boolean>(true);

  const toggleDisplay = (): void => {
    setDisplayChat(!displayChat);
  };

  return (
    <div className="App">
      <div>
        <div>{displayChat ? <ChatBot brandName="CHATBOT TEST" width="400" botApiUrl="https://chatbot-server-rmcs.onrender.com/api/v1/agent/text-input"/> : null}</div>
        <Button  click={toggleDisplay} />
      </div>
    </div>
  );
}

export default App;