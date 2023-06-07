import { OpenAiChatApi } from './OpenAiChatApi';
import { openAiConfig } from '../../../../config/openAi';

const openAiChatApi = new OpenAiChatApi({
  openAiConfig: openAiConfig,
});

export { openAiChatApi };
