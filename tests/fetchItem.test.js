require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('fetchItems é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Verifica se a função é chamada com determinado parâmetro', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('testa se ao chamar a função ela utiliza o endPoint correto', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/items/MLB1615760527"); 
  });
  it('testa se o retorno da função é igual ao objeto existente', async () => {
    const obj = await fetchItem("MLB1615760527");
    expect(obj).toEqual(item);
  }); 
  it('testa se chamar a função sem argumento ela retornara um erro', async () => {
    const obj = await fetchItem();
    expect(obj).toEqual('You must provide an url');
  });
});
