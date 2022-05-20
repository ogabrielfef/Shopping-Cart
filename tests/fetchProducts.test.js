require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function')
  });
  it('Verifica se a função é chamada com determinado parâmetro', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('testa se ao chamar a função ela utiliza o endPoint correto', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador'); 
  });
  it('testa se o retorno da função é igual ao objeto existente', async () => {
    const obj = await fetchProducts('computador');
    expect(obj).toEqual(computadorSearch);
  });
  it('testa se chamar a função sem argumento ela retornara um erro', async () => {
    const obj = await fetchProducts();
    expect(obj).toEqual(new Error('You must provide an url'));
  });
});
