# NexusCraft Shoop — interface

Esta pasta contém uma **interface visual demonstrativa e responsiva** inspirada na imagem enviada. Não processa pagamentos reais nem entrega itens.

## Rodar localmente
1. Instale Node.js 18 ou superior.
2. No terminal, dentro desta pasta, execute `npm install`.
3. Execute `npm start`.
4. Abra `http://localhost:3000`.

## O que está incluído
- Layout azul neon/preto inspirado no mockup.
- Resumo do pedido e campo para nick.
- Opções selecionáveis: Pix, cartão de crédito, Mercado Pago e Asaas.
- Validação básica do nick no navegador e mensagens de demonstração.
- Layout responsivo para celular e computador.

## Antes de publicar
- Configure uma integração real com um provedor de pagamento aprovado.
- Use HTTPS e armazene tokens/chaves apenas no servidor, em variáveis de ambiente.
- Verifique os pagamentos no servidor por webhook assinado e consulte o status diretamente na API do provedor.
- Nunca entregue itens com base em captura de tela, redirecionamento do navegador ou informação enviada pelo cliente.
- Implemente prevenção de cobranças duplicadas, logs, proteção de dados e testes.
- A opção Pix permite ao comprador pagar a partir de qualquer banco/carteira compatível; isso não significa que Nubank/Inter tenham integrações próprias neste protótipo.
- O layout não inclui boleto.
