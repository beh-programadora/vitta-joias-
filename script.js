document.addEventListener('DOMContentLoaded', () => {
  // Controle das abas
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Remove active das abas e dos conteúdos
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabContents.forEach(c => c.classList.remove('active'));

      // Ativa a aba clicada e o conteúdo correspondente
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const tabId = btn.getAttribute('data-tab');
      const tabContent = document.getElementById(tabId);
      if (tabContent) tabContent.classList.add('active');
    });
  });

  // Controle do carrinho
  const cartBtn = document.getElementById('cart-btn');
  const cart = document.querySelector('.cart');
  const overlay = document.getElementById('overlay');
  const closeCartBtn = document.getElementById('close-cart');
  const cartItemsList = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');
  const continueShoppingBtn = document.getElementById('continue-shopping');
  const goToCheckoutBtn = document.getElementById('go-to-checkout');
  const cartQuestion = document.getElementById('cart-question'); // Mova para cá, só precisa buscar uma vez

  let cartItems = [];

 function updateCart() {
  cartItemsList.innerHTML = '';

  if (cartItems.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'Carrinho vazio.';
    cartItemsList.appendChild(li);
    cartTotalEl.textContent = 'Total: R$ 0,00';
    cartQuestion.style.display = 'none';  // Esconde botões
    return;
  }

  let total = 0;
  cartItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - R$ ${item.price.toFixed(2).replace('.', ',')} x ${item.quantity}`;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = '✕';
    removeBtn.setAttribute('aria-label', `Remover ${item.name} do carrinho`);
    removeBtn.style.marginLeft = '10px';
    removeBtn.style.cursor = 'pointer';
    removeBtn.style.background = 'transparent';
    removeBtn.style.border = 'none';
    removeBtn.style.color = '#d9534f';
    removeBtn.style.fontWeight = 'bold';
    removeBtn.addEventListener('click', () => removeFromCart(item.id));
    li.appendChild(removeBtn);

    cartItemsList.appendChild(li);

    total += item.price * item.quantity;
  });

  cartTotalEl.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
  cartQuestion.style.display = 'block'; // Mostra botões
}


function addToCart(id, name, price) {
  const existingItem = cartItems.find(item => item.id === id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ id, name, price, quantity: 1 });
  }
  updateCart();
  openCart(); // Abre carrinho com botões visíveis
}

  // Remover item do carrinho
  function removeFromCart(id) {
    cartItems = cartItems.filter(item => item.id !== id);
    updateCart();
  }

  // Abrir carrinho
  function openCart() {
    cart.classList.add('active');
    overlay.classList.add('active');
  }

  // Fechar carrinho
  function closeCart() {
    cart.classList.remove('active');
    overlay.classList.remove('active');
  }

  // Eventos adicionar ao carrinho
  const addCartBtns = document.querySelectorAll('.add-cart-btn');
  addCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const produto = e.target.closest('.produto');
      const id = produto.getAttribute('data-id');
      const name = produto.getAttribute('data-name');
      const price = parseFloat(produto.getAttribute('data-price'));
      addToCart(id, name, price);
    });
  });

  // Eventos abrir e fechar carrinho
  cartBtn.addEventListener('click', openCart);
  closeCartBtn.addEventListener('click', closeCart);
  overlay.addEventListener('click', closeCart);
  
  function openCart() {
  cart.style.display = 'block';
  overlay.style.display = 'block';
}

function closeCart() {
  cart.style.display = 'none';
  overlay.style.display = 'none';
}


  // Continuar comprando fecha o carrinho
  continueShoppingBtn.addEventListener('click', closeCart);

  goToCheckoutBtn.addEventListener('click', () => {
  if (cartItems.length === 0) {
    alert('O carrinho está vazio! Adicione produtos antes de finalizar a compra.');
    return; // Não faz nada se o carrinho estiver vazio
  }
  // Redireciona para a página pagamento.html
  window.location.href = 'pagamento.html';
});


  // Inicializa visual do carrinho vazio ao carregar
  updateCart();
});
