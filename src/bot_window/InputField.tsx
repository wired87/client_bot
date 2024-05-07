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

const getColor = () => {
    if (input.trim().length > 0 ) {
      return "rgba(0,0,0,1)";
    }
    return "rgba(0,0,0,.4)";
}
  return(
    <div style={{
      alignSelf: 'stretch',
      backgroundColor: 'white',
      height: '66px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      padding: '3px 20px',
      boxSizing: 'border-box',
    }}>

        <TextArea
          className={"bwClientBotFont999666"}
          placeholder="Deine Frage..."
          style={{
            border: 'none',
            borderRadius: 5,
            outline: 'none',
            height: 'auto',
            maxHeight: '120px',
            flexGrow: 1,
            overflowY: 'visible',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2px 4px',
            fontSize: 16,
            color: getColor(),
            width: '340px',
            backgroundColor: 'white',
            verticalAlign: "start",
          }}
          autoSize
          disabled={getDisabled()} // getDisabled()
          value={input}
          onChange={(e) => updateInput(e.target.value, textareaRef)}
        />

        <button
          style={{
            cursor: 'pointer',
            position: 'absolute',
            right: '12px',
            border: 'none',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: 7,
            borderRadius: 14,
          }}
          onClick={() => chatRequestProcess()}
        >

            <IoSend size={24} color={"black"} />

        </button>
    </div>

  )
}

console.log("FINISHED AREA WILL BE RENDERED");

export default memo(InputField);


/*
<div style={{
        position: 'relative',
        alignSelf: 'stretch',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: "red",
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingTop: '0',
        paddingLeft: '0',
        paddingRight: '0',
        paddingBottom: '1px'
      }}>
 */