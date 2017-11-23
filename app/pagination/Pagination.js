class Pagination
{
    /**
     * Create new instance of Pagination.
     * 
     * @param {Array}  data 
     * @param {Number} page 
     * @param {Number} perPage 
     * @param {Number} total 
     * @param {Object} req 
     */
    constructor (data, page, perPage, total, req) {
        this.data = data;
        this.page = Number(page);
        this.perPage = perPage;
        this.total = total;
        this.lastPage = Math.ceil(total / perPage);
        this.req = req;
    }

    /**
     * Define url of the next page.
     *
     * @return {Number|Null}
     */
    nextPageUrl () {
        if (this.hasNextPage ()) {
            return this.createUrlFor(this.page + 1);
        }

        return null;
    }

    /**
     * Check if pagination has next page.
     *
     * @return {Boolean}
     */
    hasNextPage () {
        return this.page < this.lastPage;
    }

    /**
     * Define url of the previous page.
     *
     * @return {String|Null}
     */
    prevPageUrl () {
        if (this.hasPreviousPage ()) {
            return this.createUrlFor(this.page - 1);
        }

        return null;
    }

    /**
     * Check if paginator has previous page.
     *
     * @return {Boolean}
     */
    hasPreviousPage () {
        return this.page > 1;
    }

    /**
     * Create url for the page.
     *
     * @param  {Number} page
     * @return {String}
     */
    createUrlFor (page) {
        return this.req.originalUrl
            .replace(/(.*\/list\/)([0-9]+)/, '$1' + this.normalizePage(page));
    }

    /**
     * Normalize page in allowed range.
     * 
     * @param  {Number} page 
     * @return {Number}
     */
    normalizePage (page) {
        if (page <= 0) {
            return page = 1;
        }

        if (page > this.lastPage) {
            return this.lastPage;
        }

        return page;
    }
}

module.exports = Pagination;