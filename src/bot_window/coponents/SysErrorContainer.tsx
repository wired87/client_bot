import { GrCircleAlert } from "react-icons/gr";
import React from "react";
import { MdOutlineRefresh } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
interface SysErrorProps {
  sysErrorMessage: string;
  //init: () => Promise<void>;
  updateOpen: () => void;

}

const SysErrorContainer: React.FC<SysErrorProps> = (
  { sysErrorMessage, updateOpen }
) => {

  return (
    <div style={{
      margin: 0,
      display: 'flex',
      paddingLeft: 20,
      alignItems: 'center',
      justifyContent: "center",
      width: "100%",
      maxHeight: 170,
      borderRadius: 5,
      //background: "rgba(255, 255, 255, 0.7)",
      gap: 7,
      flexDirection: "column",
      padding: "0 40px"
    }}>
      <GrCircleAlert size={32} color={"rgba(204,0,51,0.68)"}  />
      <p style={{
        color: "black",
        fontSize: 16,
        fontFamily: "Roboto, sans-serif",
        fontStyle: "normal",
        marginTop: 20,
        marginBottom: 50,
        gap: 7,
        textAlign: "center"
      }}>
        {
          sysErrorMessage
        }
      </p>
      <MdKeyboardArrowDown title={"close"} size={27} onClick={updateOpen} style={{cursor: "pointer", color: "black", position: "absolute", top: 15, right: 15}}/>
    </div>
  );
}


export default SysErrorContainer;
/*
<MdOutlineRefresh
        style={{cursor:"pointer"}}
        size={30}
        color={"black"}
        onClick={
        () => init()
          .then(() => console.log("Retried init..."))
          .catch(e => console.log("Retry failed cause error:", e))
      }/>
 */