//Criando variáveis para controlar a DOM
const entregaDOM = document.querySelector('.entrega')
const pagamentoDOM = document.querySelector('.formapagamento')
const cupomDesconto = document.querySelector('.cupomdesconto')
const botaoDesconto = document.querySelector('.botaocupom')

//Puxando dados do Local Storage
const pedido = JSON.parse(localStorage.getItem('carrinho'))
const { nome, rua, cep, complemento, cidade, numero, estado, telefone, formapagamento } = JSON.parse(localStorage.getItem('dadoscadastrais'))
let precototal = JSON.parse(localStorage.getItem('precototal'))

console.log(nome, rua, complemento, cidade, estado, telefone);


entregaDOM.innerHTML = `
<p>Nome: ${nome}</p>
<p>${rua}, ${numero}</p>
<p>${complemento}</p>
<p>${cidade} - ${estado}</p>
<p>CEP: ${cep}</p>
<p>Telefone: ${telefone}</p>
`

if (formapagamento === "boletobancario") {
  pagamentoDOM.innerHTML = `
  <p>Total: R$${precototal}</p>
  <p>Forma de pagamento</p>
  <p>Boleto Bancário</p>
  `
} else {

}

botaoDesconto.onclick = () => {
  if (cupomDesconto.value.length === 0) {
    cupomDesconto.value = ""
  } else {
    if (cupomDesconto.value === "sobrinomelhorprofessor") {
      precototal = 0
      pagamentoDOM.innerHTML = `
      <p>Total: R$${precototal}</p>
      <p>Forma de pagamento</p>
      <p>Boleto Bancário</p>
      `

    } else {
      cupomDesconto.value = ""
    }
  }
}


