import "dotenv/config";
import { router } from "./routes";

import express, { request } from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();

app.use(cors());

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`Usuario conectado no socket ${socket.id}`);
});

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

export { serverHttp, io };
