# Crypto Tax Tracker
### Description
React and Express application to log personal cryptocurrency transactions and display current market information.

### Project Setup
1. Clone the repo\
   `git clone git@github.com:BE-Design/crypto_tax_tracker.git`

#### Setup Express API Backend
2. Install dependencies for the Express server in the project's root directory\
   `npm install`


3. Run Sequelize database migrations

   `npx sequelize-cli db:migrate`\
\
   *Note: this will create a `database.sqlite3` database in the root directory. This can be customized inside the `config/config.json` file*


4. Copy the example environment file and make any necessary changes\
`cp ./.env.example .env`

#### Setup React App Frontend
5. Install dependencies for the React app inside the `client` directory:\
`cd ./client`\
`npm install`


6. Clone the example environment file and set the URL for the Express API backend

   `cp ./.env.example .env`

   `REACT_APP_BASE_URL=127.0.0.1:666`

### Running the Express API Backend
Production: `npm run start`\
Development:`npm run watch`


### Running React Frontend
`cd ./client`\
`npm run start`
