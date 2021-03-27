# Catch! Pokemon
Catch! Pokemon is a web application where you can see any information about all of the Pokemon in the world and you gotta catch em' all!

## Available Scripts

To install and run the project in your local computer, you need to do:<br />
1. Open terminal<br />
2. In your terminal, run command:<br /><br />
`git clone git@github.com:shantisetiani/catch-pokemon.git`<br />
to clone this project.<br /><br />
`cd catch-pokemon`<br />
to go to the project directory. And then:<br /><br />
`npm install`<br /><br />
3. In the project folder, copy and paste `.env.example` file and rename it into `.env`<br />

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
<br /><br />

---

## Folder Structure

    .
    ├── ...
    ├── src                         # Source Files
    │   ├── __tests__               # Testing files for actions and reducers
    │   ├── assets                  # All of the images used in this webApp
    │   ├── components              # Reusable components
    │   │   ├── styled              # Styled Components using @emotion
    │   │   └── ...
    │   ├── config                  # Configuration of url
    │   ├── layout                  # Layout Components
    │   ├── pages                   # All pages of the webApp
    │   │   ├── __tests__           # Testing files for pages
    │   │   ├── 404                 # Default page if the url entered not match any page
    │   │   ├── my-pokemon-list     # My Pokemon List page
    │   │   │   ├── column.js       # Column for AntDesign's table
    │   │   │   └── index.js        # Main component
    │   │   ├── pokemon-detail      # Pokemon Detail page
    │   │   ├── pokemon-list        # Pokemon List page
    │   │   │   ├── column.js       # Column for AntDesign's table
    │   │   │   └── index.js        # Main component
    │   │   └── index.js            # Main component of this webApp, contains layout and all pages with Router
    │   ├── redux                   # Redux files, contains action and reducer
    │   ├── scss                    # SCSS files
    │   ├── action.js               # Combination of all of the actions from redux folder
    │   ├── index.js                # Main component of React App, render the ReactDOM
    │   ├── index.scss              # Combination of all of the scss files 
    │   ├── serviceWorker.js        # Service Worker for PWA
    │   ├── setupTests.js           # Setup for testing purpose
    │   └── store.js                # Redux store, combine all reducers
    └── ...