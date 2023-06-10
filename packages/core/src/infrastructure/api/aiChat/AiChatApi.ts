export interface Prompt {
  content: string;
}
export interface AiChatApi {
  sendModerationTaskMessage(prompt: Prompt): Promise<number[]>;
  getSingleChatResponse<ResponseType>(prompt: Prompt): Promise<ResponseType>;
}
