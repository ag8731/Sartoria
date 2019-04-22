## Setup

You will need: Python 3, node, and PostgreSQL.<br>
You can install the dependencies for the project with a simple `npm install`.

### `npm start`

Runs the react app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will perform hot module replacement if you make edits.<br>
You will also see any lint errors in the console.

### `npm run api`

Starts the django server at [http://localhost:8000](http://localhost:8000).<br>
All api requests from the react frontend depend on a proxy that hits this endpoint.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
