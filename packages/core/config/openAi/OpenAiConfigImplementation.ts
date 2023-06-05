import { OpenAiConfig } from './OpenAiConfig';

export class OpenAiConfigImplementation implements OpenAiConfig {
  apiKey: string;
  organization: string;

  public constructor(apiKey: string, organization: string) {
    this.apiKey = apiKey;
    this.organization = organization;
  }
}
