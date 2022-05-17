// include path on lib
const path = require('path');

// include views
const createPath = (page) => path.resolve(__dirname, '../../views', `${page}.ejs`);

//export path
module.exports = createPath;
