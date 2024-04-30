
import React, {memo} from "react";

interface ResponseMessageTypes {
  text: string;
  time: string;
}

const ResponseMessage: React.FC<ResponseMessageTypes> = (
  {
    text,
    time
  }
) => {
  // Item unten <div className="w-[46px] rounded-[125px] box-border flex flex-col items-start justify-end ">
  return(
    <div className="mb-7 self-stretch flex flex-col items-end justify-end">
      <div className="self-stretch flex flex-row items-end justify-start gap-[10px]">
        <div className="w-8 flex flex-col items-start justify-start pt-0 px-0 pb-[23px] box-border">
          <h4>
            BW
          </h4>
        </div>
        <div className="flex flex-col items-start justify-end gap-[6px]">
          <div className="rounded-3xs bg-operator-message-bg flex flex-col items-start justify-start py-4 px-[18px] box-border max-w-[300px]">
            <div className="w-full relative leading-[140%] inline-block max-w-[260px]">
              <p className="m-0">
                {text}
              </p>
            </div>
          </div>
          <div className="relative text-smi leading-[120%] text-stamp-text">
            {time}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ResponseMessage);