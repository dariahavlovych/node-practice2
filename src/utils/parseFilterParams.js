const parseCategory = (category) => {
  const isString = typeof category === 'string';
  if (!isString) return;
  const isCategoryExist = (category) =>
    ['books', 'electronics', 'clothing', 'other'].includes(category);

  if (isCategoryExist(category)) return category;
};

const parseNumber = (value) => {
  const isString = typeof value === 'string';
  if (!isString) return;

  const parseNumber = parseFloat(value);
  if (Number.isNaN(parseNumber)) return;

  return parseNumber;
};

export const parseFilterParams = (query) => {
  const { category, minPrice, maxPrice } = query;
  const parsedCategory = parseCategory(category);
  const parsedMinPrice = parseNumber(minPrice);
  const parsedMaxPrice = parseNumber(maxPrice);
  return {
    category: parsedCategory,
    minPrice: parsedMinPrice,
    maxPrice: parsedMaxPrice,
  };
};
