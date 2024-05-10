import { createRoot } from "react-dom/client";
import React from "react";
import BotApp from "./BotApp";
require('./bot.tsx');

const botId: string = "bot_root";

const botContainer = document.getElementById(botId);
if ( botContainer ) {
  botContainer.style.width = "400px";
  botContainer.style.position = "fixed";
  botContainer.style.bottom = "110px";
  botContainer.style.right = "30px";
  botContainer.style.zIndex = "2000002";
  botContainer.style.borderRadius = "18px";
  botContainer.style.transform = "translateZ(0)";
  botContainer.style.boxShadow = "10px 10px 40px rgba(0, 0, 0, 0.08), 5px 14px 80px rgba(26, 26, 26, 0.12)";
  botContainer.style.maxHeight = "700px";
  botContainer.style.minHeight = "80px";
  botContainer.style.overflow = "hidden";
  botContainer.style.display = "flex";
  botContainer.style.flexDirection = "column";
  botContainer.style.alignItems = "start";
  botContainer.style.justifyContent = "start";
  botContainer.style.maxWidth = "100%";
  botContainer.style.textAlign = "center";
  botContainer.style.fontSize = "1.125rem";
  botContainer.style.color = "#333333";
  botContainer.style.fontFamily = "Inter";
  botContainer.style.pointerEvents = "all";

  const rootContainer = createRoot(botContainer!);
  console.log("Bot Root comp created and gets rendered...")

  rootContainer.render(
    <BotApp />
  )
}
