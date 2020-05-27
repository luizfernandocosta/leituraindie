//Criando variáveis para os campos de texto e para o botão
const nomeCliente = document.querySelector('.nomecliente')
const cpfCliente = document.querySelector('.cpfcliente')
const emailCliente = document.querySelector('.emailcliente')
const contatoCliente = document.querySelector('.telefonecliente')
const cepCliente = document.querySelector('.cepcliente')
const ruaCliente = document.querySelector('.ruacliente')
const numeroCliente = document.querySelector('.numerocliente')
const complementoCliente = document.querySelector('.complementocliente')
const bairroCliente = document.querySelector('.bairrocliente')
const cidadeCliente = document.querySelector('.cidadecliente')
const estadoCliente = document.querySelector('.estadocliente')
const formaDePagamento = document.querySelector('.opcaocliente')
const botaoConfirma = document.querySelector('.botaoconfirma')
const dadosCobranca = document.querySelector('.dadoscobranca')
const dadosCartao = document.querySelector('.dadoscartao')
const checkoutDOM = document.querySelector('.main__checkout')
const cartaoCliente = document.querySelector('.cartaocliente')
const cvvCliente = document.querySelector('.codigocliente')


//Desabilitando campos de textos
ruaCliente.disabled = true
bairroCliente.disabled = true
cidadeCliente.disabled = true
estadoCliente.disabled = true

//Criando objeto que vai ser preenchido com os dados cadastrais
const dadosCadastrais = {}

//Todas as funções com onkeyup está verificando em tempo real o que o usuário está digitando, verificando e validando
nomeCliente.onkeyup = () => {
  if (nomeCliente.value.length !== 0) {
    dadosCadastrais.nome = nomeCliente.value;
    nomeCliente.style.borderBottom = "2px solid #66bb6a"
  } else {
    nomeCliente.style.borderBottom = "2px solid #c62828"
    delete dadosCadastrais.nome
  }
}

emailCliente.onkeyup = () => {
  let email = emailCliente.value
  if (email.includes("@") && email.includes(".com") || email.includes(".br")) {
    dadosCadastrais.email = emailCliente.value
    emailCliente.style.borderBottom = "2px solid #66bb6a"
  } else {
    emailCliente.style.borderBottom = "2px solid #c62828"
    delete dadosCadastrais.email
  }
}

cpfCliente.onkeyup = () => {
  if (cpfCliente.value.length === 14) {
    dadosCadastrais.cpf = cpfCliente.value
    cpfCliente.style.borderBottom = "2px solid #66bb6a"
  } else {
    cpfCliente.style.borderBottom = "2px solid #c62828"
    delete dadosCadastrais.cpf
  }
}

contatoCliente.onkeyup = () => {
  if (contatoCliente.value.length === 15) {
    dadosCadastrais.telefone = contatoCliente.value
    contatoCliente.style.borderBottom = "2px solid #66bb6a"
  } else {
    delete dadosCadastrais.telefone
    contatoCliente.style.borderBottom = "2px solid #c62828"
  }
}

cepCliente.onkeyup = () => {
  if (cepCliente.value.length === 9) {

    console.log(cepCliente.value);
    (async () => {
      const response = await axios({
        url: `https://viacep.com.br/ws/${cepCliente.value}/json/`,
        method: 'get'
      })

      if (response.status === 200) {

        cepCliente.style.borderBottom = "2px solid #66bb6a"
        dadosCobranca.style.display = "flex"
        checkoutDOM.style.height = "750px"
        bairroCliente.value = response.data.bairro
        cidadeCliente.value = response.data.localidade
        estadoCliente.value = response.data.uf

        dadosCadastrais.cep = cepCliente.value
        dadosCadastrais.bairro = response.data.bairro
        dadosCadastrais.cidade = response.data.localidade
        dadosCadastrais.estado = response.data.uf

        if (response.data.logradouro === "") {
          ruaCliente.disabled = false
        } else {
          ruaCliente.value = response.data.logradouro
          dadosCadastrais.rua = response.data.logradouro
        }

      } else {
        alert("Erro na API")
      }
    })()
  } else {
    cepCliente.style.borderBottom = "2px solid #c62828"
    delete dadosCadastrais.cep
  }
}

numeroCliente.onkeyup = () => {
  if (numeroCliente.value.length !== 0) {
    dadosCadastrais.numerocomplemento = numeroCliente.value
  } else {
    dadosCadastrais.numerocomplemento = 0
  }
}

complementoCliente.onkeyup = () => {
  if (complementoCliente.value.length !== 0) {
    dadosCadastrais.complemento = complementoCliente.value
  } else {
    dadosCadastrais.complemento = ""
  }
}

cartaoCliente.onkeyup = () => {
  if (cartaoCliente.value.length === 19) {
    dadosCadastrais.cartaocliente = cartaoCliente.value
  } else {
    delete dadosCadastrais.cartaocliente
  }
}

cvvCliente.onkeyup = () => {
  if (cvvCliente.value.length === 3) {
    dadosCadastrais.cvv = cvvCliente.value
  } else {
    delete dadosCadastrais.cvv
  }
}

dadosCadastrais.formapagamento = "boletobancario"

formaDePagamento.onclick = () => {
  let valSelecionado = formaDePagamento.options[formaDePagamento.selectedIndex].value
  if (valSelecionado === "boletobancario") {
    dadosCadastrais.formapagamento = valSelecionado
  } else {
    dadosCadastrais.formapagamento = valSelecionado
    checkoutDOM.style.height = "800px"
    dadosCartao.style.display = "inline"
  }
}



botaoConfirma.onclick = () => {
  localStorage.setItem('dadoscadastrais', JSON.stringify(dadosCadastrais))
  window.location.replace("confirmapedido.html")
}