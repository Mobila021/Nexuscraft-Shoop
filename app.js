const products = {
  '1.000 Moedas': { price: 5, category: 'moedas', icon: '🪙' },
  '5.000 Moedas': { price: 8, category: 'moedas', icon: '💰' },
  '10.000 Moedas': { price: 12, category: 'moedas', icon: '💎' },
  '50.000 Moedas': { price: 20, category: 'moedas', icon: '💎' },
  'Kit Básico': { price: 5, category: 'kits', icon: '🎒' },
  'Kit Ferramentas': { price: 7, category: 'kits', icon: '⛏️' },
  'Kit Combate': { price: 12, category: 'kits', icon: '⚔️' },
  'VIP Básico': { price: 10, category: 'vips', icon: '🥉' },
  'VIP Plus': { price: 17, category: 'vips', icon: '🥈' },
  'VIP Prêmio': { price: 25, category: 'vips', icon: '🥇', displayName: 'VIP Premium' },
  'Chave Comum': { price: 5, category: 'chaves', icon: '🗝️' },
  'Chave Rara': { price: 8, category: 'chaves', icon: '🔑' },
  'Chave Épica': { price: 15, category: 'chaves', icon: '✨' },
  'Crate Comum': { price: 5, category: 'crates', icon: '📦' },
  'Crate Rara': { price: 10, category: 'crates', icon: '🎁' },
  'Crate Lendária': { price: 20, category: 'crates', icon: '🌟' }
};
let selectedProduct = null;
const money = value => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const $ = id => document.getElementById(id);

const categoryCopy = {
  todos: ['Todos os produtos', 'Escolha seu próximo item e continue sua aventura.'],
  moedas: ['Moedas', 'Escolha o pacote de moedas para sua jornada.'],
  kits: ['Kits', 'Equipamentos e conjuntos para se preparar para a aventura.'],
  vips: ['VIPs', 'Confira os planos e benefícios disponíveis.'],
  chaves: ['Chaves', 'Encontre chaves para as recompensas do servidor.'],
  crates: ['Crates', 'Escolha sua caixa de recompensas.']
};

const productDetails = {
  '1.000 Moedas': ['Moedas', ['1.000 moedas para usar na economia do servidor']],
  '5.000 Moedas': ['Moedas', ['5.000 moedas para usar na economia do servidor']],
  '10.000 Moedas': ['Moedas', ['10.000 moedas para usar na economia do servidor']],
  '50.000 Moedas': ['Moedas', ['50.000 moedas para usar na economia do servidor']],
  'Kit Básico': ['Kit', ['Itens iniciais para ajudar na aventura', 'Conteúdo entregue conforme a configuração do servidor']],
  'Kit Ferramentas': ['Kit de ferramentas', ['Conjunto de ferramentas para o começo', 'Conteúdo entregue conforme a configuração do servidor']],
  'Kit Combate': ['Kit de combate', ['Equipamentos de combate para sua aventura', 'Conteúdo entregue conforme a configuração do servidor']],
  'VIP Básico': ['VIP', ['Benefícios do plano de entrada', 'Vantagens e permissões definidas pelo servidor']],
  'VIP Plus': ['VIP Plus', ['Benefícios adicionais do plano intermediário', 'Vantagens e permissões definidas pelo servidor']],
  'VIP Prêmio': ['VIP Premium', ['Benefícios do plano especial', 'Vantagens e permissões definidas pelo servidor']],
  'Chave Comum': ['Chave', ['1 chave comum para abrir recompensas comuns']],
  'Chave Rara': ['Chave rara', ['1 chave rara para recompensas de raridade superior']],
  'Chave Épica': ['Chave épica', ['1 chave épica para recompensas épicas']],
  'Crate Comum': ['Crate', ['1 crate comum com recompensas comuns']],
  'Crate Rara': ['Crate rara', ['1 crate rara com recompensas raras']],
  'Crate Lendária': ['Crate lendária', ['1 crate lendária com recompensas especiais']]
};

