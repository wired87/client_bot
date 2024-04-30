import InputField from "./InputField";

import React from "react";
import ChaBotHeading from "./ChaBotHeading";
import {useError} from "../hooks/universalHooks";

import Messages from "./messages/Messages";

interface ChotbotType {
  updateOpen: () => void;
  systemError: string;
  init: (value:object) => void;
  loading: boolean;
}

const ChatBot: React.FC<ChotbotType> = ({ updateOpen, systemError, init, loading }) => {

  const { error, updateError } = useError();





  return (
    <div className="w-[420px] rounded-[18px] shadow-[10px_10px_40px_rgba(0,_0,_0,_0.08),_5px_14px_80px_rgba(26,_26,_26,_0.12)] h-[660px] overflow-hidden flex flex-col items-start justify-start max-w-full max-h-full text-center text-lg text-header-body-text font-body-regular-paragraph-small">
      <ChaBotHeading updateOpen={updateOpen} init={init}/>
      <Messages
        error={error}
        systemError={systemError}
        loading={loading} />
      <div className="self-stretch bg-whitesmoke-300 h-[1.2px]" />
      <InputField
        loading={loading}
        updateError={updateError}
      />
    </div>
  );
};
console.log("Finished loading ChatBot...")
export default ChatBot;
/*
sx={{
  '--Textarea-focusedInset': joyTheme?.parameters?.focusedInset || '0px',
  '--Textarea-focusedThickness': joyTheme?.parameters?.focusedThickness || '0px',
  '--Textarea-focusedHighlight': joyTheme?.parameters?.focusedHighlight || 'transparent',
  '&:focus-within': {
    outline: 'none',
    borderColor: 'transparent',
  }
}}

CURRENT
 sx={{
              '--Textarea-focusedInset': '0px', // Sets no inset
              '--Textarea-focusedThickness': '0px', // Sets no thickness
              '--Textarea-focusedHighlight': 'transparent', // Sets the highlight to transparent
              '&:focus-within': {
                outline: 'none',
                borderColor: 'transparent',

              }
            }}
 */
