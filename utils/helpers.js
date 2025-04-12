const moment = require('moment');

const formatTimestamp = (timestamp) => moment(timestamp).format('YYYY-MM-DD');

module.exports = { formatTimestamp };
