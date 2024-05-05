import React, { useEffect, useState } from "react";
import { createPortal } from 'react-dom';

type PortalProps = {
  children: React.ReactNode;
  containerId?: string;
};


export const Portal = ({ children, containerId = 'portals' }:PortalProps) => {
  const [portalsDiv, setPortalsDiv] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let div = document.getElementById(containerId);
    if (!div) {
      div = document.createElement('div');
      div.setAttribute('id', containerId);
      document.body.appendChild(div);
    }
    setPortalsDiv(div);

    // Cleanup the portal div when it's no longer needed
    return () => {
      if (div && div.parentNode) {
        div.parentNode.removeChild(div);
      }
    };
  }, [containerId]);


  if (portalsDiv) {
    console.log("Div created -> place the portal...");
    return createPortal(children, portalsDiv)
  }
  return null;
};
