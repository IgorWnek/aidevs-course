import { AiDevsConfig } from '../../../../config/aiDevs/AiDevsConfig';

export interface SolveModerationTaskDependencies {
  aiDevsConfig: AiDevsConfig;
}

export interface SolveModerationTaskResponse {
  content:
    | 'Answer correct! 🎉🎉🎉'
    | 'Answer incorrect. ⛔ Time to bug hunting. 🪲';
}

export class SolveModerationTaskController {
  private aiDevsConfig: AiDevsConfig;

  public constructor(dependencies: SolveModerationTaskDependencies) {
    const { aiDevsConfig } = dependencies;

    this.aiDevsConfig = aiDevsConfig;
  }

  public async execute(): Promise<SolveModerationTaskResponse> {
    return Promise.resolve({
      content: 'Answer incorrect. ⛔ Time to bug hunting. 🪲',
    });
  }
}
