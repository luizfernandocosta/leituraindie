// Criando variáveis para os botões

const btnMostraCarrinho = document.querySelector(".header__button")
const btnFecharCarrinho = document.querySelector(".fechar__carrinho")
const btnLimparCarrinho = document.querySelector(".limpar__carrinho")
const carrinhoDOM = document.querySelector(".carrinho")
const carrinhoOverlay = document.querySelector(".carrinho__overlay")
const quantidadeItemsCarrinho = document.querySelector(".header__items")
const totalItemsCarrinho = document.querySelector(".total__carrinho")
const conteudoCarrinho = document.querySelector(".conteudo__carrinho")
const produtosDOM = document.querySelector(".produtos")

//Array pra por informações no LocalStorage
let carrinho = []

//Botões
let botoesDOM = []

//Classe responsável pela captura de produtos (pegar do arquivo JSON)
class Produtos {
  //Criando função assíncrona para pegar items
  async pegaProdutos() {
    try {
      let resultado = await fetch('produtos.json')
      let dados = await resultado.json()
      let produtos = dados.items
      produtos = produtos.map(item => {
        const { title, price } = item.fields
        const { id } = item.sys
        const image = item.fields.image.fields.file.url
        return { title, price, id, image }
      })
      return produtos
    } catch (error) {
      console.log(error)
    }
  }
}

//Classe responsável por mostrar os produtos, pega o retorno da classe Produtos e mostra na tela
class UIProdutos {
  mostraProdutos(produtos) {
    let resultado = ''
    //Para cada produto, ele vai gerar o seguinte código
    produtos.forEach(produto => {
      resultado += `
      <article class="main__produto">
      <div class="img-container">
        <img src=${produto.image} alt="produto" class="img-produto">
        <button class="button" data-id=${produto.id}>
          <i class="fas fa-shopping-cart"></i>
          Adicionar ao carrinho
        </button>
      </div>
      <h3>${produto.title}</h3>
      <h4>R$${produto.price}</h4>
    </article>
      `
    })
    produtosDOM.innerHTML = resultado;
  }

  //Método para pegar os botões e fazê-los funcionais
  pegaBotoes() {
    const buttons = [...document.querySelectorAll(".button")]
    botoesDOM = buttons
    buttons.forEach(button => {
      let id = button.dataset.id
      let noCarrinho = carrinho.find(item => item.id === id)
      if (noCarrinho) {
        button.innerText = "No Carrinho"
        button.disabled = true
      } else {
        button.onclick = (event) => {
          event.target.innerText = "No Carrinho"
          event.target.disabled = true
          //Pega produto de produtos
          let itemCarrinho = { ...ArmazenamentoLocal.pegaProduto(id), amount: 1 }

          //Adiciona produto ao carrinho
          carrinho = [...carrinho, itemCarrinho]

          //Salva o carrinho no LocalStorage
          ArmazenamentoLocal.salvarCarrinho(carrinho)

          //Coloca o preço do carrinho
          this.precoCarrinho(carrinho)

          //Mostra o item do carrinho
          this.adicionaItemCarrinho(itemCarrinho)

          //Mostra o carrinho
          this.mostraCarrinho()
        }
      }
    })
  }
  precoCarrinho(carrinho) {
    let tempTotal = 0;
    let itensTotal = 0;
    carrinho.map(item => {
      tempTotal += item.price * item.amount
      itensTotal += item.amount
    })
    totalItemsCarrinho.innerText = parseFloat(tempTotal.toFixed(2))
    quantidadeItemsCarrinho.innerText = itensTotal
  }

  adicionaItemCarrinho(item) {
    const div = document.createElement('div')
    div.classList.add('item__carrinho')
    div.innerHTML = ` 
    <img src=${item.image}>
    <div>
      <h4>${item.title}</h4>
      <h5>R$${item.price}</h5>
      <span class="remover-item" data-id=${item.id}>Remover</span>
    </div>
    <div>
      <i class="fas fa-chevron-up" data-id=${item.id}></i>
      <p class="quantidade__item">${item.amount}</p>
      <i class="fas fa-chevron-down" data-id=${item.id}></i>
    </div>`
    conteudoCarrinho.appendChild(div)
  }

  mostraCarrinho() {
    carrinhoOverlay.classList.add('transparente')
    carrinhoDOM.classList.add('mostraCarrinho')
  }

  configAPP() {
    carrinho = ArmazenamentoLocal.recuperaCarrinho()
    this.precoCarrinho(carrinho)
    this.adiciona(carrinho)
    btnMostraCarrinho.addEventListener('click', this.mostraCarrinho)
    btnFecharCarrinho.addEventListener('click', this.fechaCarrinho)
  }

  adiciona(carrinho) {
    carrinho.forEach(item => this.adicionaItemCarrinho(item))
  }

  fechaCarrinho() {
    carrinhoOverlay.classList.remove('transparente')
    carrinhoDOM.classList.remove('mostraCarrinho')
  }
}

//Classe responsável pela LocalStorage
class ArmazenamentoLocal {
  static guardarProdutos(products) {
    localStorage.setItem("produtos", JSON.stringify(products))
  }

  static pegaProduto(id) {
    let produtos = JSON.parse(localStorage.getItem("produtos"))
    return produtos.find(product => product.id === id)
  }

  static salvarCarrinho(carrinho) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho))
  }

  static recuperaCarrinho() {
    return localStorage.getItem('carrinho') ? JSON.parse(localStorage.getItem('carrinho')) : []
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const mostraproduto = new UIProdutos();
  const produtos = new Produtos();
  //Inicío do app
  mostraproduto.configAPP()

  //Pegar todos os produtos
  produtos.pegaProdutos()
    .then(produtos => {
      mostraproduto.mostraProdutos(produtos)
      ArmazenamentoLocal.guardarProdutos(produtos)
    })
    .then(() => {
      mostraproduto.pegaBotoes();
    })
})