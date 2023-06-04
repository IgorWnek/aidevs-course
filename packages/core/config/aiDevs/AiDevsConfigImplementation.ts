import { AiDevsConfig } from './AiDevsConfig';

export class AiDevsConfigImplementation implements AiDevsConfig {
  public readonly apiKey: string;

  public constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
}
