# NexusCraft Shoop — catálogo ampliado e integração Kiwify

Este ZIP mantém os produtos atuais e acrescenta XP por níveis e geradores de criaturas. O backend valida o preço e o nome Kiwify esperado para cada item, associa o checkout ao nick usando um token `s1`, registra pedidos no PostgreSQL e oferece uma fila privada para um plugin/bridge Paper.

## Catálogo adicionado

### XP (o pacote de 5 níveis foi removido)
- XP — 10 níveis: R$ 5,00
- XP — 20 níveis: R$ 8,00
- XP — 30 níveis: R$ 10,00
- XP — 50 níveis: R$ 15,00
- XP — 100 níveis: R$ 25,00

### Geradores de criaturas
- **Comuns — R$ 5,00:** Galinhas, Porcos e Vacas.
- **Básicos — R$ 7,00:** Zumbis e Aranhas.
- **Intermediários — R$ 12,00:** Esqueletos, Creepers e Slimes.
- **Raros — R$ 16,00:** Endermans, Blazes, Cubos de Magma e Bruxas.
- **Especiais — R$ 18,00:** Guardiões, Phantoms e Golem de Ferro.

Os geradores são itens de catálogo. A entrega real depende de um plugin de spawners compatível com a versão do Paper e de confirmar quais tipos esse plugin suporta; em especial, Golem de Ferro, Guardiões e Phantoms podem não ser suportados por todo plugin. Não anuncie entrega automática até testar.

## Importante antes de vender

- O catálogo aparece no site, mas **cada produto só abre checkout quando as duas variáveis Kiwify específicas estiverem configuradas no Render**: `KIWIFY_PRODUCT_NAME_*` com o nome exato que chega no webhook e `KIWIFY_URL_*` com o link oficial HTTPS.
- Os nomes dos produtos Kiwify precisam corresponder exatamente ao produto comprado. Configure webhook para eventos de compra aprovada e reembolso/chargeback, se disponíveis.
- O banco associa cada token `s1` ao nick e ao produto esperado. Um produto diferente, token ausente/expirado ou segredo incorreto não libera pedido.
- O `order_id` da Kiwify evita enfileirar a mesma compra duas vezes.
- Reembolsos/chargebacks atualizam o status, mas a remoção automática de benefícios já entregues não está implementada.
- **A entrega no Minecraft ainda NÃO acontece só com este ZIP.** É necessário instalar/configurar um plugin/bridge Paper que consuma `/api/game/pending`, entregue o item e chame `/api/game/orders/:id/delivered` só após confirmar a entrega.
- O plugin precisa saber como entregar cada produto (permissões para VIPs, comandos para moedas/XP/kits e item/gerador para spawners). Não venda contando com entrega automática até essa etapa ser implementada e testada.
- Faça uma cópia de segurança do repositório antes de substituir arquivos.

## Deploy

1. Extraia o ZIP e envie os arquivos e a pasta `public/` para a raiz do repositório GitHub `Mobila021/Nexuscraft-Shoop`, substituindo os arquivos correspondentes.
2. No Render, use Build Command `npm install` e Start Command `npm start`.
3. Mantenha `DATABASE_URL` e `PGSSL=true` se seu PostgreSQL exigir SSL. As tabelas são criadas/atualizadas ao iniciar.
4. No Render > Environment, configure `KIWIFY_WEBHOOK_SECRET`, `GAME_API_TOKEN`, e para cada produto que vai vender configure as duas variáveis específicas listadas em `.env.example`.
5. Configure o webhook Kiwify para `https://SEU-DOMINIO-RENDER/webhooks/kiwify/VALOR_DO_KIWIFY_WEBHOOK_SECRET`. Este endereço contém um segredo; não o publique nem envie para terceiros.
6. Teste `/health` e `/health/db`, depois teste uma compra em modo apropriado e confirme os logs antes de abrir vendas.

## API privada para o plugin Paper

Todas as chamadas exigem `Authorization: Bearer SEU_GAME_API_TOKEN`.

- `GET /api/game/pending` — lista pedidos aprovados aguardando entrega.
- `POST /api/game/orders/ID/delivered` — marca o pedido como entregue após a entrega real ser confirmada.

Nunca coloque `GAME_API_TOKEN`, `DATABASE_URL` ou o segredo do webhook no JavaScript do site ou no GitHub. Use `.env.example` apenas como modelo; não envie `.env` com valores reais.


## Categorias visuais e produtos adicionados

A página inicial agora mostra categorias em uma única coluna, na ordem escolhida, com cores: VIPs vermelho; Kits azul; Moedas dourado; XP verde; Chaves ciano; Caixas laranja; Livros de encantamentos roxo; Melhorias para armaduras cinza-aço; Geradores de mobs marrom-terroso.

Foram adicionados livros de encantamentos e armaduras ao catálogo. Os livros estão separados por categorias comerciais Comum (R$ 3), Básico (R$ 5), Raro (R$ 8) e Lendário (R$ 12). As armaduras incluem peças individuais de Netherite a R$ 26,00 e conjunto completo promocional a R$ 29,90.

**Atenção:** os novos produtos aparecem no catálogo, mas cada produto precisa de uma oferta Kiwify correspondente e de suas variáveis `KIWIFY_PRODUCT_NAME_*` e `KIWIFY_URL_*` no Render. Até configurar e testar a oferta, o botão de compra não concluirá checkout. A entrega no servidor Paper ainda depende de um plugin/bridge configurado e testado; não considere os novos produtos prontos para entrega automática.
