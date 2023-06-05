import { OpenAiConfigImplementation } from './OpenAiConfigImplementation';

const organization = process.env.OPENAI_ORGANIZATION_ID;
const apiKey = process.env.OPENAI_API_KEY;

if (organization === undefined || apiKey === undefined) {
  throw new Error('OpenAi variables are incorrect');
}

const openAiConfig = new OpenAiConfigImplementation(apiKey, organization);

export { openAiConfig };
