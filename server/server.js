// import modules
const path = require('path'),
      koa = require('koa');

const log = require('./log.js');
const utils = require('./utils.js');

const port = utils.getOpts('port', 3000),
app = new koa();

// import middlewares
const bodyParser = require('koa-bodyparser'),
      staticFile = require('koa-static');

const router = require('./router.js');

app.use(bodyParser({ encode: 'utf8' }));
app.use(router());
app.use(staticFile(path.resolve(__dirname, '../dist')));

// start server
const server = app.listen(port, () => {
    log.info(`App listens at port ${port}...`);
});
