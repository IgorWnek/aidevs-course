export interface ChatMessage {
  content: string;
}

export interface SingleResponseContent {
  content: string;
}

export interface ChatClient {
  sendSingleMessage(message: ChatMessage): Promise<SingleResponseContent>;
}
