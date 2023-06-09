import { StackContext, Api } from 'sst/constructs';

export function API({ stack }: StackContext) {
  const api = new Api(stack, 'api', {
    routes: {
      'GET /moderation': 'packages/functions/src/moderation.handler',
      'GET /inprompt': 'packages/functions/src/inprompt.handler',
    },
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
