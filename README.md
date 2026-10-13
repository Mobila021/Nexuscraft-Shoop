# NexusCraft Shoop — atualização de preparação

## O que esta versão faz
- Mantém a página e o checkout por links de produto já configurados no Render.
- Adiciona `package.json` para o Render instalar Express e o driver PostgreSQL.
- Cria/verifica a tabela `orders` quando `DATABASE_URL` está configurada.
- Expõe `GET /health` e `GET /health/db` para diagnóstico.

## Importante: pagamentos/entrega ainda NÃO estão automatizados
Esta versão não confirma pagamentos da Kiwify e não entrega itens no Minecraft. Não faça vendas reais contando com entrega automática. Antes disso, precisamos configurar o webhook usando o formato e a autenticação documentados pela Kiwify, associar com segurança o nick e o produto ao pedido, e instalar um plugin/API segura no servidor Paper para entregar pedidos pendentes uma única vez.

## Render
- Build Command: `npm install`
- Start Command: `npm start`
- Mantenha `DATABASE_URL` no Environment do serviço web. Não coloque credenciais no GitHub.
- `PGSSL=true` ativa SSL para o PostgreSQL. Se o banco/ambiente exigir outra configuração, ajuste com base nos logs do Render.

## Rotas de diagnóstico
- `GET /health`: serviço web
- `GET /health/db`: conexão com o banco (retorna somente status, sem credenciais)

A tabela criada é uma base inicial e ainda não autoriza nem libera pedidos por si só.
