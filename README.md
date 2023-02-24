# MenuWorker

https://menuworker.onrender.com  
MenuWorker is platform providing easy, intuitive tools to create and manage restaurant's menus.

## Features

- Intuitive UI
- Multiple Restaurants
- PDF Generation
- QR Code support
- Sharing mechanism

## Tech Stack

- Express.js
- PostgreSQL
- Sequelize ORM
- Redis
- Passport.js
- Background processing with Bull
- Mocha & Chai
- Nodemailer
- html-pdf-node
- EJS view engine
- Bootstrap v5

## Installation

MenuWorker is ran beneath mysql and redis. Before I provide docker compose file, make sure you have both mysql and redis running on deafult ports. Besides, you also need to add mysql user reflecting one in `src/config/config.json`.

However, if you want change port you can always modify corresponding environmental variables.

Install dependencies

```bash
  npm install
```

Run migration and seeding script

```bash
  npm run db:reset
```

Run server instance

```bash
  npm run dev
```

`dev` script will run Express server and Bull queue in parallel.
