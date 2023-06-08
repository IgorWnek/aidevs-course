import { describe, expect, it } from 'vitest';
import { solveModerationTaskUseCase } from './index';
import { TaskResult } from './SolveTaskUseCase';

describe('Given Moderation Task Use Case', () => {
  describe('When task is solved correctly', () => {
    it('Then use-case returns truthy response', async () => {
      // TODO: create proper tests after finishing two more tasks
      const taskResult = await solveModerationTaskUseCase.execute();
      const expectedTaskResult: TaskResult = {
        answeredCorrect: true,
      };

      expect(taskResult).toEqual(expectedTaskResult);
    });
  });
});
