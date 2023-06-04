export interface SolveModerationTaskResponse {
  content:
    | 'Answer correct! 🎉🎉🎉'
    | 'Answer incorrect. ⛔ Time to bug hunting. 🪲';
}

export class SolveModerationTaskController {
  public async execute(): Promise<SolveModerationTaskResponse> {
    return Promise.resolve({
      content: 'Answer incorrect. ⛔ Time to bug hunting. 🪲',
    });
  }
}
