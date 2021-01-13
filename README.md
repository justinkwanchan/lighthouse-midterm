# Wiki Map Midterm Project

Wiki Map is a full stack web application built with Node and Express that allows users to create and discover maps with destinations of interest. It supports user registration, allowing users to create, edit, and store their maps.

New update: Link analytics - each time a link is clicked, 3 data are tracked
* The total number of times the link is clicked
* The total number of unique visitors to click on a link (only counts when user logged in)
* A unique visitor ID and time stamp for each click

## Final Product

| !["The main page showing URLs created by the logged in user"](https://github.com/justinkwanchan/tinyapp/blob/master/docs/urls-page.png?raw=true) | !["The page for creating a new shortened URL"](https://github.com/justinkwanchan/tinyapp/blob/master/docs/create-url-page.png?raw=true) |
| ------------- |:-------------:|
| !["The page for editing an existing URL"](https://github.com/justinkwanchan/tinyapp/blob/master/docs/edit.url2.png?raw=true) | !["The main page scaled to mobile size with hamburger menu"](https://github.com/justinkwanchan/tinyapp/blob/master/docs/urls-page-mobile.png?raw=true) |


## Dependencies

- Node.js
- Express
- EJS
- body-parser
- chalk
- cookie-session
- dotenv
- morgan
- node-sass-middelware
- pg
- pg-native

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `node express_server.js` command.
