const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json({ limit: '20kb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Valores oficiais do catálogo. O preço é definido no servidor, nunca pelo navegador.
const PRODUCTS = {
  '1.000 Moedas': { price: 5.00, checkoutEnv: 'KIWIFY_URL_MOEDAS_1000' },
  '5.000 Moedas': { price: 8.00, checkoutEnv: 'KIWIFY_URL_MOEDAS_5000' },
  '10.000 Moedas': { price: 12.00, checkoutEnv: 'KIWIFY_URL_MOEDAS_10000' },
  '50.000 Moedas': { price: 15.00, checkoutEnv: 'KIWIFY_URL_MOEDAS_50000' },
  'Kit Básico': { price: 5.00, checkoutEnv: 'KIWIFY_URL_KIT_BASICO' },
  'Kit Ferramentas': { price: 7.00, checkoutEnv: 'KIWIFY_URL_KIT_FERRAMENTAS' },
  'Kit Combate': { price: 12.00, checkoutEnv: 'KIWIFY_URL_KIT_COMBATE' },
  'VIP Básico': { price: 10.00, checkoutEnv: 'KIWIFY_URL_VIP_BASICO' },
  'VIP Plus': { price: 17.00, checkoutEnv: 'KIWIFY_URL_VIP_PLUS' },
  'VIP Prêmio': { price: 25.00, checkoutEnv: 'KIWIFY_URL_VIP_PREMIUM' },
  'Chave Comum': { price: 5.00, checkoutEnv: 'KIWIFY_URL_CHAVE_COMUM' },
  'Chave Rara': { price: 8.00, checkoutEnv: 'KIWIFY_URL_CHAVE_RARA' },
  'Chave Épica': { price: 15.00, checkoutEnv: 'KIWIFY_URL_CHAVE_EPICA' },
  'Crate Comum': { price: 5.00, checkoutEnv: 'KIWIFY_URL_CRATE_COMUM' },
  'Crate Rara': { price: 10.00, checkoutEnv: 'KIWIFY_URL_CRATE_RARA' },
  'Crate Lendária': { price: 20.00, checkoutEnv: 'KIWIFY_URL_CRATE_LENDARIA' }
};

app.get('/api/produtos', (_req, res) => {
  res.json(Object.entries(PRODUCTS).map(([name, p]) => ({ name, price: p.price })));
});

app.post('/api/checkout', (req, res) => {
  const { produto, nick } = req.body || {};
  if (typeof produto !== 'string' || !Object.hasOwn(PRODUCTS, produto)) {
    return res.status(400).json({ error: 'Produto inválido.' });
  }
  if (typeof nick !== 'string' || !/^[A-Za-z0-9_]{3,16}$/.test(nick.trim())) {
    return res.status(400).json({ error: 'Digite um nick válido do Minecraft (3 a 16 caracteres, letras, números e _).' });
  }

  const item = PRODUCTS[produto];
  const checkoutUrl = process.env[item.checkoutEnv];
  if (!checkoutUrl) {
    return res.status(503).json({
      error: `O checkout de "${produto}" ainda não foi configurado. O responsável pela loja precisa cadastrar o link Kiwify no Render (${item.checkoutEnv}).`
    });
  }
  let parsed;
  try { parsed = new URL(checkoutUrl); } catch {
    return res.status(500).json({ error: 'O link de checkout configurado é inválido.' });
  }
  if (parsed.protocol !== 'https:' || !/(^|\.)kiwify\.com\.br$/i.test(parsed.hostname)) {
    return res.status(500).json({ error: 'O link configurado precisa ser um checkout HTTPS oficial da Kiwify.' });
  }
  // Não anexamos o nick à URL: precisamos confirmar o método correto de passá-lo ao checkout/webhook.
  return res.json({ url: parsed.toString(), price: item.price, note: 'Confira os dados no checkout antes de pagar.' });
});

app.get('/health', (_req, res) => res.json({ ok: true, service: 'NexusCraft Shoop' }));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`NexusCraft Shoop rodando na porta ${PORT}`);
});
