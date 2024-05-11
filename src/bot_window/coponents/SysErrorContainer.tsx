import { GrCircleAlert } from "react-icons/gr";
import React from "react";
interface SysErrorProps {
  sysErrorMessage: string;
}

const SysErrorContainer: React.FC<SysErrorProps> = ({ sysErrorMessage }) => {
  return (
    <div style={{
      margin: 0,
      display: 'flex',
      paddingLeft: 20,
      alignItems: 'center',
      justifyContent: "flex-start",
      width: 300,
      maxHeight: 60,
      borderRadius: 5,
      backgroundColor: '#fce4e4',
      gap: 7,
      flexDirection: "row",
    }}>
      <GrCircleAlert size={25} color={"#cc0033"}  />
      <p style={{
        color: "black",
        fontSize: 14,
        fontFamily: "Roboto, sans-serif",
        fontStyle: "normal",
      }}>
        {
          sysErrorMessage
        }
      </p>
    </div>
  );
}


export default SysErrorContainer;
