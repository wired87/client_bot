import React, {memo} from "react";

interface UserMessageTypes {
  text: string;
  time: string;
}

const UserMessage: React.FC<UserMessageTypes> = (
  {
    text,
    time
  }
) => {
  console.log("Render the Response message...");
  return(
    <div className="flex flex-col items-end justify-end gap-[6px] text-reply-bg">
      <div className="rounded-md bg-main-colour overflow-hidden flex flex-row items-center justify-end py-4 px-[19px] box-border max-w-[300px]">
        <div className="flex-1 relative leading-[140%] inline-block max-w-[260px]">
          {text}
        </div>
      </div>
      <div className="relative text-smi leading-[120%] text-stamp-text">
        {time}
      </div>
    </div>
  );
}

export default memo(UserMessage);