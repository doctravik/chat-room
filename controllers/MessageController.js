const Message = require('./../models/Message');
const { responseNotFound } = require('./../app/errors/index');

module.exports = {
    /**
     * Get paginated list of messages.
     */
    index: (req, res, next) => {
        Message.find()
            .sort({created: 'desc'})
            .paginate(req.params.page, 10, req)
            .then(messages => {
                res.status(200)
                    .json(Message.transform(messages))
            }).catch(next);
    },

    /**
     * Create new message.
     */
    create: (req, res, next) => {
        Message.create(req.body).then(message => {
            return res.status(201)
                .json(Message.transform(message));
        })
        .catch(next);
    },

    /**
     * Get message by id.
     */
    show: (req, res, next) => {
        Message.findOne({_id: req.params.id}).then(message => {
            if (message === null) {
                return res.status(404).json(responseNotFound);
            } else {
                return res.status(200).json(Message.transform(message));
            }
        }).catch(next);
    },
}