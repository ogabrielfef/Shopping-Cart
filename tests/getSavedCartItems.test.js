const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado;', () => {
    getSavedCartItems('cartItem')
    expect(localStorage.getItem).toHaveBeenCalled()
  })
  it("este se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o 'cartItems' como parâmetro.", () => {
    getSavedCartItems('cartItem')
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems')
  })
});
