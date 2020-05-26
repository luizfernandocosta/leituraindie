const { email } = JSON.parse(localStorage.getItem('dadoscadastrais'))

Email.send({
  Host: "smtp.gmail.com",
  Username: "leituraindie@gmail.com",
  Password: "",
  To: `${email}`,
  From: "leituraindie@gmail.com",
  Subject: "Muito obrigado pela compra!",
  Body: "Muito obrigado por comprar em nossa loja! Seu pedido tem previsão de 3 dias úteis de entrega",
}).then(function () {
  localStorage.clear()
})
