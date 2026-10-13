const products = {
  '1.000 Moedas': { price: 5, category: 'moedas', icon: '🪙' },
  '5.000 Moedas': { price: 8, category: 'moedas', icon: '💰' },
  '10.000 Moedas': { price: 12, category: 'moedas', icon: '💎' },
  '50.000 Moedas': { price: 15, category: 'moedas', icon: '💎' },
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

const seenProducts = new Set();
document.querySelectorAll('.product').forEach(card => {
  const button = card.querySelector('[data-product]');
  if (!button) return;
  if (seenProducts.has(button.dataset.product)) card.remove();
  else seenProducts.add(button.dataset.product);
});

const categoryCopy = {
  todos: ['Todos os produtos', 'Escolha o que combina com sua aventura.'],
  moedas: ['Moedas', 'Escolha o pacote de moedas para sua jornada.'],
  kits: ['Kits', 'Equipamentos e conjuntos para a aventura.'],
  vips: ['VIPs', 'Confira os planos e benefícios disponíveis.'],
  chaves: ['Chaves', 'Encontre chaves para as recompensas do servidor.'],
  crates: ['Crates', 'Escolha sua caixa de recompensas.']
};

document.querySelectorAll('.category').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.category').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const category = button.dataset.category;
    const copy = categoryCopy[category] || categoryCopy.todos;
    $('categoryTitle').textContent = copy[0];
    $('categoryDescription').textContent = copy[1];
    let visible = 0;
    document.querySelectorAll('.product').forEach(card => {
      const show = category === 'todos' || card.dataset.category === category;
      card.classList.toggle('hidden', !show);
      if (show) visible++;
    });
    $('noProducts').classList.toggle('hidden', visible > 0);
    $('loja').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

document.querySelectorAll('[data-product]').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.product;
    if (!products[key]) {
      $('message').textContent = 'Este produto ainda não está configurado.';
      return;
    }
    selectedProduct = { name: key, ...products[key] };
    $('chosenName').textContent = selectedProduct.displayName || selectedProduct.name;
    $('chosenPrice').textContent = money(selectedProduct.price);
    $('chosenIcon').textContent = selectedProduct.icon;
    $('total').textContent = money(selectedProduct.price);
    $('message').textContent = '';
    $('loja').classList.add('hidden');
    $('checkout').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

function backToShop() {
  $('checkout').classList.add('hidden');
  $('loja').classList.remove('hidden');
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
