import { useEffect, useState } from "react";

export const useWindow = () => {
  const [wWidth, setWWidth] = useState(window.innerWidth);
  const [wHeight, setWHeight] = useState(window.innerHeight);
  // const [zoom, setZoom] = useState();

  function handleResize() {
    console.log("Inner width updated:", wWidth);
    setWWidth(window.innerWidth);
    setWHeight(window.innerHeight)
  }





  useEffect(() => {
    window.addEventListener("resize", handleResize);
    //window.addEventListener('beforezoom', handleZoom);
    return () => {
      window.removeEventListener("resize", handleResize);
      //window.addEventListener('beforezoom', handleZoom);
    };
  }, []);

  return { wWidth, wHeight };
}
