# Character portfolio

A personal project to display user generated fictional characters in an aesthetic manner -> an art portfolio.

## Stack

- Language - TypeScript
- Back-End - Node.js / express.js (server), bcrypt (authentification), mongoDB (noSQL database)
- Front-End - React

## Hosted version: Work-In-Progress

### MongoDB client connection

The connection string for mongoDB is stored in a .env file under `MONGODB_URL=<connection string>`. Please report any database errors to [joegilbertdev](https://github.com/joeglDev).

## To run locally:

1. Download and install [MongoDB Community Edition](https://www.mongodb.com/docs/manual/administration/install-community/).
2. Fork, download and clone this repository.
3. In terminal `cd` into backend / frontend and run `npm init` to install required dependencies.
4. In backend create a `.env` file with the follwoing information e.g. `MONGODB_URL=mongodb://localhost:NUMBER`.
5. To run backend use the command `npm run start` from backend and frontend run command `npm start` from frontend.

## Acknowledgements

Special thanks to the following for their aid:
- [Nanashi](https://github.com/Mitame) / Nanashi Mitame 



Goal: Click on a character card grom the character grid and display information on said character.

Solution 1: Conditionally render a character details element on click; passing down character object prop from the character card to the character details element.
Problem: Character details element renders as a grid item FOR EACH character card grid item; creating a messy layout if multiple character card detail elements are open.

Solution 2: Extract out character details element to render above grid in same parent element as character grid.
Problem: Cannot pass selected character stdata up elements in same parant element from a child element (character grid card clicked). 

Solution 3: Character details element sits above grid and character objects are passed into it using a new React Context Provider. This enables the character state to be passed into elements globally; regardless of their position in the tree. Conditionally render this element only if selected character context provider is not undefined.