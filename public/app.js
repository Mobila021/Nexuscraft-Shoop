let selectedProduct={name:'1.000 Moedas',price:2,icon:'🪙'};
let selectedPayment='Pix';

const money=n=>n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});

function filterProducts(category,button){
  document.querySelectorAll('.category').forEach(b=>b.classList.remove('active'));
  button.classList.add('active');
  let visible=0;
  document.querySelectorAll('.product').forEach(card=>{
    const show=category==='todos'||card.dataset.category===category;
    card.classList.toggle('hidden',!show);
    if(show)visible++;
  });
  document.getElementById('noProducts').classList.toggle('hidden',visible!==0);
}

function selectProduct(name,price,type){
  const icons={moedas:'🪙',kits:'⚔️',vips:'♛',chaves:'🗝️',crates:'📦'};
  selectedProduct={name,price,icon:icons[type]||'◆'};
  document.getElementById('chosenName').textContent=name;
  document.getElementById('chosenPrice').textContent=money(price);
  document.getElementById('chosenIcon').textContent=selectedProduct.icon;
  document.getElementById('total').textContent=money(price);
  document.getElementById('message').textContent='';
  document.getElementById('loja').classList.add('hidden');
  document.getElementById('inicio').classList.add('hidden');
  document.getElementById('checkout').classList.remove('hidden');
  window.scrollTo({top:0,behavior:'smooth'});
}

function backToShop(){
  const checkout=document.getElementById('checkout');
  if(!checkout)return;
  checkout.classList.add('hidden');
  document.getElementById('loja').classList.remove('hidden');
  document.getElementById('inicio').classList.remove('hidden');
  document.getElementById('message').textContent='';
  window.scrollTo({top:0,behavior:'smooth'});
}

function choosePayment(button,payment){
  selectedPayment=payment;
  document.querySelectorAll('.method').forEach(b=>b.classList.remove('selected'));
  button.classList.add('selected');
}

async function continuePayment(){
  const nicknameInput=document.getElementById('nickname');
  const nick=nicknameInput ? nicknameInput.value.trim() : '';
  const msg=document.getElementById('message');

  if(!selectedProduct || !selectedProduct.name ||
     typeof selectedProduct.price!=='number' ||
     selectedProduct.price<=0){
    msg.textContent='Selecione um produto válido antes de continuar.';
    return;
  }

  if(!/^[A-Za-z0-9_]{3,16}$/.test(nick)){
    msg.textContent='Digite um nick de 3 a 16 caracteres, usando letras, números ou _.';
    if(nicknameInput)nicknameInput.focus();
    return;
  }

  msg.textContent='Preparando o pagamento...';

  try{
    const response=await fetch('/criar-pagamento',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        produto:selectedProduct.name,
        preco:selectedProduct.price,
        nick:nick,
        pagamento:selectedPayment
      })
    });

    const data=await response.json().catch(()=>({}));

    if(!response.ok){
      throw new Error(
        data.error || data.message ||
        'Não foi possível criar o pagamento.'
      );
    }

    const checkoutUrl=data.init_point || data.url;

    if(typeof checkoutUrl!=='string' ||
       !/^https?:\/\//i.test(checkoutUrl)){
      throw new Error(
        'O servidor não devolveu um link de pagamento válido.'
      );
    }

    msg.textContent='Abrindo o checkout seguro...';
    window.location.href=checkoutUrl;

  }catch(error){
    console.error('Erro ao iniciar pagamento:',error);
    msg.textContent=error.message ||
      'Erro ao iniciar o pagamento. Tente novamente.';
  }
}
