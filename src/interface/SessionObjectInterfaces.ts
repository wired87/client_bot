
export interface InfoDataTypes {
  chatsLeft: number;
  botId: string;
  clientId: string;
  dataUrl?: string;
  userPlanInfo?: string;
  config?: BotConfig;
}

export interface BotConfig {
  pubName?: string;
  welcomeMessage: string;
  primary: string;
  primaryText: string;
}

export interface ChatSenderObjectTypes {
  data: string;
  client_id: string;
  question: string;
}

export interface Conversation {
  text: string;
  time: string;
  publisher: string;
}
