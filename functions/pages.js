module.exports = {
    pages: Function = async (arr, itemsPerPage, page = 1) => {
        const error = new Error(`[ PAGE_FUNCTION_ERR ] Page number is either below 1 or exceeds the maximum pages. [ pages.js 4:10 ]`);
        const maxPages = Math.ceil(arr.length / itemsPerPage);
        if (page < 1 || page > maxPages) throw error;
        return arr.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    }
}