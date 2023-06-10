import { AiChatApi, Prompt } from './AiChatApi';
import { OpenAiConfig } from '../../../../config/openAi/OpenAiConfig';
import { Configuration, OpenAIApi } from 'openai';
import { ChatCompletionRequestMessage } from 'openai/api';

export interface OpenAiChatApiDependencies {
  openAiConfig: OpenAiConfig;
}

export class OpenAiChatApi implements AiChatApi {
  private readonly openAiConfiguration: Configuration;
  private gptModel = 'gpt-4';

  public constructor(private dependencies: OpenAiChatApiDependencies) {
    this.openAiConfiguration = new Configuration({
      organization: dependencies.openAiConfig.organization,
      apiKey: dependencies.openAiConfig.apiKey,
    });
  }

  public async sendModerationTaskMessage(prompt: Prompt): Promise<number[]> {
    const chatResponseContent = await this.getChatResponseContent(prompt);
    let moderationPhrases = [] as number[];

    if (chatResponseContent !== undefined) {
      moderationPhrases = JSON.parse(chatResponseContent) as number[];
    }

    return moderationPhrases;
  }

  public async getSingleChatResponse<ResponseType>(
    prompt: Prompt
  ): Promise<ResponseType> {
    const chatResponseContent = await this.getChatResponseContent(prompt);

    if (chatResponseContent === undefined) {
      throw new Error('OpenAi chat response is undefined');
    }

    return chatResponseContent as ResponseType;
  }

  private async getChatResponseContent(
    prompt: Prompt
  ): Promise<string | undefined> {
    const message: ChatCompletionRequestMessage = {
      role: 'user',
      content: prompt.content,
    };
    const openAiApi = new OpenAIApi(this.openAiConfiguration);

    const completionResponse = await openAiApi.createChatCompletion({
      messages: [message],
      model: this.gptModel,
    });

    return completionResponse.data.choices[0].message?.content;
  }
}
