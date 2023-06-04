import { AiDevsConfigImplementation } from './AiDevsConfigImplementation';

const apiKey = process.env.AI_DEVS_API_KEY;

if (apiKey === undefined) {
  throw new Error('AI Devs API key is undefined');
}

const aiDevsConfig = new AiDevsConfigImplementation(apiKey);

export { aiDevsConfig };
