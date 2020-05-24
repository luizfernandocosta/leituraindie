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
let cart = []

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
    produtos.forEach(produto => {
      resultado += `
      <article class="main__produto">
      <div class="img-container">
        <img src=${produto.image} alt="produto" class="img-produto">
        <button class="button__produto" data-id=${produto.id}>
          <i class="fas fa-shopping-cart"></i>
          Adicionar ao carrinho
        </button>
      </div>
      <h3>${produto.title}</h3>
      <h4>$${produto.price}</h4>
    </article>
      `
    })
    produtosDOM.innerHTML = resultado;
  }

  pegaBotoes() {
    const buttons = [...document.querySelectorAll(".button__produto")]
    console.log(buttons)
  }
}

//Classe responsável pela LocalStorage
class ArmazenamentoLocal {
  static guardarProdutos(products) {
    localStorage.setItem("produtos", JSON.stringify(products))
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