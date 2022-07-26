import "dotenv/config";
import { router } from "../router";

import express, { request } from "express";

const app = express();

//serve para o express entender expressões e json
app.use(express.json());
app.use(router);

//simular oq o front vai fazer
app.get("/github", (request, response) => {
  //redirecionando
  response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

//link no git para retorno
app.get("/signin/callback", (request, response) => {
  const { code } = request.query;

  return response.json(code);
});

app.listen(process.env.PORT, () =>
  console.log(`Server is running on PORT ${process.env.PORT}`)
);
