import axios from "axios";

//interface para pegar somente o que eu preciso
//se for olhar o retorno do insonia ele retorna varias infomações
//mas eu so quero o access_token
interface IAccessTokenResponse {
  access_token: string;
}

class AuthenticateUserService {
  //para todo service criar um execute
  //recebendo o token
  async execute(code: string) {
    //url para acessar o git para recuperar o access_token
    const url = "https://github.com/login/oauth/access_token";
    const { data: access_tokenResponse } =
      //recuperando o access_token
      //chamando a interface para pegar so o que eu quero
      await axios.post<IAccessTokenResponse>(url, null, {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: "application/json",
        },
      });

    const response = await axios.get("https://api.github.com/user", {
      headers: {
        authorization: `Bearer ${access_tokenResponse.access_token}`,
      },
    });

    return response.data;
  }
}

export { AuthenticateUserService };
