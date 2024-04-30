
export interface InfoDataTypes {
  chatsLeft: number;
  botId: string;
  clientId: string;
  cusImg?: string;
  cusCol?: string;
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
