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

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
  .addEventListener('click', chamaFetchItem);
  
  document.querySelector('.items').appendChild(section)
}

async function chamaFetchItem(event){
  const id = event.target.parentElement.firstChild.innerText;
  const cartItem = await fetchItem(id);
  const {id: sku, title: name, price: salePrice  } = cartItem;
  createCartItemElement({ sku, name, salePrice })
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return document.querySelector(".cart__items").appendChild(li);
}

async function chamaFetch(){
  const arrayDeElementos = await fetchProducts('computador');
  arrayDeElementos.results.forEach((result) => {
    const {id: sku, title: name, thumbnail: image  } = result;
    createProductItemElement({ sku, name, image })
  })
} 
chamaFetch();



window.onload = () => { };
