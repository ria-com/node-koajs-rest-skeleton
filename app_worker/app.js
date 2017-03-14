const config = require("config");
require('./workers/' + config.worker);
