// Criando variáveis para os botões

const btnCarrinho = document.querySelector(".header__button")
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
          console.log(carrinho);

          //Salva o carrinho no LocalStorage
          //Coloca o preço do carrinho
          //Mostra o item do carrinho
          //Mostra o carrinho
        }
      }
    })
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
}

document.addEventListener("DOMContentLoaded", () => {
  const mostraproduto = new UIProdutos();
  const produtos = new Produtos();

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