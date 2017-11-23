class MessageTransformer
{
    /**
     * Message outputting.
     * 
     * @param  {Object} message
     * @return {Object} 
     */
    transformItem (message) {
        return {
            id: String(message.id),
            email: message.email,
            body: message.body,
            created: message.created,
            updated: message.updated
        }
    }

    /**
     * Outputting collection of Messages with pagination.
     * 
     * @param  {Object} pagination
     * @return {Object}
     */
    transformCollection (pagination) {
        let messages = pagination.data.map(message => {
            return this.transformItem(message);
        })

        return {
            data: messages,
            links: {
                prev: pagination.prevPageUrl(),
                next: pagination.nextPageUrl()
            },
            meta: {
                total: pagination.total,
                per_page: pagination.perPage,
                current_page: pagination.page,
                last_page: pagination.lastPage
            }
        }
    }
}

module.exports = MessageTransformer;