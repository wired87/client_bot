
import React, { CSSProperties, FunctionComponent, ReactNode, RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Portal } from "./Portal";

type PopupProps = {
  overlayColor?: string;
  placement?: "Centered" | "Top left" | "Top center" | "Top right" | "Bottom left" | "Bottom center" | "Bottom right";
  onOutsideClick?: () => void;
  zIndex?: number;
  children: ReactNode;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  relativeLayerRef?: RefObject<HTMLElement>;
  open: boolean;
};

const PortalPopup: FunctionComponent<PopupProps> = ({
                                                      children,
                                                      overlayColor,
                                                      placement = "Centered",
                                                      onOutsideClick,
                                                      zIndex = 10000,
                                                      left = 100,
                                                      right = 50,
                                                      top = 100,
                                                      bottom = 0,
                                                      relativeLayerRef,
                                                      open
                                                    }) => {
  const relContainerRef = useRef<HTMLDivElement>(null);
  const [relativeStyle, setRelativeStyle] = useState<CSSProperties>({ opacity: 0 });


  const popupStyle = useMemo(() => {
    const style: CSSProperties = {
      alignItems: "flex-end",
      justifyContent: "flex-end",
      zIndex,
      bottom: 0,
      right: 0,
      backgroundColor: "transparent",
      pointerEvents: open ? 'auto' : 'none',
    };
    return style;
  }, [zIndex, relativeLayerRef?.current, open]);

  const setPosition = useCallback(() => {
    const relativeItem = relativeLayerRef?.current?.getBoundingClientRect();
    const containerItem = relContainerRef?.current?.getBoundingClientRect();
    const style: CSSProperties = { opacity: 1, position: "fixed" };

    if (relativeItem && containerItem) {
      style.position = "absolute";
      style.bottom = bottom;
      style.right = right;
    } else {
      style.bottom = 140;
      style.right = 30;
    }
    style.pointerEvents = "auto";
    style.backgroundColor = "transparent";
    setRelativeStyle(style);
  }, [bottom, right, relativeLayerRef]);

  useEffect(() => {
    setPosition();
    const handleResize = () => setPosition();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", setPosition, true);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", setPosition, true);
    };
  }, [setPosition]);

  return (
    <Portal>
      <div
        className="flex flex-col bottom-0 right-0 min-h-[500px] p-5 fixed inset-0"
        style={popupStyle}
      >
        <div ref={relContainerRef} style={relativeStyle}>
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default PortalPopup;