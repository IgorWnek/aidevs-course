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

  async sendModerationTaskMessage(prompt: Prompt): Promise<number[]> {
    const message: ChatCompletionRequestMessage = {
      role: 'user',
      content: prompt.content,
    };
    const openAiApi = new OpenAIApi(this.openAiConfiguration);

    const completionResponse = await openAiApi.createChatCompletion({
      messages: [message],
      model: this.gptModel,
    });

    const chatResponseContent =
      completionResponse.data.choices[0].message?.content;
    let moderationPhrases = [] as number[];

    if (chatResponseContent !== undefined) {
      moderationPhrases = JSON.parse(chatResponseContent) as number[];
    }

    return moderationPhrases;
  }
}
