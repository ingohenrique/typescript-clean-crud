import UseCase from "../../../domain/shared/UseCase";
import User from "../../../domain/user/User";
import UserRepository from "../../../domain/user/UserRepository";

export default class AddUser implements UseCase<AddUserInput, User> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: AddUserInput): Promise<User> {
    const existingUser = await this.userRepository.searchByEmail(input.email);

    if (existingUser) {
      throw new Error("User already exists");
    }

    const user: User = {
      name: input.name,
      email: input.email,
      password: input.password,
    };

    return this.userRepository.add(user);
  }
}

type AddUserInput = {
  name: string;
  email: string;
  password: string;
};
