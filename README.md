# NodeJS Todo App

#### Pre-Requisite 
- Install Node Version `[v18.14.2]` | If you're using NVM run command `nvm use` .nvmrc file is already there in root dir. 
- Install [Docker](https://docs.docker.com/get-docker/) (Optional) 
- Basic knowledge of Typescript and Nodejs
- Basic knowledge of MongoDB
 
#### Features
Currently, this project supports following API, which are below:
- ###### Test API
    - Test API for health check of server.
- ###### Authentications API
    - Authentications API for register, login, validate token and logout.
- ###### Todos API
    - Todos API for CRUD operations for todo.
   
 
#### Installation
Create `.env` file at root level and `add` following env variables:
- PORT=3020
- MONGODB_URL=DB_URL
- JWT_SECRET=ANY_SECRET_YOU_WANT

App requires [Node.js](https://nodejs.org/) `[v18.14.2]` to run.
Install the dependencies and devDependencies and start the server.
Go to root folder and run following command:
```sh
npm i
npm start
npm run dev
```
or run for Docker project:
```sh
docker-compose up 
```
This will start you local development server and you can find swagger doc at `http://localhost:3020/docs/#/`
#### Test
Run following command to run testcaess of project:
Testcase folder is on `./src/spec` location.
```sh
npm run test
```
You can see output on `console`. `Screenshot of testcases` are `attached` below in screenshots section.

#### Build
Run following command to build project:
```sh
npm i
npm run build
```
This will create a `./dist/src` which is currently ignored by `.gitignore` file.
#### Docker Build
Run following command to build Docker project:
```sh
npm run build:docker 
```
Or, run 
```sh
docker-compose build
```
then you can run project by below command:
```sh
docker-compose up 
```
This will create a `./dist/src` which is currently ignored by `.gitignore` file.

#### Project Screenshots
###### Swagger docs:
![This is an image](https://raw.githubusercontent.com/nikhilkrdwivedi/NodeJS-Assignment-INeuron/master/screenshots/swagger-docs.png
)
![This is an image](https://raw.githubusercontent.com/nikhilkrdwivedi/NodeJS-Assignment-INeuron/master/screenshots/swagger-docs-api-intro.png)
![This is an image](https://raw.githubusercontent.com/nikhilkrdwivedi/NodeJS-Assignment-INeuron/master/screenshots/swagger-auth-info.png)

###### Dokcer build and start:
![This is an image](https://raw.githubusercontent.com/nikhilkrdwivedi/NodeJS-Assignment-INeuron/master/screenshots/docker-build.png)
![This is an image](https://raw.githubusercontent.com/nikhilkrdwivedi/NodeJS-Assignment-INeuron/master/screenshots/docker-start.png)

###### Testcases:
![This is an image](https://raw.githubusercontent.com/nikhilkrdwivedi/NodeJS-Assignment-INeuron/master/screenshots/testcases-results.png
)


**Happy coding!😀**
