const filterProducts = (products, filters) => {
  //When I Wrote It, Only God and I Knew how it Works; Now God Alone Knows
  if (filters.length === 0) {
    return products;
  }

  return products
    ?.map((product) => {
      let ret = false;
      filters?.forEach((filter) => {
        if (product.tags?.some((el) => el === filter)) ret = true;
      });

      if (ret) return product;
      return undefined;
    })
    .filter((el) => el !== undefined);
};

export default filterProducts;
