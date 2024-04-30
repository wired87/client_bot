import React from "react";

export   const scrollToBottom = (ref: React.RefObject<HTMLDivElement>) => {
  const scrollContainer = ref?.current;
  if (scrollContainer) {
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
  }
};