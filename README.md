# Home Library Service

## Made with
<img src="https://github.com/Ramitsan/nodejs2024Q1-service/assets/45296707/676b1b4f-2761-47b4-b76a-d7b55b4d6b3a" width="100" height="100">
<img src="https://github.com/Ramitsan/nodejs2024Q1-service/assets/45296707/0df1df01-a82e-46a7-81dc-8c3997585053" width="200" height="120">
<img src="https://github.com/Ramitsan/nodejs2024Q1-service/assets/45296707/2891412f-6f90-4e78-b3e3-225e53a6ea21" width="100" height="100">
<img src="https://github.com/Ramitsan/nodejs2024Q1-service/assets/45296707/d88f3f92-3197-488c-8d79-e82d4bbad89a" width="100" height="100">
<img src="https://github.com/Ramitsan/nodejs2024Q1-service/assets/45296707/46a972fb-7a1c-4aab-8404-eabb485856b7" width="200" height="100">
<img src="https://github.com/Ramitsan/nodejs2024Q1-service/assets/45296707/37bcbc5c-7426-4533-90cd-701a43195eea" width="100" height="100">

# PART 1. REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone git@github.com:Ramitsan/nodejs2024Q1-service.git
```

## Navigate to the project directory:

```
cd nodejs2024Q1-service/
```

## Switch to develop branch:

```
git checkout develop
```

## Installing NPM modules

```
npm install
```

## Create a .env file in the root directory and define the port. 
- Default port is 4000:
  
   **PORT=4000**

## Running application

```
npm run start 
```

or running application in dev watch mode

```
npm run start:dev
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

# PART 2. REST service: Containerization, Docker and Database & ORM

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Install [Docker](https://docs.docker.com/engine/install/)
- Install [Docker Desktop](https://docs.docker.com/get-docker/)

## Downloading

```
git clone git@github.com:Ramitsan/nodejs2024Q1-service.git
```

## Navigate to the project directory:

```
cd nodejs2024Q1-service/
```

## Switch to develop branch:

```
git checkout develop-docker
```

## Installing NPM modules

```
npm install
```

## Environment 
Create a .env file in the root directory and copy data from .env.example
or rename .env.example to .env 


## Running application
Collects services described in configuration files

```
docker compose build
```
Starts the collected services in the background with the -d flag

```
docker compose up -d
```
Stops and deletes all services which were launched using up

```
docker compose down
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

