# About the project

This is repository for tasks from AI Devs course.
SST serverless framework is used to create endpoints for each task.
Under the hood it utilizes AWS Lambdas and API Gateway to provide infrastructure.

If you want be able to run project locally as SST application you must configure your AWS cli.

[SST Docs about setting up IAM credentials](https://docs.sst.dev/advanced/iam-credentials#loading-from-a-file)

**Remember, this is not the "production ready" version so don't host it publicly available.**

## Run the application in dev env

Right now SST requires you have installed at least Node.js 16 and npm 7.
[Here](https://docs.sst.dev/learn/create-a-new-project) is the docs page about creating new project with SST.

Run command below in the project root directory:

```bash
npm install
```

Then run SST app:

```bash
npm run dev
```

Now you have live lambda environment ready to work on your machine.

Open [SST Console](https://console.sst.dev/) to review your stack, API, functions and more.

From the SST Console you can make api calls in the dev environment.

## Testing the Application

[SST Documentation about testing](https://docs.sst.dev/testing)