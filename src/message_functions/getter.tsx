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


export const getBotId = (): string | null => {
  console.log("getBotId   gets created...");
  const scripts = document.querySelectorAll('script');
  for (let i = 0; i < scripts.length; i++) {
    const script = scripts[i];
    console.log("Script found: ", script, "\n");
    try {
      console.log( "SCRIPT SOURCE:", script.src);
      if (script.src && script.src.includes('client_bundle999666.js')) {
        const botDataId: string | null = script.getAttribute('data-bot-id');
        console.log("botDataId:", botDataId);
        return botDataId;
      }
    } catch (e) {
      console.log("Error occurred:", e)
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

