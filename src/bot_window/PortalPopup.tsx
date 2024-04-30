import React, {
  CSSProperties,
  RefObject,
  FunctionComponent,
  ReactNode,
  useMemo,
  useCallback,
  useState,
  useRef,
  useEffect,
} from "react";

import { createPortal } from "react-dom";

type PopupProps = {
  overlayColor?: string;
  placement?:
    | "Centered"
    | "Top left"
    | "Top center"
    | "Top right"
    | "Bottom left"
    | "Bottom center"
    | "Bottom right";
  onOutsideClick?: () => void;
  zIndex?: number;
  children: ReactNode;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  relativeLayerRef?: RefObject<HTMLElement>;
};

const PortalPopup: FunctionComponent<PopupProps> = ({
  children,
  overlayColor,
  placement = "Centered",
  onOutsideClick,
  zIndex = 100,
  left = 100,
  right = 50,
  top = 100,
  bottom = 0,
  relativeLayerRef,
}) => {
  const relContainerRef = useRef<HTMLDivElement>(null);
  const [relativeStyle, setRelativeStyle] = useState<CSSProperties>({
    opacity: 0,
  });
  const popupStyle = useMemo(() => {
    const style: CSSProperties = {};
    style.zIndex = zIndex;

    if (overlayColor) {
      style.backgroundColor = overlayColor;
    }
    if (!relativeLayerRef?.current) {
      style.alignItems = "flex-end";
      style.justifyContent = "flex-end";

    }
    style.opacity = 1;
    style.backgroundColor = "transparent";
    return style;
  }, [placement, overlayColor, zIndex, relativeLayerRef?.current]);


  const setPosition = useCallback(() => {
    console.log("Values have changed:", left, right, top, bottom);

    const relativeItem = relativeLayerRef?.current?.getBoundingClientRect();
    const containerItem = relContainerRef?.current?.getBoundingClientRect();

    const style: CSSProperties = { opacity: 1 };

    if (relativeItem && containerItem) {
      console.log("Style is now set!")
      style.position = "fixed";
      style.bottom = bottom;
      style.right = right;
    } else {
      style.position = "fixed";
      style.bottom = 140;
      style.right = 30;
      style.maxWidth = "90%";
      style.maxHeight = "90%";
    }
    setRelativeStyle(style);
  }, [left, right, top, bottom]);

  useEffect(() => {
    setPosition();
    window.addEventListener("resize", setPosition);
    window.addEventListener("scroll", setPosition, true);

    return () => {
      window.removeEventListener("resize", setPosition);
      window.removeEventListener("scroll", setPosition, true);
    };
  }, [setPosition]);


  const onOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (
        onOutsideClick &&
        (e.target as HTMLElement).classList.contains("portalPopupOverlay")
      ) {
        onOutsideClick();
      }
      e.stopPropagation();
    },
    [onOutsideClick]
  );

  return (
    <Portal>
      <div
        className="flex flex-col fixed inset-0 portalPopupOverlay"
        style={popupStyle}
        onClick={onOverlayClick} >
        <div ref={relContainerRef} style={relativeStyle}>
          {children}
        </div>
      </div>
    </Portal>
  );
};

type PortalProps = {
  children: ReactNode;
  containerId?: string;
};

export const Portal: FunctionComponent<PortalProps> = ({
  children,
  containerId = "portals",
}) => {
  let portalsDiv = document.getElementById(containerId);
  if (!portalsDiv) {
    portalsDiv = document.createElement("div");
    portalsDiv.setAttribute("id", containerId);
    document.body.appendChild(portalsDiv);
  }

  return createPortal(children, portalsDiv);
};
export default PortalPopup;
