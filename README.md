# NexusCraft Shoop — versão de preparação Kiwify

Esta pasta substitui o catálogo antigo por preços atualizados e retira a dependência do SDK Mercado Pago. Ela é uma versão de preparação: não está pronta para receber vendas até que os links oficiais Kiwify sejam configurados e o fluxo de identificação/entrega seja concluído e testado.

## Publicar no Render
- Build command: `npm install`
- Start command: `npm start`

## Configurar os links Kiwify no Render
Em Environment, adicione uma variável para cada produto. Copie o link de checkout HTTPS oficial do produto correspondente:

- `KIWIFY_URL_MOEDAS_1000`
- `KIWIFY_URL_MOEDAS_5000`
- `KIWIFY_URL_MOEDAS_10000`
- `KIWIFY_URL_KIT_BASICO`
- `KIWIFY_URL_KIT_FERRAMENTAS`
- `KIWIFY_URL_KIT_COMBATE`
- `KIWIFY_URL_VIP_BASICO`
- `KIWIFY_URL_VIP_PLUS`
- `KIWIFY_URL_VIP_PREMIUM`
- `KIWIFY_URL_CHAVE_COMUM`
- `KIWIFY_URL_CHAVE_RARA`
- `KIWIFY_URL_CHAVE_EPICA`
- `KIWIFY_URL_CRATE_COMUM`
- `KIWIFY_URL_CRATE_RARA`
- `KIWIFY_URL_CRATE_LENDARIA`

Não coloque tokens, chaves secretas, senhas ou credenciais no GitHub.

## Importante antes de vender
1. Este código valida o produto e o nick no backend e usa o link de checkout associado ao produto. O site não confirma o pagamento.
2. O nick Minecraft ainda não foi conectado ao checkout/webhook: o mecanismo de campos adicionais aceito pelo checkout Kiwify precisa ser confirmado antes de prometer entrega automática.
3. Não há webhook de compra aprovada nem entrega Minecraft implementados nesta versão. Não entregue itens com base apenas no retorno do navegador. A entrega deve depender de evento confiável de compra aprovada, validação do webhook, verificação de produto/valor e controle contra eventos repetidos.
4. Confirme no painel Kiwify os preços permitidos, taxas, políticas de venda e os links certos para cada produto.
5. Os preços no catálogo são: 1.000 Moedas R$5; 5.000 Moedas R$8; 10.000 Moedas R$12; Kit Básico R$5; Kit Ferramentas R$7; Kit Combate R$12; VIP Básico R$10; VIP Plus R$17; VIP Premium R$25; Chave Comum R$5; Chave Rara R$8; Chave Épica R$15; Crate Comum R$5; Crate Rara R$10; Crate Lendária R$20.

## Rotas disponíveis
- `GET /api/produtos` — retorna o catálogo e os valores oficiais.
- `POST /api/checkout` — recebe `{ "produto": "Kit Básico", "nick": "SeuNick" }` e devolve o link do checkout configurado. Retorna erro claro se o link estiver ausente.
- `GET /health` — verificação básica do serviço.
