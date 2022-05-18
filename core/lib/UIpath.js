// include path on lib
const path = require('path');

// include views
const createPath = (page) => path.resolve(__dirname, '../../views', `${page}.ejs`);
const createPathAdmin = (page) => path.resolve(__dirname, '../../views/admin', `${page}.ejs`);
const createPathUser = (page) => path.resolve(__dirname, '../../views/user', `${page}.ejs`);

//export path
module.exports = {
    createPath,
    createPathUser,
    createPathAdmin
};
