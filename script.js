const getOlItem = document.querySelector('.cart__items');
const items = document.querySelector('.items');

const adicionaLoading = () => {
  const loadMessage = document.createElement('p');
  loadMessage.className = 'loading';
  loadMessage.innerText = 'Loading...';
  items.appendChild(loadMessage);
};

const removeLoading = () => {
  const loadingMessage = document.querySelector('.loading');
  loadingMessage.remove();
};

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

async function cartItemClickListener(event) {
  event.target.remove();
}

function getSkuFromProductItem(event) {
  return event.target.parentElement.firstChild.innerText;
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return document.querySelector('.cart__items').appendChild(li);
}

async function chamaFetchItem(event) {
  const id = getSkuFromProductItem(event);
  const cartItem = await fetchItem(id);
  const { id: sku, title: name, price: salePrice } = cartItem;
  createCartItemElement({ sku, name, salePrice });
  saveCartItems(getOlItem.innerHTML);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
  .addEventListener('click', chamaFetchItem);
  document.querySelector('.items').appendChild(section);
}

async function chamaFetch() {
  adicionaLoading();
  const arrayDeElementos = await fetchProducts('computador');
  removeLoading();
  arrayDeElementos.results.forEach((result) => {
    const { id: sku, title: name, thumbnail: image } = result;
    createProductItemElement({ sku, name, image });
  });
} 
chamaFetch();

document.querySelector('.empty-cart').addEventListener('click', () => {
  localStorage.clear();
  getOlItem.innerHTML = '';
});

window.onload = async () => {
  getOlItem.innerHTML = getSavedCartItems();
  const itensDoCarrinho = document.querySelectorAll('.cart__item');
  Array.from(itensDoCarrinho);
  itensDoCarrinho.forEach((iten) => iten.addEventListener('click', cartItemClickListener));
};
