import {InfoDataTypes} from "../interface/SessionObjectInterfaces";

export const getTime = (): string => {
  console.log("getTime  gets created...");
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
}


export const getBotId = () => {
  console.log("getBotId   gets created...");
  const scripts = document.querySelectorAll('script');
  for (let i = 0; i < scripts.length; i++) {
    const script = scripts[i];
    console.log("Script found: ", script);
    if (script.src && script.src.includes('main.02.js')) {
      return script.getAttribute('data-bot-id');
    }
  }
  console.log("Script data attr missing or not valid...");
  return null;
}

export const getBotIdProcess = ( infoData: InfoDataTypes | null ) => {
  console.log("Get authentication data...");
  let localBotId: string | null;

  if ( infoData?.botId ) {
    console.log("Data in session found...");
    localBotId = infoData.botId;
  } else {
    console.log("Try get data from script tag...");
    localBotId = getBotId();
  }
  return localBotId;
}

