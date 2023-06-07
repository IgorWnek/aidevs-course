export interface Prompt {
  content: string;
}
export interface AiChatApi {
  sendModerationTaskMessage(prompt: Prompt): Promise<number[]>;
}
