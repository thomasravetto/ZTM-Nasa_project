const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 0;

const getPagination = (query) => {
    const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;
    const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;
    const skip = (page - 1) * limit;

    console.log(limit, page, skip)

    return {
        skip: skip,
        limit: limit,
    }
}

module.exports = {
    getPagination
}