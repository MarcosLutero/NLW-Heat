//importando do express as funções
import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticateUserController {
  //para todos os controllers criar um handle
  async handle(request: Request, response: Response) {
    const { code } = request.body;

    const service = new AuthenticateUserService();
    const result = await service.execute(code);

    return response.json(result);
  }
}

export { AuthenticateUserController };
