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

- [Handlebars Documentation](http://handlebarsjs.com/). If you are trying to use page-specific CSS/JS then use {{#extend}} (see index.hbs for an example)