const methods = {
  pix: "Com Pix, o jogador pode pagar pelo aplicativo do banco ou carteira digital que preferir, incluindo Nubank, Inter e Mercado Pago.",
  card: "O cartão de crédito será processado pelo provedor configurado. Bandeiras, parcelamento e aprovação dependem da integração.",
  mp: "Esta opção deverá abrir o checkout oficial do Mercado Pago depois que as credenciais da loja forem configuradas.",
  asaas: "Esta opção deverá abrir o checkout oficial do Asaas depois que as credenciais da loja forem configuradas."
};
let selected = "pix";
const toast = document.getElementById("toast");
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 4000);
}
document.querySelectorAll(".method").forEach(button => {
  button.addEventListener("click", () => {
    selected = button.dataset.method;
    document.querySelectorAll(".method").forEach(item => {
      const active = item === button;
      item.classList.toggle("selected", active);
      item.setAttribute("aria-checked", String(active));
    });
    document.getElementById("method-note").textContent = methods[selected];
  });
});
document.getElementById("continue").addEventListener("click", () => {
  const nick = document.getElementById("nickname").value.trim();
  if (!nick) {
    document.getElementById("nickname").focus();
    showToast("Digite seu nick do Minecraft antes de continuar.");
    return;
  }
  if (!/^[A-Za-z0-9_]{3,16}$/.test(nick)) {
    document.getElementById("nickname").focus();
    showToast("Confira o nick: use de 3 a 16 letras, números ou _.");
    return;
  }
  showToast("Interface demonstrativa: conecte um provedor de pagamento para gerar a cobrança real.");
});
