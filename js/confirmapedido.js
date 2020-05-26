//Criando variáveis para controlar a DOM
const entregaDOM = document.querySelector('.entrega')
const pagamentoDOM = document.querySelector('.formapagamento')
const cupomDesconto = document.querySelector('.cupomdesconto')
const botaoDesconto = document.querySelector('.botaocupom')
const botaoCancelar = document.querySelector('.cancelar')
const botaoConfirmar = document.querySelector('.confirmar')
const linhaDOM = document.querySelector('.body')

//Puxando dados do Local Storage
const carrinho = JSON.parse(localStorage.getItem('carrinho'))
const { nome, numerocomplemento, email, rua, cep, complemento, cidade, numero, estado, telefone, formapagamento } = JSON.parse(localStorage.getItem('dadoscadastrais'))
let precototal = JSON.parse(localStorage.getItem('precototal'))

entregaDOM.innerHTML = `
<p>Nome: ${nome}</p>
<p>${rua}, ${numerocomplemento}</p>
<p>${complemento}</p>
<p>${cidade} - ${estado}</p>
<p>CEP: ${cep}</p>
<p>Telefone: ${telefone}</p>
`

if (formapagamento === "boletobancario") {
  pagamentoDOM.innerHTML = `
  <p>Total: R$${precototal.toFixed(2)}</p>
  <p>Forma de pagamento</p>
  <p>Boleto Bancário</p>
  `
} else {

}

for (let i = 0; i < carrinho.length; i++) {
  const { title, price, amount, id } = carrinho[i]
  let linha = document.createElement('tr')
  linha.innerHTML = `
  <td class="column1">${id}</td>
  <td class="column2">${title}</td>
  <td class="column3">${amount}</td>
  <td class="column4">R$${price}</td>
  `
  linhaDOM.appendChild(linha)
  console.log(carrinho);

}

botaoDesconto.onclick = () => {
  if (cupomDesconto.value.length === 0) {
    cupomDesconto.value = ""
  } else {
    if (cupomDesconto.value === "sobrinomelhorprofessor") {
      precototal = 0
      pagamentoDOM.innerHTML = `
      <p>Total: R$${precototal}</p>
      `
    } else {
      cupomDesconto.value = ""
    }
  }
}

botaoCancelar.onclick = () => {
  window.location.replace("index.html")
  localStorage.clear()
}

botaoConfirmar.onclick = () => {
  window.location.replace('pedidoconfirmado.html')
}


