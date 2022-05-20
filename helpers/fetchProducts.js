const fetchProducts = async (produto) => {
  try {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${produto}`);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}