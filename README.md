# Phonebook

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you MUST run the following two commands:

### `npm start` as frontend

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

If port 3000 is not available, a message will be prompt:

> ? Something is already running on port 3000. Probably:
  /usr/local/bin/node server.js (pid 12503)
  in /some/route

> Would you like to run the app on another port instead? › (Y/n)

Choose yes and the app will be open with the next available port, like in my case, which was 3001

### `npm server` as backend

Starts a [json-server](https://github.com/typicode/json-server) that works as a REST API server which consumes/writes data from/on the `db.js` file.
