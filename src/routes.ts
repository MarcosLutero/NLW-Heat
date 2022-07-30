import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { GetLast3MessagesController } from "./controllers/GetLast3MessagesController";
import { ProfileUserController } from "./controllers/ProfileUserController";

import { ensuresAuthenticated } from "./middleware/ensureAutheticated";

const router = Router();
//instanciando o controller na rota com o metodo handle
// o metodo handle recebe res, req mas na hora ele vai funcionar com oum middleware
router.post("/authenticate", new AuthenticateUserController().handle);

router.post(
  "/messages",
  ensuresAuthenticated,
  new CreateMessageController().handle
);

router.get("/messages/last3", new GetLast3MessagesController().handle);

router.get(
  "/profile",
  ensuresAuthenticated,
  new ProfileUserController().handle
);

export { router };
