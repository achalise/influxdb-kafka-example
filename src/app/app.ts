import { initServer } from "../server";
import cors from 'cors';
import { handlers } from "./handlers";

const app = initServer(handlers());
app.use(cors());