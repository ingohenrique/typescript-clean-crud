import Elysia from "elysia";
import AddUser from "../application/user/add-user/AddUser";
import AddUserController from "../application/user/add-user/AddUserController";
import UserRepositoryPrismaPg from "../infrastructure/repositories/UserRepositoryPrisma";

const app = new Elysia();

const userRepository = new UserRepositoryPrismaPg();
const addUser = new AddUser(userRepository);
new AddUserController(app, addUser);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
