import React, { memo } from "react";
import { IoMdRefresh } from "react-icons/io";
interface ErrorContent {
  retry: () => Promise<void>;
  error: string;
}
const ErrorMessageContent: React.FC<ErrorContent> = ({ retry, error }) => {
  return(
    <div style={{flexDirection: "row", display: "flex", gap: 10}}>
      <p style={{color: "black", fontSize: 15,
        fontWeight: "bold",
        fontFamily: "Roboto, sans-serif",
        fontStyle: "normal"
      }}>
        {error}
      </p>
      <button
        style={{
          cursor: 'pointer',
          borderRadius: '50%',
          border: 'none',
          padding: '1px',
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={retry}
        title="Start over" >
        <IoMdRefresh color="black" size={22} />
      </button>
    </div>
  )
}

export default memo(ErrorMessageContent);