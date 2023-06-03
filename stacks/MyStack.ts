import { StackContext, Api } from "sst/constructs";

export function API({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    routes: {
      "GET /moderation": "packages/functions/src/moderation.handler",
    },
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
