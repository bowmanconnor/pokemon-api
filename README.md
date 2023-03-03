
# Pokemon-api

## Description

A [Nest](https://github.com/nestjs/nest) project that handles creating a database and exposing that database to a API.

## Setup
This project uses a MongoDB database to store and retrieve data. In order for the `config.service.ts` to properly connect to a Mongo database. Create a `.env` file such as 
```
PORT = "3000"
MONGO_URI = 'mongodb+srv://{user}:{password}{database}/?retryWrites=true&w=majority'
```

Be sure to replace the `user`, `password`, and `database` values with the provided values from MongoDB.
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start
```

## Tests

```bash
# unit tests
$ npm run test
```

## User stories examples
### Obtain a pokemon by id
```
localhost:3000/pokemon/001
```
### Obtain list of pokemons (TIP: pagination)
```
localhost:3000/pokemon 
localhost:3000/pokemon?limit=25 
localhost:3000/pokemon?skip=5&limit=20
```
### Obtain a pokemon by name
```
localhost:3000/pokemon/name/Bulbasaur
```
### Obtain list of pokemons with different filters
```
localhost:3000/pokemon?types=Flying&fleeRate=0.06
localhost:3000/pokemon?name=a
```
### Allow obtain pokemon types
```
localhost:3000/pokemon/types
```
### Allow add a pokemon as favourite
```
localhost:3000/pokemon/001/favorite
```
### Allow remove a pokemon as favourite
```
localhost:3000/pokemon/001/unfavorite
```
### Allow obtain list of favourite pokemons
```
localhost:3000/pokemon/favorites
```

## Architecture
This project uses ideas heavily influenced by Domain Driven Design (DDD). 

### Domain layer
The `domain` layer handles defining all business models and logic. Here we define our `pokemon.ts` entity that is used in the application. This layer also handles defining the `pokemon.service.interface.ts` and `pokemon.repository.interface.ts` interfaces that are to be used by the `application` and `infrastructure` layer. This layer is designed to be free of exteneral dependacies and acts as the building block for the rest of the project.

### Application layer
The `application` layer handles executing the business logic defined in the `domain` layer. Here we implement our service interface into `pokemon.service.ts`. This service file depends on the `pokemon.repository.ts` to implement and execute all the service functions required by the domain layer. This layer is also home to the `pokemon.module.ts` which handles injecting the service, repository, controller, and database model into the pokemon module.

### Infrastructure layer
The `infrastructure` layer accesses external services such as the database. This layer implements the repository interface into `pokemon.repository.ts`. This repository handles making requests to the MongoDB database. This layer is also home to our `seed-db.ts`, `purge-db.ts`, and `connect-db.ts` scripts. This scripts are responsible to seeding, purging, and connecting to the database respectively. The initial data `pokemons.JSON` is also stored in this layer. The infrastructure layer utilizing the `config.service.ts` to load environment variables from the `.env` file into the project.
### Presentation layer
The `presentation` layer handles exposing the API to the user. The `pokemon.controller.ts` is located here which defines routes and access the `pokemon.service.ts` methods in order to handles user input and requests. The controller is also responsible for returning exceptions to the user. 

## Database
MongoDB and mongoose were used in this project for their ease of use and well documented documentation. 