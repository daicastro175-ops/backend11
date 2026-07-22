const getPagination = (queryParams) => {
  return {
    limit: Number(queryParams.limit) || 10,
    page: Number(queryParams.page) || 1
  };
};

const getSort = (sort) => {
  if (sort === "asc") return { price: 1 };
  if (sort === "desc") return { price: -1 };

  return {};
};

const getFilter = (query) => {
  const filter = {};

  if (!query) return filter;

  if (query === "available") {
    filter.stock = { $gt: 0 };
  } else {
    filter.category = query;
  }

  return filter;
};

const buildLinks = (result, limit) => {
  return {
    prevLink: result.hasPrevPage
      ? `/api/products?page=${result.prevPage}&limit=${limit}`
      : null,

    nextLink: result.hasNextPage
      ? `/api/products?page=${result.nextPage}&limit=${limit}`
      : null
  };
};


export default {
  getPagination,
  getSort,
  getFilter,
  buildLinks
};