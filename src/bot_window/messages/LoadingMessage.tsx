
import React, {memo} from "react";
import Bounce from "react-activity/dist/Bounce";
import "react-activity/dist/Bounce.css";

const LoadingMessage: React.FC = () => {
  console.log("LoadingMessage  gets rendered");
  return(
    <div className="mb-7 self-stretch flex flex-col items-end justify-end">
      <div className="self-stretch flex flex-row items-center justify-start gap-[10px]">
        <div className="w-8 flex flex-col items-center justify-center pt-0 px-0 pb-[23px] box-border">
          <h4 className={"relative"}>
            BW
          </h4>
        </div>
        <div className="flex flex-col items-start justify-start gap-[6px]">
          <div className="rounded-3xs bg-operator-message-bg flex flex-col items-center justify-center py-4 px-[10px]
          box-border max-w-[300px]">
            <Bounce size={15} animating={true} color={"black"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(LoadingMessage);


