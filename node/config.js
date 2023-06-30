const env = process.env;

const config = {
    listPerPage: env.LIST_PER_PAGE || 50,
};

module.exports = config;
