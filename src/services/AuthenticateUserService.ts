import axios from "axios";
import { JsonWebTokenError } from "jsonwebtoken";

import prismaCliente from "../prisma";
import { sign } from "JsonWebToken";

//interface para pegar somente o que eu preciso
//se for olhar o retorno do insonia ele retorna varias infomações
//mas eu so quero o access_token
interface IAccessTokenResponse {
  access_token: string;
}

interface IUserResponse {
  avatar_url: string;
  login: string;
  id: number;
  name: string;
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

    const response = await axios.get<IUserResponse>(
      "https://api.github.com/user",
      {
        headers: {
          authorization: `Bearer ${access_tokenResponse.access_token}`,
        },
      }
    );

    const { login, id, avatar_url, name } = response.data;

    let user = await prismaCliente.user.findFirst({
      where: {
        github_id: id,
      },
    });

    if (!user) {
      user = await prismaCliente.user.create({
        data: {
          github_id: id,
          login,
          avatar_url,
          name,
        },
      });
    }

    const token = sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id,
        },
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );
    return { token, user };
  }
}

export { AuthenticateUserService };
