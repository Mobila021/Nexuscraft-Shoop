
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN;
const BASE_URL = (process.env.PUBLIC_BASE_URL || '').replace(/\/+$/, '');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Catálogo oficial de produtos e preços
const PRODUCTS = {
  '1.000 Moedas': 2.00,
  '5.000 Moedas': 5.00,
  '10.000 Moedas': 9.90,
  'Kit Básico': 2.00,
  'Kit Ferramentas': 4.00,
  'Kit Combate': 7.00,
  'VIP Básico': 4.00,
  'VIP Plus': 7.00,
  'VIP Prêmio': 10.00,
  'Chave Comum': 1.00,
  'Chave Rara': 4.00,
  'Chave Épica': 8.00,
  'Crate Comum': 2.00,
  'Crate Rara': 5.00,
  'Crate Lendária': 10.00
};

app.post('/criar-pagamento', async (req, res) => {
  try {
    if (!ACCESS_TOKEN) {
      return res.status(500).json({
        error: 'Pagamento ainda não configurado no servidor.'
      });
    }

    if (!/^https:\/\/.+/i.test(BASE_URL)) {
      return res.status(500).json({
        error: 'Configure PUBLIC_BASE_URL com a URL HTTPS da loja.'
      });
    }

    const { produto, nick, pagamento } = req.body || {};

    if (
      typeof produto !== 'string' ||
      !Object.prototype.hasOwnProperty.call(PRODUCTS, produto)
    ) {
      return res.status(400).json({
        error: 'Produto inválido.'
      });
    }

    if (
      typeof nick !== 'string' ||
      !/^[A-Za-z0-9_]{3,16}$/.test(nick.trim())
    ) {
      return res.status(400).json({
        error: 'Nick inválido.'
      });
    }

    const price = PRODUCTS[produto];
    const metodo = typeof pagamento === 'string' ? pagamento : 'Pix';

    const paymentMethods = {};

    // Se o cliente escolher Pix, prioriza Pix e exclui
    // cartões e boleto da página de pagamento.
    if (metodo.toLowerCase().includes('pix')) {
      paymentMethods.default_payment_method_id = 'pix';
      paymentMethods.excluded_payment_types = [
        { id: 'credit_card' },
        { id: 'debit_card' },
        { id: 'prepaid_card' },
        { id: 'ticket' }
      ];
    }

    // Se escolher cartão, tenta deixar apenas cartões.
    if (metodo.toLowerCase().includes('cartão')) {
      paymentMethods.excluded_payment_types = [
        { id: 'bank_transfer' },
        { id: 'ticket' }
      ];
    }

    const payload = {
      items: [{
        id: produto,
        title: produto,
        quantity: 1,
        currency_id: 'BRL',
        unit_price: price
      }],
      external_reference: JSON.stringify({
        product: produto,
        nick: nick.trim()
      }),
      back_urls: {
        success: `${BASE_URL}/?pagamento=sucesso`,
        failure: `${BASE_URL}/?pagamento=erro`,
        pending: `${BASE_URL}/?pagamento=pendente`
      },
      auto_return: 'approved',
      notification_url: `${BASE_URL}/webhook/mercadopago`,
      metadata: {
        product: produto,
        minecraft_nick: nick.trim(),
        selected_payment_method: metodo
      }
    };

    if (Object.keys(paymentMethods).length > 0) {
      payload.payment_methods = paymentMethods;
    }

    const response = await fetch(
      'https://api.mercadopago.com/checkout/preferences',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error('Erro do Mercado Pago:', response.status, data);

      return res.status(502).json({
        error: 'O Mercado Pago não conseguiu criar o pagamento. Verifique os logs do servidor.'
      });
    }

    if (!data.init_point) {
      return res.status(502).json({
        error: 'O link de pagamento não foi recebido.'
      });
    }

    return res.json({
      id: data.id,
      init_point: data.init_point,
      url: data.init_point
    });

  } catch (error) {
    console.error('Erro ao criar pagamento:', error);

    return res.status(500).json({
      error: 'Erro interno ao criar o pagamento.'
    });
  }
});

// ATENÇÃO: este webhook é provisório.
// Ele ainda não verifica a assinatura nem confirma pagamentos.
app.post('/webhook/mercadopago', (req, res) => {
  console.log('Notificação do Mercado Pago recebida.');
  return res.sendStatus(200);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`NexusCraft Shoop rodando na porta ${PORT}`);
});
