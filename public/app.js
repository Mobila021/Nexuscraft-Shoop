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
  'Crate Lendária': { price: 20, category: 'crates', icon: '🌟' },
  "XP — 10 níveis": { price: 5, category: 'xp', icon: '🟢' },
  "XP — 20 níveis": { price: 8, category: 'xp', icon: '✨' },
  "XP — 30 níveis": { price: 10, category: 'xp', icon: '🌟' },
  "XP — 50 níveis": { price: 15, category: 'xp', icon: '💫' },
  "XP — 100 níveis": { price: 25, category: 'xp', icon: '🔮' },
  "Gerador de Galinhas": { price: 5, category: 'spawners', icon: '🐔' },
  "Gerador de Porcos": { price: 5, category: 'spawners', icon: '🐷' },
  "Gerador de Vacas": { price: 5, category: 'spawners', icon: '🐮' },
  "Gerador de Zumbis": { price: 7, category: 'spawners', icon: '🧟' },
  "Gerador de Aranhas": { price: 7, category: 'spawners', icon: '🕷️' },
  "Gerador de Esqueletos": { price: 12, category: 'spawners', icon: '💀' },
  "Gerador de Creepers": { price: 12, category: 'spawners', icon: '💚' },
  "Gerador de Slimes": { price: 12, category: 'spawners', icon: '🟩' },
  "Gerador de Endermans": { price: 16, category: 'spawners', icon: '👾' },
  "Gerador de Blazes": { price: 16, category: 'spawners', icon: '🔥' },
  "Gerador de Cubos de Magma": { price: 16, category: 'spawners', icon: '🟥' },
  "Gerador de Bruxas": { price: 16, category: 'spawners', icon: '🧙' },
  "Gerador de Guardiões": { price: 18, category: 'spawners', icon: '🐡' },
  "Gerador de Phantoms": { price: 18, category: 'spawners', icon: '🦇' },
  "Gerador de Golem de Ferro": { price: 18, category: 'spawners', icon: '🗿' },
  "Livro de Afiação V": { price: 8, category: 'enchants', icon: "⚔️", tier: "Raro" },
  "Livro de Punição V": { price: 8, category: 'enchants', icon: "☠️", tier: "Raro" },
  "Livro de Ruína dos Artrópodes V": { price: 8, category: 'enchants', icon: "🕷️", tier: "Raro" },
  "Livro de Repulsão II": { price: 5, category: 'enchants', icon: "💥", tier: "Básico" },
  "Livro de Aspecto Flamejante II": { price: 5, category: 'enchants', icon: "🔥", tier: "Básico" },
  "Livro de Saque III": { price: 8, category: 'enchants', icon: "💎", tier: "Raro" },
  "Livro de Varredura III": { price: 8, category: 'enchants', icon: "⚔️", tier: "Raro" },
  "Livro de Eficiência V": { price: 8, category: 'enchants', icon: "⛏️", tier: "Raro" },
  "Livro de Fortuna III": { price: 8, category: 'enchants', icon: "🍀", tier: "Raro" },
  "Livro de Toque Suave I": { price: 8, category: 'enchants', icon: "🪨", tier: "Raro" },
  "Livro de Inquebrável III": { price: 8, category: 'enchants', icon: "🛠️", tier: "Raro" },
  "Livro de Remendo I": { price: 12, category: 'enchants', icon: "✨", tier: "Lendário" },
  "Livro de Proteção IV": { price: 8, category: 'enchants', icon: "🛡️", tier: "Raro" },
  "Livro de Proteção contra Fogo IV": { price: 8, category: 'enchants', icon: "🔥", tier: "Raro" },
  "Livro de Proteção contra Explosões IV": { price: 8, category: 'enchants', icon: "💣", tier: "Raro" },
  "Livro de Proteção contra Projéteis IV": { price: 8, category: 'enchants', icon: "🏹", tier: "Raro" },
  "Livro de Queda Suave IV": { price: 8, category: 'enchants', icon: "🪶", tier: "Raro" },
  "Livro de Respiração III": { price: 5, category: 'enchants', icon: "🌊", tier: "Básico" },
  "Livro de Afinidade Aquática I": { price: 5, category: 'enchants', icon: "🐬", tier: "Básico" },
  "Livro de Espinhos III": { price: 8, category: 'enchants', icon: "🌵", tier: "Raro" },
  "Livro de Passos Profundos III": { price: 8, category: 'enchants', icon: "🌊", tier: "Raro" },
  "Livro de Passos Gelados II": { price: 12, category: 'enchants', icon: "❄️", tier: "Lendário" },
  "Livro de Agilidade Aquática III": { price: 8, category: 'enchants', icon: "🐢", tier: "Raro" },
  "Livro de Caminhar sobre as Almas III": { price: 12, category: 'enchants', icon: "👻", tier: "Lendário" },
  "Livro de Passos Furtivos III": { price: 12, category: 'enchants', icon: "🥷", tier: "Lendário" },
  "Livro de Maldição do Ligamento I": { price: 3, category: 'enchants', icon: "⛓️", tier: "Comum" },
  "Livro de Maldição do Desaparecimento I": { price: 3, category: 'enchants', icon: "🌫️", tier: "Comum" },
  "Livro de Poder V": { price: 8, category: 'enchants', icon: "🏹", tier: "Raro" },
  "Livro de Impacto II": { price: 5, category: 'enchants', icon: "💥", tier: "Básico" },
  "Livro de Chama I": { price: 5, category: 'enchants', icon: "🔥", tier: "Básico" },
  "Livro de Infinidade I": { price: 8, category: 'enchants', icon: "♾️", tier: "Raro" },
  "Livro de Sorte do Mar III": { price: 5, category: 'enchants', icon: "🎣", tier: "Básico" },
  "Livro de Atração III": { price: 5, category: 'enchants', icon: "🐟", tier: "Básico" },
  "Livro de Lealdade III": { price: 5, category: 'enchants', icon: "🔱", tier: "Básico" },
  "Livro de Impaling V": { price: 8, category: 'enchants', icon: "🔱", tier: "Raro" },
  "Livro de Correnteza III": { price: 8, category: 'enchants', icon: "🌊", tier: "Raro" },
  "Livro de Canalização I": { price: 8, category: 'enchants', icon: "⚡", tier: "Raro" },
  "Livro de Perfurante IV": { price: 8, category: 'enchants', icon: "🏹", tier: "Raro" },
  "Livro de Rajada Múltipla I": { price: 12, category: 'enchants', icon: "🏹", tier: "Lendário" },
  "Livro de Carga Rápida III": { price: 5, category: 'enchants', icon: "⚡", tier: "Básico" },
  "Livro de Densidade V": { price: 12, category: 'enchants', icon: "🔨", tier: "Lendário" },
  "Livro de Ruptura IV": { price: 12, category: 'enchants', icon: "🗡️", tier: "Lendário" },
  "Livro de Arremesso de Vento III": { price: 12, category: 'enchants', icon: "🌪️", tier: "Lendário" },
  "Livro de Poder I": { price: 3, category: 'enchants', icon: "🏹", tier: "Comum" },
  "Livro de Afiação I": { price: 3, category: 'enchants', icon: "⚔️", tier: "Comum" },
  "Livro de Proteção I": { price: 3, category: 'enchants', icon: "🛡️", tier: "Comum" },
  "Livro de Eficiência I": { price: 3, category: 'enchants', icon: "⛏️", tier: "Comum" },
  "Livro de Inquebrável I": { price: 3, category: 'enchants', icon: "🛠️", tier: "Comum" },
  "Livro de Punição I": { price: 3, category: 'enchants', icon: "☠️", tier: "Comum" },
  "Livro de Ruína dos Artrópodes I": { price: 3, category: 'enchants', icon: "🕷️", tier: "Comum" },
  "Livro de Proteção contra Fogo I": { price: 3, category: 'enchants', icon: "🔥", tier: "Comum" },
  "Livro de Proteção contra Explosões I": { price: 3, category: 'enchants', icon: "💣", tier: "Comum" },
  "Livro de Proteção contra Projéteis I": { price: 3, category: 'enchants', icon: "🏹", tier: "Comum" },
  "Livro de Queda Suave I": { price: 3, category: 'enchants', icon: "🪶", tier: "Comum" },
  "Livro de Espinhos I": { price: 3, category: 'enchants', icon: "🌵", tier: "Comum" },
  "Livro de Atração I": { price: 3, category: 'enchants', icon: "🎣", tier: "Comum" },
  "Livro de Sorte do Mar I": { price: 3, category: 'enchants', icon: "🐟", tier: "Comum" },
  "Livro de Perfurante I": { price: 3, category: 'enchants', icon: "🏹", tier: "Comum" },
  "Livro de Carga Rápida I": { price: 3, category: 'enchants', icon: "⚡", tier: "Comum" },
  "Livro de Lealdade I": { price: 3, category: 'enchants', icon: "🔱", tier: "Comum" },
  "Livro de Impaling I": { price: 3, category: 'enchants', icon: "🔱", tier: "Comum" },
  "Livro de Densidade I": { price: 3, category: 'enchants', icon: "🔨", tier: "Comum" },
  "Livro de Repulsão I": { price: 3, category: 'enchants', icon: "💥", tier: "Comum" },
  "Livro de Aspecto Flamejante I": { price: 3, category: 'enchants', icon: "🔥", tier: "Comum" },
  "Livro de Varredura I": { price: 3, category: 'enchants', icon: "⚔️", tier: "Comum" },
  "Capacete de Ferro": { price: 5, category: 'armor', icon: "⛑️", tier: "Comum" },
  "Peitoral de Ferro": { price: 5, category: 'armor', icon: "🦺", tier: "Comum" },
  "Calças de Ferro": { price: 5, category: 'armor', icon: "👖", tier: "Comum" },
  "Botas de Ferro": { price: 5, category: 'armor', icon: "🥾", tier: "Comum" },
  "Armadura de Ouro": { price: 5, category: 'armor', icon: "🟨", tier: "Comum" },
  "Capacete de Diamante": { price: 8, category: 'armor', icon: "💎", tier: "Básico" },
  "Peitoral de Diamante": { price: 8, category: 'armor', icon: "💎", tier: "Básico" },
  "Calças de Diamante": { price: 8, category: 'armor', icon: "💎", tier: "Básico" },
  "Botas de Diamante": { price: 8, category: 'armor', icon: "💎", tier: "Básico" },
  "Capacete de Diamante Proteção IV": { price: 12, category: 'armor', icon: "🛡️", tier: "Raro" },
  "Peitoral de Diamante Proteção IV": { price: 12, category: 'armor', icon: "🛡️", tier: "Raro" },
  "Calças de Diamante Proteção IV": { price: 12, category: 'armor', icon: "🛡️", tier: "Raro" },
  "Botas de Diamante Proteção IV e Queda Suave IV": { price: 12, category: 'armor', icon: "🥾", tier: "Raro" },
  "Peça de Diamante Inquebrável III": { price: 12, category: 'armor', icon: "✨", tier: "Raro" },
  "Capacete de Netherite Encantado": { price: 26, category: 'armor', icon: "🪖", tier: "Lendário" },
  "Peitoral de Netherite Encantado": { price: 26, category: 'armor', icon: "🛡️", tier: "Lendário" },
  "Calças de Netherite Encantadas": { price: 26, category: 'armor', icon: "👖", tier: "Lendário" },
  "Botas de Netherite Encantadas": { price: 26, category: 'armor', icon: "🥾", tier: "Lendário" },
  "Conjunto Completo de Netherite Lendário": { price: 29.9, category: 'armor', icon: "🏆", tier: "Lendário" },
  "Melhoria Proteção IV": { price: 5, category: 'armor', icon: "🛡️", tier: "Melhoria extra" },
  "Melhoria Inquebrável III": { price: 5, category: 'armor', icon: "🔧", tier: "Melhoria extra" },
  "Melhoria Espinhos III": { price: 7, category: 'armor', icon: "🌵", tier: "Melhoria extra" },
  "Melhoria Queda Suave IV": { price: 5, category: 'armor', icon: "🪶", tier: "Melhoria extra" },
  "Melhoria Passos Profundos III": { price: 7, category: 'armor', icon: "🌊", tier: "Melhoria extra" },
  "Melhoria Remendo I": { price: 12, category: 'armor', icon: "✨", tier: "Melhoria extra" },
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
  crates: ['Crates', 'Escolha sua caixa de recompensas.'],
  xp: ['XP e experiência', 'Escolha quantos níveis de experiência deseja comprar.'],
  spawners: ['Geradores de criaturas', 'Escolha geradores por categoria: comum, básico, intermediário, raro ou especial.'],
  enchants: ['Livros de encantamentos', 'Todos os encantamentos organizados por raridade comercial. Confira a compatibilidade com o item.'],
  armor: ['Melhorias para armaduras', 'Armaduras, peças encantadas e conjunto completo de Netherite.']
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
  'Crate Lendária': ['Crate lendária', ['1 crate lendária com recompensas especiais']],
  "XP — 10 níveis": ['XP', ["10 níveis de experiência para o seu personagem."]],
  "XP — 20 níveis": ['XP', ["20 níveis de experiência para o seu personagem."]],
  "XP — 30 níveis": ['XP', ["30 níveis de experiência para o seu personagem."]],
  "XP — 50 níveis": ['XP', ["50 níveis de experiência para o seu personagem."]],
  "XP — 100 níveis": ['XP', ["100 níveis de experiência para o seu personagem."]],
  "Gerador de Galinhas": ['COMUM', ["Gerador de criaturas de galinha para colocar no mundo."]],
  "Gerador de Porcos": ['COMUM', ["Gerador de criaturas de porco para colocar no mundo."]],
  "Gerador de Vacas": ['COMUM', ["Gerador de criaturas de vaca para colocar no mundo."]],
  "Gerador de Zumbis": ['BÁSICO', ["Gerador de criaturas de zumbi para colocar no mundo."]],
  "Gerador de Aranhas": ['BÁSICO', ["Gerador de criaturas de aranha para colocar no mundo."]],
  "Gerador de Esqueletos": ['INTERMEDIÁRIO', ["Gerador de criaturas de esqueleto para colocar no mundo."]],
  "Gerador de Creepers": ['INTERMEDIÁRIO', ["Gerador de criaturas de creeper para colocar no mundo."]],
  "Gerador de Slimes": ['INTERMEDIÁRIO', ["Gerador de slimes para colocar no mundo."]],
  "Gerador de Endermans": ['RARO', ["Gerador de endermans para colocar no mundo."]],
  "Gerador de Blazes": ['RARO', ["Gerador de blazes para colocar no mundo."]],
  "Gerador de Cubos de Magma": ['RARO', ["Gerador de cubos de magma para colocar no mundo."]],
  "Gerador de Bruxas": ['RARO', ["Gerador de bruxas para colocar no mundo."]],
  "Gerador de Guardiões": ['ESPECIAL', ["Gerador de guardiões para colocar no mundo."]],
  "Gerador de Phantoms": ['ESPECIAL', ["Gerador de phantoms para colocar no mundo."]],
  "Gerador de Golem de Ferro": ['ESPECIAL', ["Gerador especial de golem de ferro, se suportado pelo plugin instalado."]],
  "Livro de Afiação V": ["Raro", ["Livro de encantamento: Afiação V", "Categoria comercial: Raro. Aplicável somente ao equipamento compatível."]],
  "Livro de Punição V": ["Raro", ["Livro de encantamento: Punição V", "Categoria comercial: Raro. Aplicável somente ao equipamento compatível."]],
  "Livro de Ruína dos Artrópodes V": ["Raro", ["Livro de encantamento: Ruína dos Artrópodes V", "Categoria comercial: Raro. Aplicável somente ao equipamento compatível."]],
  "Livro de Repulsão II": ["Básico", ["Livro de encantamento: Repulsão II", "Categoria comercial: Básico. Aplicável somente ao equipamento compatível."]],
  "Livro de Aspecto Flamejante II": ["Básico", ["Livro de encantamento: Aspecto Flamejante II", "Categoria comercial: Básico. Aplicável somente ao equipamento compatível."]],
  "Livro de Saque III": ["Raro", ["Livro de encantamento: Saque III", "Categoria comercial: Raro. Aplicável somente ao equipamento compatível."]],
  "Livro de Varredura III": ["Raro", ["Livro de encantamento: Varredura III", "Categoria comercial: Raro. Aplicável somente ao equipamento compatível."]],
  "Livro de Eficiência V": ["Raro", ["Livro de encantamento: Eficiência V", "Categoria comercial: Raro. Aplicável somente ao equipamento compatível."]],
  "Livro de Fortuna III": ["Raro", ["Livro de encantamento: Fortuna III", "Categoria comercial: Raro. Aplicável somente ao equipamento compatível."]],
  "Livro de Toque Suave I": ["Raro", ["Livro de encantamento: Toque Suave I", "Categoria comercial: Raro. Aplicável somente ao equipamento compatível."]],
  "Livro de Inquebrável III": ["Raro", ["Livro de encantamento: Inquebrável III", "Categoria comercial: Raro. Aplicável somente ao equipamento compatível."]],
  "Livro de Remendo I": ["Lendário", ["Livro de encantamento: Remendo I", "Categoria comercial: Lendário. Aplicável somente ao equipamento compatível."]],
  "Livro de Proteção IV": ["Raro", ["Livro de encantamento: Proteção IV", "Categoria comercial: Raro. Aplicável somente ao equipamento compatível."]],
  "Livro de Proteção contra Fogo IV": ["Raro", ["Livro de encantamento: Proteção contra Fogo IV", "Categoria comercial: Raro. Aplicável somente ao equipamento compatível."]],
  "Livro de Proteção contra Explosões IV": ["Raro", ["Livro de encantamento: Proteção contra Explosões IV", "Categoria comercial: Raro. Aplicável somente ao equipamento compatível."]],
  "Livro de Proteção contra Projéteis IV": ["Raro", ["Livro de encantamento: Proteção contra Projéteis IV", "Categoria comercial: Raro. Aplicável somente ao equipamento compatível."]],
  "Livro de Queda Suave IV": ["Raro", ["Livro de encantamento: Queda Suave IV", "Categoria comercial: Raro. Aplicável somente ao equipamento compatível."]],
  "Livro de Respiração III": ["Básico", ["Livro de encantamento: Respiração III", "Categoria comercial: Básico. Aplicável somente ao equipamento compatível."]],
  "Livro de Afinidade Aquática I": ["Básico", ["Livro de encantamento: Afinidade Aquática I", "Categoria comercial: Básico. Aplicável somente ao equipamento compatível."]],
  "Livro de Espinhos III": ["Raro", ["Livro de encantamento: Espinhos III", "Categoria comercial: Raro. Aplicável somente ao equipamento compatível."]],
  "Livro de Passos Profundos III": ["Raro", ["Livro de encantamento: Passos Profundos III", "Categoria comercial: Raro. Aplicável somente ao equipamento compatível."]],
  "Livro de Passos Gelados II": ["Lendário", ["Livro de encantamento: Passos Gelados II", "Categoria comercial: Lendário. Aplicável somente ao equipamento compatível."]],
  "Livro de Agilidade Aquática III": ["Raro", ["Livro de encantamento: Agilidade Aquática III", "Categoria comercial: Raro. Aplicável somente ao equipamento compatível."]],
  "Livro de Caminhar sobre as Almas III": ["Lendário", ["Livro de encantamento: Caminhar sobre as Almas III", "Categoria comercial: Lendário. Aplicável somente ao equipamento compatível."]],
  "Livro de Passos Furtivos III": ["Lendário", ["Livro de encantamento: Passos Furtivos III", "Categoria comercial: Lendário. Aplicável somente ao equipamento compatível."]],
  "Livro de Maldição do Ligamento I": ["Comum", ["Livro de encantamento: Maldição do Ligamento I", "Categoria comercial: Comum. Aplicável somente ao equipamento compatível."]],
  "Livro de Maldição do Desaparecimento I": ["Comum", ["Livro de encantamento: Maldição do Desaparecimento I", "Categoria comercial: Comum. Aplicável somente ao equipamento compatível."]],
  "Livro de Poder V": ["Raro", ["Livro de encantamento: Poder V", "Categoria comercial: Raro. Aplicável somente ao equipamento compatível."]],
  "Livro de Impacto II": ["Básico", ["Livro de encantamento: Impacto II", "Categoria comercial: Básico. Aplicável somente ao equipamento compatível."]],
  "Livro de Chama I": ["Básico", ["Livro de encantamento: Chama I", "Categoria comercial: Básico. Aplicável somente ao equipamento compatível."]],
  "Livro de Infinidade I": ["Raro", ["Livro de encantamento: Infinidade I", "Categoria comercial: Raro. Aplicável somente ao equipamento compatível."]],
  "Livro de Sorte do Mar III": ["Básico", ["Livro de encantamento: Sorte do Mar III", "Categoria comercial: Básico. Aplicável somente ao equipamento compatível."]],
  "Livro de Atração III": ["Básico", ["Livro de encantamento: Atração III", "Categoria comercial: Básico. Aplicável somente ao equipamento compatível."]],
  "Livro de Lealdade III": ["Básico", ["Livro de encantamento: Lealdade III", "Categoria comercial: Básico. Aplicável somente ao equipamento compatível."]],
  "Livro de Impaling V": ["Raro", ["Livro de encantamento: Impaling V", "Categoria comercial: Raro. Aplicável somente ao equipamento compatível."]],
  "Livro de Correnteza III": ["Raro", ["Livro de encantamento: Correnteza III", "Categoria comercial: Raro. Aplicável somente ao equipamento compatível."]],
  "Livro de Canalização I": ["Raro", ["Livro de encantamento: Canalização I", "Categoria comercial: Raro. Aplicável somente ao equipamento compatível."]],
  "Livro de Perfurante IV": ["Raro", ["Livro de encantamento: Perfurante IV", "Categoria comercial: Raro. Aplicável somente ao equipamento compatível."]],
  "Livro de Rajada Múltipla I": ["Lendário", ["Livro de encantamento: Rajada Múltipla I", "Categoria comercial: Lendário. Aplicável somente ao equipamento compatível."]],
  "Livro de Carga Rápida III": ["Básico", ["Livro de encantamento: Carga Rápida III", "Categoria comercial: Básico. Aplicável somente ao equipamento compatível."]],
  "Livro de Densidade V": ["Lendário", ["Livro de encantamento: Densidade V", "Categoria comercial: Lendário. Aplicável somente ao equipamento compatível."]],
  "Livro de Ruptura IV": ["Lendário", ["Livro de encantamento: Ruptura IV", "Categoria comercial: Lendário. Aplicável somente ao equipamento compatível."]],
  "Livro de Arremesso de Vento III": ["Lendário", ["Livro de encantamento: Arremesso de Vento III", "Categoria comercial: Lendário. Aplicável somente ao equipamento compatível."]],
  "Livro de Poder I": ["Comum", ["Livro de encantamento: Poder I", "Categoria comercial: Comum. Aplicável somente ao equipamento compatível."]],
  "Livro de Afiação I": ["Comum", ["Livro de encantamento: Afiação I", "Categoria comercial: Comum. Aplicável somente ao equipamento compatível."]],
  "Livro de Proteção I": ["Comum", ["Livro de encantamento: Proteção I", "Categoria comercial: Comum. Aplicável somente ao equipamento compatível."]],
  "Livro de Eficiência I": ["Comum", ["Livro de encantamento: Eficiência I", "Categoria comercial: Comum. Aplicável somente ao equipamento compatível."]],
  "Livro de Inquebrável I": ["Comum", ["Livro de encantamento: Inquebrável I", "Categoria comercial: Comum. Aplicável somente ao equipamento compatível."]],
  "Livro de Punição I": ["Comum", ["Livro de encantamento: Punição I", "Categoria comercial: Comum. Aplicável somente ao equipamento compatível."]],
  "Livro de Ruína dos Artrópodes I": ["Comum", ["Livro de encantamento: Ruína dos Artrópodes I", "Categoria comercial: Comum. Aplicável somente ao equipamento compatível."]],
  "Livro de Proteção contra Fogo I": ["Comum", ["Livro de encantamento: Proteção contra Fogo I", "Categoria comercial: Comum. Aplicável somente ao equipamento compatível."]],
  "Livro de Proteção contra Explosões I": ["Comum", ["Livro de encantamento: Proteção contra Explosões I", "Categoria comercial: Comum. Aplicável somente ao equipamento compatível."]],
  "Livro de Proteção contra Projéteis I": ["Comum", ["Livro de encantamento: Proteção contra Projéteis I", "Categoria comercial: Comum. Aplicável somente ao equipamento compatível."]],
  "Livro de Queda Suave I": ["Comum", ["Livro de encantamento: Queda Suave I", "Categoria comercial: Comum. Aplicável somente ao equipamento compatível."]],
  "Livro de Espinhos I": ["Comum", ["Livro de encantamento: Espinhos I", "Categoria comercial: Comum. Aplicável somente ao equipamento compatível."]],
  "Livro de Atração I": ["Comum", ["Livro de encantamento: Atração I", "Categoria comercial: Comum. Aplicável somente ao equipamento compatível."]],
  "Livro de Sorte do Mar I": ["Comum", ["Livro de encantamento: Sorte do Mar I", "Categoria comercial: Comum. Aplicável somente ao equipamento compatível."]],
  "Livro de Perfurante I": ["Comum", ["Livro de encantamento: Perfurante I", "Categoria comercial: Comum. Aplicável somente ao equipamento compatível."]],
  "Livro de Carga Rápida I": ["Comum", ["Livro de encantamento: Carga Rápida I", "Categoria comercial: Comum. Aplicável somente ao equipamento compatível."]],
  "Livro de Lealdade I": ["Comum", ["Livro de encantamento: Lealdade I", "Categoria comercial: Comum. Aplicável somente ao equipamento compatível."]],
  "Livro de Impaling I": ["Comum", ["Livro de encantamento: Impaling I", "Categoria comercial: Comum. Aplicável somente ao equipamento compatível."]],
  "Livro de Densidade I": ["Comum", ["Livro de encantamento: Densidade I", "Categoria comercial: Comum. Aplicável somente ao equipamento compatível."]],
  "Livro de Repulsão I": ["Comum", ["Livro de encantamento: Repulsão I", "Categoria comercial: Comum. Aplicável somente ao equipamento compatível."]],
  "Livro de Aspecto Flamejante I": ["Comum", ["Livro de encantamento: Aspecto Flamejante I", "Categoria comercial: Comum. Aplicável somente ao equipamento compatível."]],
  "Livro de Varredura I": ["Comum", ["Livro de encantamento: Varredura I", "Categoria comercial: Comum. Aplicável somente ao equipamento compatível."]],
  "Capacete de Ferro": ["Comum", ["Capacete de Ferro.", "Equipamento/encantamento entregue conforme a configuração do servidor."]],
  "Peitoral de Ferro": ["Comum", ["Peitoral de Ferro.", "Equipamento/encantamento entregue conforme a configuração do servidor."]],
  "Calças de Ferro": ["Comum", ["Calças de Ferro.", "Equipamento/encantamento entregue conforme a configuração do servidor."]],
  "Botas de Ferro": ["Comum", ["Botas de Ferro.", "Equipamento/encantamento entregue conforme a configuração do servidor."]],
  "Armadura de Ouro": ["Comum", ["Armadura de Ouro.", "Equipamento/encantamento entregue conforme a configuração do servidor."]],
  "Capacete de Diamante": ["Básico", ["Capacete de Diamante.", "Equipamento/encantamento entregue conforme a configuração do servidor."]],
  "Peitoral de Diamante": ["Básico", ["Peitoral de Diamante.", "Equipamento/encantamento entregue conforme a configuração do servidor."]],
  "Calças de Diamante": ["Básico", ["Calças de Diamante.", "Equipamento/encantamento entregue conforme a configuração do servidor."]],
  "Botas de Diamante": ["Básico", ["Botas de Diamante.", "Equipamento/encantamento entregue conforme a configuração do servidor."]],
  "Capacete de Diamante Proteção IV": ["Raro", ["Capacete de Diamante Proteção IV.", "Equipamento/encantamento entregue conforme a configuração do servidor."]],
  "Peitoral de Diamante Proteção IV": ["Raro", ["Peitoral de Diamante Proteção IV.", "Equipamento/encantamento entregue conforme a configuração do servidor."]],
  "Calças de Diamante Proteção IV": ["Raro", ["Calças de Diamante Proteção IV.", "Equipamento/encantamento entregue conforme a configuração do servidor."]],
  "Botas de Diamante Proteção IV e Queda Suave IV": ["Raro", ["Botas de Diamante Proteção IV e Queda Suave IV.", "Equipamento/encantamento entregue conforme a configuração do servidor."]],
  "Peça de Diamante Inquebrável III": ["Raro", ["Peça de Diamante Inquebrável III.", "Equipamento/encantamento entregue conforme a configuração do servidor."]],
  "Capacete de Netherite Encantado": ["Lendário", ["Capacete de Netherite Encantado.", "Equipamento/encantamento entregue conforme a configuração do servidor."]],
  "Peitoral de Netherite Encantado": ["Lendário", ["Peitoral de Netherite Encantado.", "Equipamento/encantamento entregue conforme a configuração do servidor."]],
  "Calças de Netherite Encantadas": ["Lendário", ["Calças de Netherite Encantadas.", "Equipamento/encantamento entregue conforme a configuração do servidor."]],
  "Botas de Netherite Encantadas": ["Lendário", ["Botas de Netherite Encantadas.", "Equipamento/encantamento entregue conforme a configuração do servidor."]],
  "Conjunto Completo de Netherite Lendário": ["Lendário", ["Capacete, peitoral, calças e botas de Netherite.", "Preço promocional do conjunto completo. Os encantamentos exatos precisam ser definidos no servidor."]],
  "Melhoria Proteção IV": ["Melhoria extra", ["Proteção IV para equipamento compatível.", "Entrega depende da configuração do servidor."]],
  "Melhoria Inquebrável III": ["Melhoria extra", ["Inquebrável III para equipamento compatível.", "Entrega depende da configuração do servidor."]],
  "Melhoria Espinhos III": ["Melhoria extra", ["Espinhos III para equipamento compatível.", "Entrega depende da configuração do servidor."]],
  "Melhoria Queda Suave IV": ["Melhoria extra", ["Queda Suave IV para equipamento compatível.", "Entrega depende da configuração do servidor."]],
  "Melhoria Passos Profundos III": ["Melhoria extra", ["Passos Profundos III para equipamento compatível.", "Entrega depende da configuração do servidor."]],
  "Melhoria Remendo I": ["Melhoria extra", ["Remendo I para equipamento compatível.", "Entrega depende da configuração do servidor."]],
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

