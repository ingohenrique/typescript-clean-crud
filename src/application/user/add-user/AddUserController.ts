import Elysia from "elysia";
import AddUser from "./AddUser";

export default class AddUserController {
  constructor(readonly server: Elysia, readonly useCase: AddUser) {
    server.post(
      "/users",
      async ({
        body,
        set,
      }: {
        body: { name: string; email: string; password: string };
        set: any;
      }) => {
        try {
          const user = await this.useCase.execute(body);
          set.status = 201;
          return {
            message: "User created successfully",
            user: {
              ...(user.id && { id: user.id }),
              name: user.name,
            },
          };
        } catch (error) {
          if (error instanceof Error) {
            set.status = 400;
            return {
              message: `Failed to create user: ${error.message}`,
            };
          }
          set.status = 500;
          return {
            message: "Internal server error",
          };
        }
      }
    );
  }
}
