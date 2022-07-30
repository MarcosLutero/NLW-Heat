//importando do express as funções
import { Request, Response } from "express";
import { ProfileUserService } from "../services/ProfileUserService";

class ProfileUserController {
  //para todos os controllers criar um handle
  async handle(request: Request, response: Response) {
    const { user_id } = request;
    const service = new ProfileUserService();

    const result = await service.execute(user_id);

    return response.json(result);
  }
}

export { ProfileUserController };
