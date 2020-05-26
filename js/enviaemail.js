const { email } = JSON.parse(localStorage.getItem('dadoscadastrais'))

let message = `
  Muito obrigado pela sua compra!
  A previsão de chegada do seu pedido é entre 3-5 dias úteis.
`

Email.send({
  Host: "smtp.gmail.com",
  Username: "leituraindie@gmail.com",
  Password: "",
  To: `${email}`,
  From: "leituraindie@gmail.com",
  Subject: "Muito obrigado pela compra!",
  Body: `${message}`,
}).then(function () {
  localStorage.clear()
})
