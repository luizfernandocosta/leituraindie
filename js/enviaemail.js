const { nome, email } = JSON.parse(localStorage.getItem('dadoscadastrais'))
const carrinho = JSON.parse(localStorage.getItem('carrinho'))

function pegaLivros() {
  let resultado = ''
  for (let i = 0; i < carrinho.length; i++) {
    const { title, price, amount } = carrinho[i]
    resultado += `
    <tr>
    <td width="175" align="center" style="padding: 10px 0 10px 0; text-transform: capitalize;">
      ${title}
    </td>
    <td width="175" align="center">
      ${amount}
    </td>
    <td width="175" align="center">
      R$${price}
    </td>
  </tr>
    `
  }
  return resultado;
}

let message = `
<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>E-mail de confirmação</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin: 0; padding: 0;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">
          <tr>
            <td bgcolor="#1a1b1f" style=" font-size: 60px; font-family: Arial, sans-serif; line-height: 20px;"
              width="100" height="130">
              <p align="center" style="display: block;color:#ffffff">Leitura<span style="color:#4fc3f7">Indie</span></p>
            </td>
          </tr>
          <tr>
            <td bgcolor="#1a1b1f" style="padding: 40px 30px 40px 30px">
              <table bgcolor="#1a1b1f" border="0" cellpadding="0" cellspacing="0" width="100%"
                style="color:#ffffff; font-size: 20px;">
                <tr>
                  <td>
                    Prezado(a) ${nome}, você está recebendo um e-mail de confirmação pois fez uma compra em
                    nossa loja, o seu pedido foi:
                  </td>
                </tr>
                <tr>
                  <td>
                    <table bgcolor="#1a1b1f" border="0" cellpadding="0" cellspacing="0" width="100%"
                      style="color:#ffffff; font-family: Arial, sans-serif; font-size: 20px; line-height: 20px;">
                      <tr>
                        <td width="175" align="center" style="padding: 20px 0 20px 0;">
                          Nome do livro
                        </td>
                        <td width="175" align="center">
                          Quantidade
                        </td>
                        <td width="175" align="center">
                          Preço
                        </td>
                      </tr>
                      ${pegaLivros()}
                    </table>
                  </td>
                <tr>
                  <td style="padding: 20px 0 20px 0;">
                    Seu pedido tem um prazo de entrega entre 3-5 dias úteis, muito obrigado por comprar em nossa loja e
                    apoiar artistas independentes!
                    <p>Boa leitura!</p>
                  </td>
                </tr>
          </tr>
        </table>
      </td>
    </tr>
    </td>
    </tr>
  </table>
  </table>
</body>
</html>
`

Email.send({
  SecureToken: "acc63244-d6e6-42d9-a7b4-72ef59e6f5ee",
  To: `${email}`,
  From: "LeituraIndie",
  Subject: "Muito obrigado pela compra!",
  Body: `${message}`,
}).then(function () {
  localStorage.clear()
})
