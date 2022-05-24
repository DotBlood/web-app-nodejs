const { createPathUser } = require('../../core/lib/UIpath');
const Msg = require('../models/message');

async function ChatHistory(req, res) {
    await Msg
        .find()
        .then((messages) => res.render(createPathUser('chat'), { messages }))
        .catch((error) => errors(res, error));
};

module.exports = {ChatHistory};