function openProductDetails(key) {
  if (!products[key]) return;
  selectedProduct = { name: key, ...products[key] };
  const detail = productDetails[key] || ['Produto', ['Conteúdo conforme a descrição do servidor']];
  $('detailTitle').textContent = selectedProduct.displayName || key;
  $('detailIcon').textContent = selectedProduct.icon;
  $('detailCategory').textContent = detail[0].toUpperCase();
  $('detailDescription').textContent = `${selectedProduct.displayName || key} — confira abaixo o conteúdo incluído.`;
  $('detailPrice').textContent = money(selectedProduct.price);
  $('detailContents').replaceChildren();
  detail[1].forEach(item => { const row = document.createElement('div'); row.className = 'detail-content-item'; const mark = document.createElement('span'); mark.className = 'detail-check'; mark.textContent = '✓'; const text = document.createElement('span'); text.textContent = item; row.append(mark, text); $('detailContents').append(row); });
  $('loja').classList.add('hidden');
  $('productDetail').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function backToProducts() { $('productDetail').classList.add('hidden'); $('loja').classList.remove('hidden'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
$('detailBack').addEventListener('click', backToProducts);
$('detailBuy').addEventListener('click', () => {
  if (!selectedProduct) return;
  $('chosenName').textContent = selectedProduct.displayName || selectedProduct.name;
  $('chosenPrice').textContent = money(selectedProduct.price);
  $('chosenIcon').textContent = selectedProduct.icon;
  $('total').textContent = money(selectedProduct.price);
  $('message').textContent = '';
  $('nickname').value = '';
  $('productDetail').classList.add('hidden');
  $('checkout').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

function filterCategory(category) {
  $('welcomeView')?.classList.add('hidden');
  document.querySelector('.welcome')?.classList.add('hidden');
  document.querySelector('.category-section')?.classList.add('hidden');
  document.querySelector('.support-strip')?.classList.add('hidden');
  document.querySelector('footer')?.classList.add('hidden');
  $('loja').classList.remove('hidden');
  document.querySelectorAll('.category-card').forEach(button => {
    button.classList.toggle('active', button.dataset.category === category);
  });
  const copy = categoryCopy[category] || categoryCopy.todos;
  $('categoryTitle').textContent = copy[0];
  $('categoryDescription').textContent = copy[1];
  let visible = 0;
  document.querySelectorAll('.product').forEach(card => {
    const show = category === 'todos' || card.dataset.category === category;
    card.classList.toggle('hidden', !show);
    if (show) visible++;
  });
  $('productCount').textContent = `${visible} produto${visible === 1 ? '' : 's'}`;
  $('noProducts').classList.toggle('hidden', visible > 0);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function backToCategories() {
  $('loja').classList.add('hidden');
  document.querySelector('.welcome')?.classList.remove('hidden');
  document.querySelector('.category-section')?.classList.remove('hidden');
  document.querySelector('.support-strip')?.classList.remove('hidden');
  document.querySelector('footer')?.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
$('backCategories').addEventListener('click', backToCategories);

document.querySelectorAll('.category-card, [data-category="todos"].text-link').forEach(button => {
  button.addEventListener('click', () => filterCategory(button.dataset.category || 'todos'));
});

document.querySelectorAll('[data-product]').forEach(button => {
  button.addEventListener('click', () => openProductDetails(button.dataset.product));
});

function backToShop() {
  $('checkout').classList.add('hidden');
  if (selectedProduct) $('productDetail').classList.remove('hidden');
  else $('loja').classList.remove('hidden');
  $('message').textContent = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
$('back').addEventListener('click', backToShop);

$('continue').addEventListener('click', async () => {
  const nick = $('nickname').value.trim();
  if (!selectedProduct) {
    $('message').textContent = 'Selecione um produto.';
    return;
  }
  if (!/^[A-Za-z0-9_]{3,16}$/.test(nick)) {
    $('message').textContent = 'Digite um nick de 3 a 16 caracteres, usando letras, números ou _.';
    $('nickname').focus();
    return;
  }
  $('continue').disabled = true;
  $('message').textContent = 'Verificando o checkout...';
  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ produto: selectedProduct.name, nick })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || 'Não foi possível iniciar o checkout.');
    if (!data.url) throw new Error('O checkout não retornou um link válido.');
    window.location.assign(data.url);
  } catch (error) {
    $('message').textContent = error.message || 'Erro ao abrir o checkout.';
  } finally {
    $('continue').disabled = false;
  }
});
