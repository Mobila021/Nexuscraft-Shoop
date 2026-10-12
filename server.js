
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/criar-pagamento', async (req, res) => {
  try {
    const token = process.env.MERCADO_PAGO_ACCESS_TOKEN;

    if (!token) {
      return res.status(500).json({
        erro: 'Pagamento ainda não configurado.'
      });
    }

    const { nome, valor } = req.body;

    if (
      typeof nome !== 'string' ||
      nome.trim().length === 0 ||
      typeof valor !== 'number' ||
      !Number.isFinite(valor) ||
      valor <= 0
    ) {
      return res.status(400).json({
        erro: 'Produto ou valor inválido.'
      });
    }

    const resposta = await fetch(
      'https://api.mercadopago.com/checkout/preferences',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items: [{
            title: nome.trim(),
            quantity: 1,
            unit_price: valor,
            currency_id: 'BRL'
          }],
          back_urls: {
            success: 'https://example.com/sucesso',
            failure: 'https://example.com/erro',
            pending: 'https://example.com/pendente'
          }
        })
      }
    );

    const dados = await resposta.json();

    if (!resposta.ok) {
      console.error('Erro ao criar pagamento:', resposta.status);
      return res.status(502).json({
        erro: 'Não foi possível criar o pagamento.'
      });
    }

    return res.json({
      id: dados.id,
      checkout_url: dados.init_point
    });
  } catch (erro) {
    console.error('Falha ao criar pagamento.');
    return res.status(500).json({
      erro: 'Erro interno ao criar pagamento.'
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Nexuscraft-Shoop rodando na porta ${PORT}`);
});
