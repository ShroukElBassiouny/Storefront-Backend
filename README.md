# Store Backend
A NodeJS API to allow users to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a orders page.
 
## Tools:
Store Backend API uses several tools to work properly:
- TypeScript
- Express node.js web application framework
- Postgres
- Jasmine for testing
## Enviromental Variables Set up:
- create a `.env` file in your root folder then copy the content from  `.env.sample and replace the values with your environment configuration / secrets`
```sh
PORT=3000
NODE_ENV=dev
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB= store_dev
POSTGRES_DB_TEST=store_test
POSTGRES_USER = postgres
POSTGRES_PASSWORD=2221660
SALT_ROUNDS=10
PEPPER= secret-password
JWT_SECRET=secret-token
```
## DataBase:
start the Postgres server and create DB:
##### Note: Database is running on Port ==> 5432
- Use this command to run postgres server:
```sh
psql -U postgres
```
##### Postgres shell
##### This will list out all the databases:
```sh
\l
```
##### If "store_dev" database is not present:
```sh
create database store_dev;
```
- Next, you need to run the database migrations:
```sh
db-migrate up
```
- Add your database configuration setting to your `.env` file
## Before start server:
#### Install Dependencies:
```sh
cd StoreFront-backend
npm install
```
#### To Run migrations:
```sh
npm run migration:run
```
## To start server:
```sh
npm run start
```
## To start test:
```sh
npm run test
```
## Run migrations:
```sh
npm run migration:run
```
## Prettier: 
```sh
npm run Prettier
```
## ESLint:
```sh
npm run lint
```
## To Run Ports:
```sh
Server will start on port 3000 and the database on port 5432
```
