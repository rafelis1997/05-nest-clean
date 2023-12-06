## Forum Application in Nest.js

This project is a case study for Nest.js and Clean Architecture. The main goal was
to build an application following the best practices of SOLID and isolate core from framework.

The benefits of doing this is to enable the application to have a better maintainability and a long term lifecycle. Also this approach allows more easy to develop unit and e2e tests.

### Main technologies

- Nest.js
- Typescript
- Vitest
- Docker
- PostgreSQL
- Prisma
- Redis

## Features

This application has some main features expected for a forum back-end:

- Registration of users
- JWT login strategy
- CRUD of an question with attachments
- CRUD of an answer questions with attachments
- Ability to comment on questions and answers
- Enable author of the question to select best answer to his question
- Ability to list all questions, answers and comments with related content (user info, attachments, etc)
- Cached responses

## Learnings

I could develop my understanding of error handling a lot better using the Either pattern to allow return errors or a valid response on validations.

Core bussiness agnostic approach is a good abstractions and has it's benefits, but should be balanced with product decisions and can lead to productivity and complexity problems. Also, design a product with a framework in mind could make more of its functionality.

## Run project

- Run docker compose file to build PostgreSQL and Redis:
`docker compose up -d`
- Install project dependencies: `pnpm install`
- Run the project with: `pnpm run start`
- If you want to check DB registry: `pnpm prisma studio`
