const {createPath} = require('../../core/lib/UIpath');

const handlError = (res, error) => {
    console.log(error);
    res.redirect('/error');
};


module.exports = handlError;