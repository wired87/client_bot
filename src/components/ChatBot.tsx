import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import TypingAnimation from "./TypingAnimation";
import moment from "moment";

export interface ChatBotProps {
  brandName: string;
  botApiUrl: string;
  click: () => void;
}

const ChatBot = ({ brandName, botApiUrl, click }: ChatBotProps) => {
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState([
    {
      message: "Welcome! I'm your chatbot assistant! Welcome! I'm your chatbot assistant! Welcome! I'm your chatbot assistant!Welcome! I'm your chatbot assistant!",
      type: "bot",
      time: moment().format("HH:mm:ss"),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messageEl = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    const handleNodeInserted = (event: Event) => {};
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event: Event) => {
        const target = event.currentTarget as HTMLDivElement;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }

    return () => {
      if (messageEl.current) {
        messageEl.current.removeEventListener(
          "DOMNodeInserted",
          handleNodeInserted,
        );
      }
    };
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentHour = moment().format("HH:mm:ss");

    setChatLog((prevChatLog: any) => [
      ...prevChatLog,
      { type: "user", message: inputValue, time: currentHour },
    ]);

    sendMessage(inputValue);

    setInputValue("");
  };

  const sendMessage = (message: string) => {
    const url = botApiUrl;

    const data = { message: message };

    setIsLoading(true);

    axios
      .post(url, data)
      .then((response) => {
        setChatLog((prevChatLog: any) => [
          ...prevChatLog,
          { type: "bot", message: response.data.data.fulfillmentText },
        ]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  return (
    <div
      className={`absolute md:w-40 w-full md:bottom-24 h-screen md:h-auto lg:h-auto bottom-0 md:right-9 lg:right-10 sm: rounded-0 md: rounded-2xl lg:rounded-xl bg-stone-5 xl:rounded-2xl shadow-md`}
    >

      <div className="flex sm:-rounded-t-0 md:rounded-t-xl lg:rounded-t-xl lg:rounded-y-2xl w-full py-4 bg-black ">
        <h1 className="text-white px-5 2xl">{brandName}</h1>
        <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" data-dropdown-placement="bottom-start" className="inline-flex  right-10 top-2 absolute self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" type="button">
      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
         <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
      </svg>
   </button>
        <button
          onClick={click}
          className=" absolute text-xl py-2 text-white text-white w-fit px-5 right-0 top-0"
        >
          x
        </button>
      </div>
      <div className="mb-20 ">
        <div
          className="flex flex-col md:h-[50vh] space-y-4 w-full overflow-y-scroll overflow-x-hidden  mb-14"
          ref={messageEl}
        >
          {chatLog.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex relative" >

              { message.type === "bot" ?<div className="absolute bottom-0 w-8 h-8 mr-5  rounded-full bg-no-repeat bg-center bg-70% bg-[url(/src/assets/img/logo.png)]"> </div>:<div></div>}
                <div
                  className={`${
                    message.type === "user"
                      ? "bg-black text-left text-white mx-2 ml-4 rounded-t-xl rounded-bl-xl"
                      : "bg-customBlue text-left rounded-t-xl mx-2 mr-4 ml-8 rounded-br-xl"
                  } px-4  py-1 break-keep text-black max-w-sm`}
                >
                  {message.type === "user" ? message.message : message.message}
                </div>
                <div className="text-center text-gray-300 mx-2 ml-4 rounded-t-xl rounded-bl-xl">
                  {/* {message.time} */}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div key={chatLog.length} className="flex justify-start">
              <div className="bg-customBlue text-left rounded-t-xl mx-2 p-3 mr-4 rounded-br-xl">
                <TypingAnimation />
              </div>
            </div>
          )}
        </div>
      </div>
      <>
      


      </>
      <form
        onSubmit={handleSubmit}
        className="absolute mb-3 sm:bottom-0 w-full flex-none p-3 bottom-0 border-1  border-t-2 border-t-gray-100"
      >
        <div className="flex rounded-lg ">
          <input
            type="text"
            className="flex-grow px-4 py-2 bg-transparent text-gray-700 focus:outline-none"
            placeholder="Type Here..."
            value={inputValue}
            required
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            className="srounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-blue-600 transition-colors duration-300 bg-no-repeat bg-center bg-70% bg-[url(/src/assets/img/send.png)]"
          ></button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot;
