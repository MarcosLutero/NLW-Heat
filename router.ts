import { Router } from "express";
import { AuthenticateUserController } from "./src/controllers/AuthenticateUserController";

const router = Router();
//instanciando o controller na rota com o metodo handle
// o metodo handle recebe res, req mas na hora ele va ifuncionar com oum middleware
router.post("/authenticate", new AuthenticateUserController().handle);

export { router };
