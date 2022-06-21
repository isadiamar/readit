# Read It

[![example workflow](https://github.com/isadiamar/readit/actions/workflows/main.yml/badge.svg)](https://github.com/isadiamar/readit/actions/workflows/main.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=isadiamar_readit&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=isadiamar_readit)[![Netlify Status](https://api.netlify.com/api/v1/badges/24c91e38-68da-4b7d-9202-f6b8a5092dd5/deploy-status)](https://app.netlify.com/sites/ri-readit/deploys)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/b9d5c11187a54a7bb2fb61081ca750dc)](https://www.codacy.com/gh/isadiamar/readit/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=isadiamar/readit&amp;utm_campaign=Badge_Grade)

> Web App to create and read books online.
> 
> You can access it at:
> - [Readit](https://ri-readit.netlify.app/welcome)


## How to install, run and test

### Client

> The technologies used were:
> - Node
> - Angular
> - Typescript
> - Netlify

#### Instalation
1. Install Node (v 16)
2. Open a terminal at readit/readit-frontend
3. `npm install`

#### Run
1. Open a terminal at readit/readit-backend
2. `ng serve`

#### Testing
1. Open a terminal at readit/readit-frontend
2. `./node_modules/.bin/cypress run` to run the test in headless mode
3. `./node_modules/.bin/cypress open` to run the test visually in a browser

### Server

> The technologies used were:
> - Java
> - SpringBoot
> - PostgreSQL
> - Heroku

#### Instalation
1. Install Java (v 11)
2. Install Maven
3. Install PostgreSQL (v 13). The installer is recommended to autoconfigure it.
4. Make sure the Server PostgreSQL with Connection Host localhost and User postgres exists
Create Databases:
Name: readit-app | Owner: postgres

#### Run
5. Open a terminal at readit/readit-backend
6. `./mvnw clean spring-boot:run`
