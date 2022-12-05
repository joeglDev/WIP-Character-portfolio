# Character portfolio

Think of it portfolio of your original characters (or OCs) for use by fandoms/weebs/furryys/D&D content creators or anyone who wishes to. You can upload bios/stats of your OCs and display them to the world.

## Content warnings

Please keep content to that which is legal in the UK and Safe For Work / no adult content. If I find that the site has been spammed with inappropriate or illegal content I will pull the website down and wipe the database.


## Issues and Future Updates

1. Replace image link with an amazon S3 bucket. Currently you add images by linking to an image hosted elsewhere. This is a poor user experience and sometimes fails so in the future I will implement a proper image upload function using a Amazon S3 bucket or similar.
2. Ability to edit an existing character (backend CRUD done just need to add to the front-end).
3. Pride flag CSS!


## Hosted version: 

1. Front-end website hosted on Netlify: `https://keen-dodol-db9041.netlify.app/`

## Stack

- Language - TypeScript
- Back-End - Node.js / express.js (server), bcrypt (authentification), mongoDB (noSQL database)
- Front-End - React

### MongoDB client connection

The connection string for mongoDB is stored in a .env file under `MONGODB_URL=<connection string>`. Please report any database errors to [joegilbertdev](https://github.com/joeglDev).

## To run locally:

1. Download and install [MongoDB Community Edition](https://www.mongodb.com/docs/manual/administration/install-community/).
2. Fork, download and clone this repository.
3. In terminal `cd` into backend / frontend and run `npm init` to install required dependencies.
4. In backend create a `.env` file with the follwoing information e.g. `MONGODB_URL=mongodb://localhost:NUMBER`.
5. To run backend use the command `npm run start` from backend and frontend run command `npm start` from frontend.

## API Documentation

1. API documentation can be found within backend/apiDocumentation.ts or by calling the api with "/" endpoint.
2. [API Documentation](https://character-portfolio-api.herokuapp.com/)

## Acknowledgements

Special thanks to the following for their aid:
- [Nanashi](https://github.com/Mitame) / Nanashi Mitame 



