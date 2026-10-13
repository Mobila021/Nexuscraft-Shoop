const express = require('express');
const path = require('path');
const crypto = require('crypto');
const { Pool } = require('pg');

const pool = process.env.DATABASE_URL ? new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : undefined,
  connectionTimeoutMillis: 5000,
  max: 5
}) : null;

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json({ limit: '50kb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Catálogo do site: valores definidos no servidor, nunca pelo navegador.
const PRODUCTS = {
  "1.000 Moedas": { price: 5.00, checkoutEnv: 'KIWIFY_URL_MOEDAS_1000', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_MOEDAS_1000' },
  "5.000 Moedas": { price: 8.00, checkoutEnv: 'KIWIFY_URL_MOEDAS_5000', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_MOEDAS_5000' },
  "10.000 Moedas": { price: 12.00, checkoutEnv: 'KIWIFY_URL_MOEDAS_10000', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_MOEDAS_10000' },
  "50.000 Moedas": { price: 20.00, checkoutEnv: 'KIWIFY_URL_MOEDAS_50000', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_MOEDAS_50000' },
  "Kit Básico": { price: 5.00, checkoutEnv: 'KIWIFY_URL_KIT_BASICO', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_KIT_BASICO' },
  "Kit Ferramentas": { price: 7.00, checkoutEnv: 'KIWIFY_URL_KIT_FERRAMENTAS', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_KIT_FERRAMENTAS' },
  "Kit Combate": { price: 12.00, checkoutEnv: 'KIWIFY_URL_KIT_COMBATE', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_KIT_COMBATE' },
  "VIP Básico": { price: 10.00, checkoutEnv: 'KIWIFY_URL_VIP_BASICO', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_VIP_BASICO' },
  "VIP Plus": { price: 17.00, checkoutEnv: 'KIWIFY_URL_VIP_PLUS', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_VIP_PLUS' },
  "VIP Prêmio": { price: 25.00, checkoutEnv: 'KIWIFY_URL_VIP_PREMIUM', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_VIP_PREMIUM' },
  "Chave Comum": { price: 5.00, checkoutEnv: 'KIWIFY_URL_CHAVE_COMUM', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_CHAVE_COMUM' },
  "Chave Rara": { price: 8.00, checkoutEnv: 'KIWIFY_URL_CHAVE_RARA', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_CHAVE_RARA' },
  "Chave Épica": { price: 15.00, checkoutEnv: 'KIWIFY_URL_CHAVE_EPICA', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_CHAVE_EPICA' },
  "Crate Comum": { price: 5.00, checkoutEnv: 'KIWIFY_URL_CRATE_COMUM', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_CRATE_COMUM' },
  "Crate Rara": { price: 10.00, checkoutEnv: 'KIWIFY_URL_CRATE_RARA', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_CRATE_RARA' },
  "Crate Lendária": { price: 20.00, checkoutEnv: 'KIWIFY_URL_CRATE_LENDARIA', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_CRATE_LENDARIA' },
  "XP — 10 níveis": { price: 5.00, checkoutEnv: 'KIWIFY_URL_XP_10_NIVEIS', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_XP_10_NIVEIS' },
  "XP — 20 níveis": { price: 8.00, checkoutEnv: 'KIWIFY_URL_XP_20_NIVEIS', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_XP_20_NIVEIS' },
  "XP — 30 níveis": { price: 10.00, checkoutEnv: 'KIWIFY_URL_XP_30_NIVEIS', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_XP_30_NIVEIS' },
  "XP — 50 níveis": { price: 15.00, checkoutEnv: 'KIWIFY_URL_XP_50_NIVEIS', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_XP_50_NIVEIS' },
  "XP — 100 níveis": { price: 25.00, checkoutEnv: 'KIWIFY_URL_XP_100_NIVEIS', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_XP_100_NIVEIS' },
  "Gerador de Galinhas": { price: 5.00, checkoutEnv: 'KIWIFY_URL_SPAWNER_GALINHAS', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_SPAWNER_GALINHAS' },
  "Gerador de Porcos": { price: 5.00, checkoutEnv: 'KIWIFY_URL_SPAWNER_PORCOS', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_SPAWNER_PORCOS' },
  "Gerador de Vacas": { price: 5.00, checkoutEnv: 'KIWIFY_URL_SPAWNER_VACAS', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_SPAWNER_VACAS' },
  "Gerador de Zumbis": { price: 7.00, checkoutEnv: 'KIWIFY_URL_SPAWNER_ZUMBIS', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_SPAWNER_ZUMBIS' },
  "Gerador de Aranhas": { price: 7.00, checkoutEnv: 'KIWIFY_URL_SPAWNER_ARANHAS', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_SPAWNER_ARANHAS' },
  "Gerador de Esqueletos": { price: 12.00, checkoutEnv: 'KIWIFY_URL_SPAWNER_ESQUELETOS', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_SPAWNER_ESQUELETOS' },
  "Gerador de Creepers": { price: 12.00, checkoutEnv: 'KIWIFY_URL_SPAWNER_CREEPERS', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_SPAWNER_CREEPERS' },
  "Gerador de Slimes": { price: 12.00, checkoutEnv: 'KIWIFY_URL_SPAWNER_SLIMES', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_SPAWNER_SLIMES' },
  "Gerador de Endermans": { price: 16.00, checkoutEnv: 'KIWIFY_URL_SPAWNER_ENDERMANS', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_SPAWNER_ENDERMANS' },
  "Gerador de Blazes": { price: 16.00, checkoutEnv: 'KIWIFY_URL_SPAWNER_BLAZES', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_SPAWNER_BLAZES' },
  "Gerador de Cubos de Magma": { price: 16.00, checkoutEnv: 'KIWIFY_URL_SPAWNER_CUBOS_MAGMA', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_SPAWNER_CUBOS_MAGMA' },
  "Gerador de Bruxas": { price: 16.00, checkoutEnv: 'KIWIFY_URL_SPAWNER_BRUXAS', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_SPAWNER_BRUXAS' },
  "Gerador de Guardiões": { price: 18.00, checkoutEnv: 'KIWIFY_URL_SPAWNER_GUARDIOES', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_SPAWNER_GUARDIOES' },
  "Gerador de Phantoms": { price: 18.00, checkoutEnv: 'KIWIFY_URL_SPAWNER_PHANTOMS', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_SPAWNER_PHANTOMS' },
  "Gerador de Golem de Ferro": { price: 18.00, checkoutEnv: 'KIWIFY_URL_SPAWNER_GOLEM_FERRO', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_SPAWNER_GOLEM_FERRO' },
  "Livro de Afiação V": { price: 8.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_AFIACAO_V', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_AFIACAO_V' },
  "Livro de Punição V": { price: 8.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_PUNICAO_V', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_PUNICAO_V' },
  "Livro de Ruína dos Artrópodes V": { price: 8.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_RUINA_DOS_ARTROPODES_V', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_RUINA_DOS_ARTROPODES_V' },
  "Livro de Repulsão II": { price: 5.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_REPULSAO_II', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_REPULSAO_II' },
  "Livro de Aspecto Flamejante II": { price: 5.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_ASPECTO_FLAMEJANTE_II', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_ASPECTO_FLAMEJANTE_II' },
  "Livro de Saque III": { price: 8.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_SAQUE_III', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_SAQUE_III' },
  "Livro de Varredura III": { price: 8.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_VARREDURA_III', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_VARREDURA_III' },
  "Livro de Eficiência V": { price: 8.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_EFICIENCIA_V', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_EFICIENCIA_V' },
  "Livro de Fortuna III": { price: 8.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_FORTUNA_III', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_FORTUNA_III' },
  "Livro de Toque Suave I": { price: 8.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_TOQUE_SUAVE_I', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_TOQUE_SUAVE_I' },
  "Livro de Inquebrável III": { price: 8.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_INQUEBRAVEL_III', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_INQUEBRAVEL_III' },
  "Livro de Remendo I": { price: 12.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_REMENDO_I', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_REMENDO_I' },
  "Livro de Proteção IV": { price: 8.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_PROTECAO_IV', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_PROTECAO_IV' },
  "Livro de Proteção contra Fogo IV": { price: 8.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_PROTECAO_CONTRA_FOGO_IV', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_PROTECAO_CONTRA_FOGO_IV' },
  "Livro de Proteção contra Explosões IV": { price: 8.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_PROTECAO_CONTRA_EXPLOSOES_IV', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_PROTECAO_CONTRA_EXPLOSOES_IV' },
  "Livro de Proteção contra Projéteis IV": { price: 8.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_PROTECAO_CONTRA_PROJETEIS_IV', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_PROTECAO_CONTRA_PROJETEIS_IV' },
  "Livro de Queda Suave IV": { price: 8.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_QUEDA_SUAVE_IV', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_QUEDA_SUAVE_IV' },
  "Livro de Respiração III": { price: 5.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_RESPIRACAO_III', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_RESPIRACAO_III' },
  "Livro de Afinidade Aquática I": { price: 5.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_AFINIDADE_AQUATICA_I', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_AFINIDADE_AQUATICA_I' },
  "Livro de Espinhos III": { price: 8.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_ESPINHOS_III', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_ESPINHOS_III' },
  "Livro de Passos Profundos III": { price: 8.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_PASSOS_PROFUNDOS_III', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_PASSOS_PROFUNDOS_III' },
  "Livro de Passos Gelados II": { price: 12.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_PASSOS_GELADOS_II', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_PASSOS_GELADOS_II' },
  "Livro de Agilidade Aquática III": { price: 8.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_AGILIDADE_AQUATICA_III', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_AGILIDADE_AQUATICA_III' },
  "Livro de Caminhar sobre as Almas III": { price: 12.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_CAMINHAR_SOBRE_AS_ALMAS_III', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_CAMINHAR_SOBRE_AS_ALMAS_III' },
  "Livro de Passos Furtivos III": { price: 12.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_PASSOS_FURTIVOS_III', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_PASSOS_FURTIVOS_III' },
  "Livro de Maldição do Ligamento I": { price: 3.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_MALDICAO_DO_LIGAMENTO_I', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_MALDICAO_DO_LIGAMENTO_I' },
  "Livro de Maldição do Desaparecimento I": { price: 3.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_MALDICAO_DO_DESAPARECIMENTO_I', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_MALDICAO_DO_DESAPARECIMENTO_I' },
  "Livro de Poder V": { price: 8.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_PODER_V', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_PODER_V' },
  "Livro de Impacto II": { price: 5.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_IMPACTO_II', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_IMPACTO_II' },
  "Livro de Chama I": { price: 5.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_CHAMA_I', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_CHAMA_I' },
  "Livro de Infinidade I": { price: 8.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_INFINIDADE_I', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_INFINIDADE_I' },
  "Livro de Sorte do Mar III": { price: 5.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_SORTE_DO_MAR_III', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_SORTE_DO_MAR_III' },
  "Livro de Atração III": { price: 5.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_ATRACAO_III', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_ATRACAO_III' },
  "Livro de Lealdade III": { price: 5.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_LEALDADE_III', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_LEALDADE_III' },
  "Livro de Impaling V": { price: 8.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_IMPALING_V', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_IMPALING_V' },
  "Livro de Correnteza III": { price: 8.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_CORRENTEZA_III', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_CORRENTEZA_III' },
  "Livro de Canalização I": { price: 8.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_CANALIZACAO_I', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_CANALIZACAO_I' },
  "Livro de Perfurante IV": { price: 8.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_PERFURANTE_IV', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_PERFURANTE_IV' },
  "Livro de Rajada Múltipla I": { price: 12.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_RAJADA_MULTIPLA_I', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_RAJADA_MULTIPLA_I' },
  "Livro de Carga Rápida III": { price: 5.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_CARGA_RAPIDA_III', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_CARGA_RAPIDA_III' },
  "Livro de Densidade V": { price: 12.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_DENSIDADE_V', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_DENSIDADE_V' },
  "Livro de Ruptura IV": { price: 12.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_RUPTURA_IV', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_RUPTURA_IV' },
  "Livro de Arremesso de Vento III": { price: 12.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_ARREMESSO_DE_VENTO_III', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_ARREMESSO_DE_VENTO_III' },
  "Livro de Poder I": { price: 3.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_PODER_I', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_PODER_I' },
  "Livro de Afiação I": { price: 3.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_AFIACAO_I', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_AFIACAO_I' },
  "Livro de Proteção I": { price: 3.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_PROTECAO_I', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_PROTECAO_I' },
  "Livro de Eficiência I": { price: 3.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_EFICIENCIA_I', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_EFICIENCIA_I' },
  "Livro de Inquebrável I": { price: 3.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_INQUEBRAVEL_I', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_INQUEBRAVEL_I' },
  "Livro de Punição I": { price: 3.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_PUNICAO_I', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_PUNICAO_I' },
  "Livro de Ruína dos Artrópodes I": { price: 3.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_RUINA_DOS_ARTROPODES_I', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_RUINA_DOS_ARTROPODES_I' },
  "Livro de Proteção contra Fogo I": { price: 3.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_PROTECAO_CONTRA_FOGO_I', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_PROTECAO_CONTRA_FOGO_I' },
  "Livro de Proteção contra Explosões I": { price: 3.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_PROTECAO_CONTRA_EXPLOSOES_I', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_PROTECAO_CONTRA_EXPLOSOES_I' },
  "Livro de Proteção contra Projéteis I": { price: 3.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_PROTECAO_CONTRA_PROJETEIS_I', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_PROTECAO_CONTRA_PROJETEIS_I' },
  "Livro de Queda Suave I": { price: 3.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_QUEDA_SUAVE_I', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_QUEDA_SUAVE_I' },
  "Livro de Espinhos I": { price: 3.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_ESPINHOS_I', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_ESPINHOS_I' },
  "Livro de Atração I": { price: 3.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_ATRACAO_I', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_ATRACAO_I' },
  "Livro de Sorte do Mar I": { price: 3.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_SORTE_DO_MAR_I', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_SORTE_DO_MAR_I' },
  "Livro de Perfurante I": { price: 3.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_PERFURANTE_I', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_PERFURANTE_I' },
  "Livro de Carga Rápida I": { price: 3.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_CARGA_RAPIDA_I', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_CARGA_RAPIDA_I' },
  "Livro de Lealdade I": { price: 3.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_LEALDADE_I', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_LEALDADE_I' },
  "Livro de Impaling I": { price: 3.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_IMPALING_I', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_IMPALING_I' },
  "Livro de Densidade I": { price: 3.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_DENSIDADE_I', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_DENSIDADE_I' },
  "Livro de Repulsão I": { price: 3.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_REPULSAO_I', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_REPULSAO_I' },
  "Livro de Aspecto Flamejante I": { price: 3.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_ASPECTO_FLAMEJANTE_I', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_ASPECTO_FLAMEJANTE_I' },
  "Livro de Varredura I": { price: 3.00, checkoutEnv: 'KIWIFY_URL_LIVRO_DE_VARREDURA_I', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_LIVRO_DE_VARREDURA_I' },
  "Capacete de Ferro": { price: 5.00, checkoutEnv: 'KIWIFY_URL_CAPACETE_DE_FERRO', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_CAPACETE_DE_FERRO' },
  "Peitoral de Ferro": { price: 5.00, checkoutEnv: 'KIWIFY_URL_PEITORAL_DE_FERRO', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_PEITORAL_DE_FERRO' },
  "Calças de Ferro": { price: 5.00, checkoutEnv: 'KIWIFY_URL_CALCAS_DE_FERRO', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_CALCAS_DE_FERRO' },
  "Botas de Ferro": { price: 5.00, checkoutEnv: 'KIWIFY_URL_BOTAS_DE_FERRO', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_BOTAS_DE_FERRO' },
  "Armadura de Ouro": { price: 5.00, checkoutEnv: 'KIWIFY_URL_ARMADURA_DE_OURO', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_ARMADURA_DE_OURO' },
  "Capacete de Diamante": { price: 8.00, checkoutEnv: 'KIWIFY_URL_CAPACETE_DE_DIAMANTE', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_CAPACETE_DE_DIAMANTE' },
  "Peitoral de Diamante": { price: 8.00, checkoutEnv: 'KIWIFY_URL_PEITORAL_DE_DIAMANTE', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_PEITORAL_DE_DIAMANTE' },
  "Calças de Diamante": { price: 8.00, checkoutEnv: 'KIWIFY_URL_CALCAS_DE_DIAMANTE', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_CALCAS_DE_DIAMANTE' },
  "Botas de Diamante": { price: 8.00, checkoutEnv: 'KIWIFY_URL_BOTAS_DE_DIAMANTE', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_BOTAS_DE_DIAMANTE' },
  "Capacete de Diamante Proteção IV": { price: 12.00, checkoutEnv: 'KIWIFY_URL_CAPACETE_DE_DIAMANTE_PROTECAO_IV', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_CAPACETE_DE_DIAMANTE_PROTECAO_IV' },
  "Peitoral de Diamante Proteção IV": { price: 12.00, checkoutEnv: 'KIWIFY_URL_PEITORAL_DE_DIAMANTE_PROTECAO_IV', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_PEITORAL_DE_DIAMANTE_PROTECAO_IV' },
  "Calças de Diamante Proteção IV": { price: 12.00, checkoutEnv: 'KIWIFY_URL_CALCAS_DE_DIAMANTE_PROTECAO_IV', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_CALCAS_DE_DIAMANTE_PROTECAO_IV' },
  "Botas de Diamante Proteção IV e Queda Suave IV": { price: 12.00, checkoutEnv: 'KIWIFY_URL_BOTAS_DE_DIAMANTE_PROTECAO_IV_E_QUEDA_SUAVE_IV', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_BOTAS_DE_DIAMANTE_PROTECAO_IV_E_QUEDA_SUAVE_IV' },
  "Peça de Diamante Inquebrável III": { price: 12.00, checkoutEnv: 'KIWIFY_URL_PECA_DE_DIAMANTE_INQUEBRAVEL_III', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_PECA_DE_DIAMANTE_INQUEBRAVEL_III' },
  "Capacete de Netherite Encantado": { price: 26.00, checkoutEnv: 'KIWIFY_URL_CAPACETE_DE_NETHERITE_ENCANTADO', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_CAPACETE_DE_NETHERITE_ENCANTADO' },
  "Peitoral de Netherite Encantado": { price: 26.00, checkoutEnv: 'KIWIFY_URL_PEITORAL_DE_NETHERITE_ENCANTADO', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_PEITORAL_DE_NETHERITE_ENCANTADO' },
  "Calças de Netherite Encantadas": { price: 26.00, checkoutEnv: 'KIWIFY_URL_CALCAS_DE_NETHERITE_ENCANTADAS', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_CALCAS_DE_NETHERITE_ENCANTADAS' },
  "Botas de Netherite Encantadas": { price: 26.00, checkoutEnv: 'KIWIFY_URL_BOTAS_DE_NETHERITE_ENCANTADAS', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_BOTAS_DE_NETHERITE_ENCANTADAS' },
  "Conjunto Completo de Netherite Lendário": { price: 29.90, checkoutEnv: 'KIWIFY_URL_CONJUNTO_COMPLETO_DE_NETHERITE_LENDARIO', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_CONJUNTO_COMPLETO_DE_NETHERITE_LENDARIO' },
  "Melhoria Proteção IV": { price: 5.00, checkoutEnv: 'KIWIFY_URL_MELHORIA_PROTECAO_IV', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_MELHORIA_PROTECAO_IV' },
  "Melhoria Inquebrável III": { price: 5.00, checkoutEnv: 'KIWIFY_URL_MELHORIA_INQUEBRAVEL_III', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_MELHORIA_INQUEBRAVEL_III' },
  "Melhoria Espinhos III": { price: 7.00, checkoutEnv: 'KIWIFY_URL_MELHORIA_ESPINHOS_III', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_MELHORIA_ESPINHOS_III' },
  "Melhoria Queda Suave IV": { price: 5.00, checkoutEnv: 'KIWIFY_URL_MELHORIA_QUEDA_SUAVE_IV', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_MELHORIA_QUEDA_SUAVE_IV' },
  "Melhoria Passos Profundos III": { price: 7.00, checkoutEnv: 'KIWIFY_URL_MELHORIA_PASSOS_PROFUNDOS_III', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_MELHORIA_PASSOS_PROFUNDOS_III' },
  "Melhoria Remendo I": { price: 12.00, checkoutEnv: 'KIWIFY_URL_MELHORIA_REMENDO_I', kiwifyProductEnv: 'KIWIFY_PRODUCT_NAME_MELHORIA_REMENDO_I' }
};

function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const aa = Buffer.from(a);
  const bb = Buffer.from(b);
  return aa.length === bb.length && crypto.timingSafeEqual(aa, bb);
}
function bearerIsValid(req) {
  const token = process.env.GAME_API_TOKEN;
  const auth = req.get('authorization') || '';
  return Boolean(token && safeEqual(auth, `Bearer ${token}`));
}
function getProductName(body) {
  return body?.Product?.product_name || body?.product?.product_name || body?.product_name || body?.ProductName || '';
}
function getTrackingToken(body) {
  const t = body?.TrackingParameters || body?.tracking_parameters || body?.trackingParameters || body?.tracking || {};
  return t?.s1 || t?.S1 || body?.s1 || body?.S1 || '';
}
function getEvent(body) {
  return String(body?.webhook_event_type || body?.event || body?.type || '').toLowerCase();
}
function getStatus(body) {
  return String(body?.order_status || body?.status || '').toLowerCase();
}

async function initializeDatabase() {
  if (!pool) {
    console.warn('DATABASE_URL não configurada; banco e checkout seguro indisponíveis.');
    return;
  }
  await pool.query(`CREATE TABLE IF NOT EXISTS orders (
    id BIGSERIAL PRIMARY KEY,
    provider TEXT NOT NULL DEFAULT 'kiwify',
    transaction_id TEXT UNIQUE,
    player_nick TEXT NOT NULL,
    product_name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','queued','delivered','refunded','cancelled','error')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    approved_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    payload JSONB
  )`);
  await pool.query(`CREATE TABLE IF NOT EXISTS checkout_intents (
    token UUID PRIMARY KEY,
    player_nick TEXT NOT NULL,
    store_product_name TEXT NOT NULL,
    expected_kiwify_product_name TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL
  )`);
  await pool.query('ALTER TABLE checkout_intents ADD COLUMN IF NOT EXISTS expected_kiwify_product_name TEXT');
  await pool.query('CREATE INDEX IF NOT EXISTS orders_status_created_idx ON orders(status, created_at)');
  console.log('Tabelas orders e checkout_intents verificadas no PostgreSQL.');
}

app.get('/api/produtos', (_req, res) => {
  res.json(Object.entries(PRODUCTS).map(([name, p]) => ({ name, price: p.price })));
});

app.post('/api/checkout', async (req, res) => {
  const { produto, nick } = req.body || {};
  if (typeof produto !== 'string' || !Object.hasOwn(PRODUCTS, produto)) {
    return res.status(400).json({ error: 'Produto inválido.' });
  }
  if (typeof nick !== 'string' || !/^[A-Za-z0-9_]{3,16}$/.test(nick.trim())) {
    return res.status(400).json({ error: 'Digite um nick válido do Minecraft (3 a 16 caracteres, letras, números e _).' });
  }
  if (!pool) return res.status(503).json({ error: 'O checkout está temporariamente indisponível: banco de dados não configurado.' });
  const item = PRODUCTS[produto];
  const expectedKiwifyProduct = (process.env[item.kiwifyProductEnv] || '').trim();
  if (!process.env.KIWIFY_WEBHOOK_SECRET || !process.env.GAME_API_TOKEN || !expectedKiwifyProduct) {
    return res.status(503).json({ error: `A compra deste produto ainda não está configurada com segurança. No Render, configure ${item.kiwifyProductEnv}, o link ${item.checkoutEnv} e os segredos da integração.` });
  }
  const checkoutUrl = process.env[item.checkoutEnv];
  if (!checkoutUrl) {
    return res.status(503).json({ error: `Falta configurar o link Kiwify no Render (${item.checkoutEnv}).` });
  }
  let parsed;
  try { parsed = new URL(checkoutUrl); } catch {
    return res.status(500).json({ error: 'O link de checkout configurado é inválido.' });
  }
  const hostAllowed = /(^|\.)kiwify\.com\.br$/i.test(parsed.hostname) || /(^|\.)kiwify\.app$/i.test(parsed.hostname);
  if (parsed.protocol !== 'https:' || !hostAllowed) {
    return res.status(500).json({ error: 'Use um link HTTPS oficial da Kiwify.' });
  }
  try {
    const token = crypto.randomUUID();
    await pool.query(
      `INSERT INTO checkout_intents(token, player_nick, store_product_name, expected_kiwify_product_name, expires_at)
       VALUES ($1, $2, $3, $4, NOW() + INTERVAL '60 minutes')`,
      [token, nick.trim(), produto, expectedKiwifyProduct]
    );
    // s1 é um parâmetro de rastreamento Kiwify. Ele correlaciona a compra com o nick guardado no servidor.
    parsed.searchParams.set('s1', token);
    return res.json({ url: parsed.toString(), price: item.price, note: 'Confira os dados no checkout antes de pagar.' });
  } catch (err) {
    console.error('Falha ao criar intenção de checkout:', err.message);
    return res.status(503).json({ error: 'Não foi possível preparar o pedido com segurança. Tente novamente.' });
  }
});

// Webhook protegido por segredo aleatório na URL. Configure exatamente a URL gerada no Render.
app.post('/webhooks/kiwify/:secret', async (req, res) => {
  const configuredSecret = process.env.KIWIFY_WEBHOOK_SECRET;
  if (!configuredSecret || !safeEqual(req.params.secret, configuredSecret)) {
    return res.status(404).json({ error: 'Not found' });
  }
  if (!pool) return res.status(503).json({ error: 'Database unavailable' });
  const body = req.body || {};
  const event = getEvent(body);
  const status = getStatus(body);
  const transactionId = String(body.order_id || body.order_ref || body.id || '').trim();
  if (!transactionId) return res.status(400).json({ error: 'Missing order identifier' });

  try {
    if (/refund|chargeback|chargedback|reembolso|estorno/.test(event) || /refunded|chargeback|chargedback|refunded/.test(status)) {
      const newStatus = /chargeback|chargedback/.test(event + ' ' + status) ? 'cancelled' : 'refunded';
      await pool.query(`UPDATE orders SET status=$1, updated_at=NOW() WHERE transaction_id=$2`, [newStatus, transactionId]);
      return res.status(200).json({ received: true, action: 'refund_or_chargeback_processed' });
    }
    const isApproved = status === 'paid' || status === 'approved' || event === 'order_approved';
    if (!isApproved) return res.status(200).json({ received: true, action: 'ignored_non_approved_event' });

    const actualProduct = String(getProductName(body)).trim();
    const token = String(getTrackingToken(body)).trim();
    if (!/^[0-9a-f-]{36}$/i.test(token)) {
      console.warn('Webhook aprovado sem token s1 válido; pedido não foi liberado. Verifique o payload de rastreamento da Kiwify.');
      return res.status(400).json({ error: 'Missing valid s1 tracking token; no delivery queued' });
    }
    const intentResult = await pool.query(
      `SELECT token, player_nick, store_product_name, expected_kiwify_product_name FROM checkout_intents WHERE token=$1 AND expires_at > NOW()`, [token]
    );
    if (!intentResult.rowCount) return res.status(400).json({ error: 'Checkout intent not found or expired; no delivery queued' });
    const intent = intentResult.rows[0];
    const expectedProduct = String(intent.expected_kiwify_product_name || '').trim();
    if (!expectedProduct || !actualProduct || actualProduct.toLowerCase() !== expectedProduct.toLowerCase()) {
      console.warn('Webhook ignorado: nome do produto Kiwify não corresponde ao checkout associado.');
      return res.status(400).json({ error: 'Kiwify product does not match this checkout; no delivery queued' });
    }
    await pool.query(
      `INSERT INTO orders(provider, transaction_id, player_nick, product_name, status, approved_at, payload)
       VALUES ('kiwify', $1, $2, $3, 'queued', NOW(), $4::jsonb)
       ON CONFLICT (transaction_id) DO UPDATE SET
         status = CASE WHEN orders.status='delivered' THEN 'delivered' ELSE 'queued' END,
         updated_at = NOW(), approved_at = COALESCE(orders.approved_at, NOW())`,
      [transactionId, intent.player_nick, intent.store_product_name, JSON.stringify({ event, order_status: status, product_name: actualProduct })]
    );
    await pool.query('DELETE FROM checkout_intents WHERE token=$1', [token]);
    console.log('Compra aprovada e enfileirada para entrega no servidor.');
    return res.status(200).json({ received: true, action: 'queued_for_game_delivery' });
  } catch (err) {
    console.error('Falha ao processar webhook Kiwify:', err.message);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// API privada para um plugin/bridge do Paper buscar pedidos aprovados enquanto o jogador estiver offline.
app.get('/api/game/pending', async (req, res) => {
  if (!bearerIsValid(req)) return res.status(401).json({ error: 'Unauthorized' });
  if (!pool) return res.status(503).json({ error: 'Database unavailable' });
  try {
    const result = await pool.query(
      `SELECT id, player_nick AS nick, product_name, created_at FROM orders WHERE status='queued' ORDER BY created_at ASC LIMIT 100`
    );
    return res.json({ orders: result.rows });
  } catch (err) {
    console.error('Falha ao buscar pedidos pendentes:', err.message);
    return res.status(503).json({ error: 'Orders unavailable' });
  }
});

app.post('/api/game/orders/:id/delivered', async (req, res) => {
  if (!bearerIsValid(req)) return res.status(401).json({ error: 'Unauthorized' });
  if (!pool) return res.status(503).json({ error: 'Database unavailable' });
  if (!/^\d+$/.test(req.params.id)) return res.status(400).json({ error: 'Invalid order id' });
  try {
    const result = await pool.query(
      `UPDATE orders SET status='delivered', delivered_at=NOW(), updated_at=NOW()
       WHERE id=$1 AND status='queued' RETURNING id`, [req.params.id]
    );
    if (!result.rowCount) return res.status(409).json({ error: 'Order not queued or already handled' });
    return res.json({ ok: true, delivered: true });
  } catch (err) {
    console.error('Falha ao marcar pedido como entregue:', err.message);
    return res.status(503).json({ error: 'Could not update order' });
  }
});

app.get('/health', (_req, res) => res.json({ ok: true, service: 'NexusCraft Shoop' }));
app.get('/health/db', async (_req, res) => {
  if (!pool) return res.status(503).json({ ok: false, database: 'not_configured' });
  try { await pool.query('SELECT 1'); return res.json({ ok: true, database: 'connected' }); }
  catch (err) { console.error('Falha ao verificar PostgreSQL:', err.message); return res.status(503).json({ ok: false, database: 'unavailable' }); }
});

async function start() {
  try { await initializeDatabase(); }
  catch (err) { console.error('Não foi possível inicializar o PostgreSQL:', err.message); process.exit(1); }
  app.listen(PORT, '0.0.0.0', () => console.log(`NexusCraft Shoop rodando na porta ${PORT}`));
}
start();
