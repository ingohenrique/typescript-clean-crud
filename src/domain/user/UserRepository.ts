import User from "./User";

export default interface UserRepository {
  searchByEmail(email: string): Promise<User | null>;
  add(user: User): Promise<User>;
}
