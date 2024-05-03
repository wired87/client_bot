

import React, {memo, RefObject} from "react";
import {IoSend} from "react-icons/io5";
import Input from 'antd/es/input';


const { TextArea } = Input;

interface FieldProps {
  sysLoading: boolean;
  input: string;
  chatRequestProcess: () => Promise<void>;
  updateInput: (value:string, textareaRef:RefObject<HTMLTextAreaElement> | undefined) => void;
  textareaRef?: RefObject<HTMLTextAreaElement>;
  error: string;
}


const InputField: React.FC<FieldProps> = (
  {
    sysLoading,
    textareaRef,
    updateInput,
    chatRequestProcess,
    input,
    error
  }
) => {
  console.log("InputField gets rendered");
  const getDisabled = (): boolean => {
    return sysLoading || error?.length > 0;
  }

  return(
    <div className="self-stretch bg-reply-bg h-[66px] flex flex-col items-start justify-start p-5 box-border" >
      <div className="relative self-stretch flex flex-row items-start justify-between pt-0 px-0 pb-1" >

        <TextArea
          placeholder="Deine Frage..."
          className="[border:none] [outline:none]
             bg-[transparent] h-auto max-h-[120px] flex-1 overflow-y-visible  flex flex-row items-center text-start
             font-chat-operator-quick-reply
             justify-center py-2 px-4 outline-none text-stamp-text resize-none absolute bottom-[-30px] w-[340px] bg-white z-30"
          autoSize
          disabled={getDisabled()}
          value={input}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateInput(e.target.value, textareaRef)}
        />
        <button
          className="cursor-pointer absolute right-1 [border:none] p-0 bg-[transparent] flex flex-row items-center justify-start gap-[12px]"
          onClick={() => chatRequestProcess}
        >
          <div className="overflow-hidden flex flex-row items-center justify-start relative gap-[10px]">
            <IoSend size={24}/>
          </div>
        </button>
      </div>
    </div>
  )
}

console.log("FINISHED AREA WILL BE RENDERED");

export default memo(InputField);
