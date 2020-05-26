const { email } = JSON.parse(localStorage.getItem('dadoscadastrais'))

let message = `
  Muito obrigado pela sua compra!
  A previsão de chegada do seu pedido é entre 3-5 dias úteis.
`

Email.send({
  Host: "smtp.gmail.com",
  Username: "leituraindie@gmail.com",
  Password: "32919415Br",
  To: `${email}`,
  From: "leituraindie@gmail.com",
  Subject: "Muito obrigado pela compra!",
  Body: "Muito obrigado por comprar em nossa loja! Seu pedido tem previsão de 3 dias úteis de entrega",
}).then(function () {
  localStorage.clear()
})