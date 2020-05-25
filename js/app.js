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
const compraCheckout = document.querySelector(".checkout")

//Array pra por informações no LocalStorage
let carrinho = []

//Botões
let botoesDOM = []

let tempTotal = 0;

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
      <i class="fas fa-chevron-up incrementa" data-id=${item.id}></i>
      <p class="quantidade__item">${item.amount}</p>
      <i class="fas fa-chevron-down decrementa" data-id=${item.id}></i>
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

  configCarrinho() {
    btnLimparCarrinho.addEventListener('click', () => {
      this.limpaCarrinho();
    })

    //Funcionalidade do carrinho
    conteudoCarrinho.addEventListener('click', event => {
      if (event.target.classList.contains('remover-item')) {
        let removerItem = event.target;
        let id = removerItem.dataset.id
        conteudoCarrinho.removeChild(removerItem.parentElement.parentElement);
        this.removerItem(id)
      }
      else if (event.target.classList.contains('incrementa')) {
        let incrementaItem = event.target
        let id = incrementaItem.dataset.id
        let itemTemp = carrinho.find(item => item.id === id)
        itemTemp.amount = itemTemp.amount + 1
        ArmazenamentoLocal.salvarCarrinho(carrinho)
        this.precoCarrinho(carrinho)
        incrementaItem.nextElementSibling.innerText = itemTemp.amount
      }
      else if (event.target.classList.contains('decrementa')) {
        let decrementaItem = event.target
        let id = decrementaItem.dataset.id
        let itemTemp = carrinho.find(item => item.id === id)
        itemTemp.amount = itemTemp.amount - 1
        if (itemTemp.amount > 0) {
          ArmazenamentoLocal.salvarCarrinho(carrinho)
          this.precoCarrinho(carrinho)
          decrementaItem.previousElementSibling.innerText = itemTemp.amount
        } else {
          conteudoCarrinho.removeChild(decrementaItem.parentElement.parentElement)
          this.removerItem(id)
        }
      }
    })
  }

  limpaCarrinho() {
    let qtdItensCarrinho = carrinho.map(item => item.id)
    qtdItensCarrinho.forEach(id => this.removerItem(id))
    console.log(conteudoCarrinho.children)
    while (conteudoCarrinho.children.length > 0) {
      conteudoCarrinho.removeChild(conteudoCarrinho.children[0])
    }
    this.fechaCarrinho()
  }

  removerItem(id) {
    carrinho = carrinho.filter(item => item.id !== id)
    this.precoCarrinho(carrinho)
    ArmazenamentoLocal.salvarCarrinho(carrinho)
    let botao = this.habilitaBotao(id)
    botao.disabled = false;
    botao.innerHTML = `<i class="fas fa-shopping-cart"></i>Adicionar ao carrinho`
  }

  habilitaBotao(id) {
    return botoesDOM.find(botao => botao.dataset.id === id)
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

  static compraTotal(carrinho) {
    localStorage.setItem("itenscarrinho", JSON.stringify(carrinho))
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
      mostraproduto.pegaBotoes()
      mostraproduto.configCarrinho()
    })
})

compraCheckout.onclick = () => {
  localStorage.setItem("checkout", JSON.stringify(carrinho))
  localStorage.setItem("precototal", JSON.stringify(tempTotal))
}