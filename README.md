# ACME

Project repo for COGS 121

See `docs` folder for milestone documentation

### Get Started

- open two terminals (need to find a way to combine the two scripts) and run the following respectively

- `nodemon start`

- `npm run watch-css`

- for styling, (preferably) edit scss files only. Saving them will autocompile into a single css file as stylesheets/css/main.css

- There shouldn't be a need to restart the server since nodemon allows live reload on appjs and routes

### Guidelines

- try to stick to one SASS file to reduce requests (everything will compile into one css file. Use sass @imports if you're trying to separate page css)

- [Handlebars Documentation](https://www.npmjs.com/package/express-hbs). Look up if you're trying to make a page that doesn't use the general layout.hbs or importing page specific js/css libraries (see: blocks and layout-specific rendering options)