// Renderiza automaticamente no catálogo os produtos cadastrados em `products`
// que ainda não possuem um card estático no index.html.
(function renderMissingProductCards() {
  const grid = $('products');
  if (!grid) return;
  const existing = new Set(Array.from(grid.querySelectorAll('[data-product]')).map(button => button.dataset.product));
  const categoryLabels = {
    vips: 'VIP', kits: 'KITS', moedas: 'MOEDAS', xp: 'NÍVEIS DE XP',
    chaves: 'CHAVES', crates: 'CAIXAS', spawners: 'GERADORES DE MOBS',
    enchants: 'LIVROS DE ENCANTAMENTOS', armor: 'MELHORIAS PARA ARMADURAS'
  };
  Object.entries(products).forEach(([name, product]) => {
    if (existing.has(name)) return;
    const card = document.createElement('article');
    card.className = 'product';
    card.dataset.category = product.category;
    const art = document.createElement('div');
    art.className = 'product-art';
    art.setAttribute('aria-label', `Imagem de ${name}`);
    const fallback = document.createElement('span');
    fallback.className = 'image-fallback';
    fallback.textContent = product.icon || '🎁';
    const glow = document.createElement('span');
    glow.className = 'art-glow';
    glow.setAttribute('aria-hidden', 'true');
    art.append(fallback, glow);
    const meta = document.createElement('div');
    meta.className = 'product-meta';
    const pill = document.createElement('span');
    pill.className = 'pill';
    pill.textContent = product.tier ? `${product.tier.toUpperCase()} · ${categoryLabels[product.category] || 'PRODUTO'}` : (categoryLabels[product.category] || 'PRODUTO');
    const stock = document.createElement('span');
    stock.className = 'stock-dot';
    stock.textContent = 'DISPONÍVEL';
    meta.append(pill, stock);
    const heading = document.createElement('h3');
    heading.textContent = product.displayName || name;
    const description = document.createElement('p');
    const detail = productDetails[name];
    description.textContent = detail && detail[1] && detail[1][0] ? detail[1][0] : 'Produto do catálogo NexusCraft.';
    const bottom = document.createElement('div');
    bottom.className = 'product-bottom';
    const price = document.createElement('strong');
    price.className = 'price';
    price.textContent = money(product.price);
    const buy = document.createElement('button');
    buy.type = 'button';
    buy.dataset.product = name;
    buy.append(document.createTextNode('Comprar agora '));
    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '→';
    buy.append(arrow);
    bottom.append(price, buy);
    card.append(art, meta, heading, description, bottom);
    grid.append(card);
  });
})();

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
