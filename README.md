# [ACME](https://acme-cogs121.herokuapp.com)

Project repo for COGS 121

See `docs` folder for milestone documentation

### Get Started

- First install node modules with `npm install`

- Start local dev server: use `npm run dev`

- for styling, (preferably) edit scss files only. Saving them will autocompile into a single css file as stylesheets/css/main.css

- There shouldn't be a need to restart the server since nodemon allows live reload on appjs and routes

### Guidelines

- try to stick to one SASS file to reduce requests (everything will compile into one css file. Use sass @imports if you're trying to separate page css)

- [Handlebars Documentation](http://handlebarsjs.com/). If you are trying to use page-specific CSS/JS then use {{#extend}} (see index.hbs for an example)

- [Skeleton.js Documentation](http://getskeleton.com/)

- [Redis Documentation](https://github.com/NodeRedis/node_redis) & [Redis Tutorial (with command explanations!)](https://redis.io/topics/twitter-clone)

- [Express Routing & Requests](https://expressjs.com/en/guide/routing.html)
