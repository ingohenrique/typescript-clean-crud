import { PrismaClient } from "@prisma/client";
import User from "../../domain/user/User";
import UserRepository from "../../domain/user/UserRepository";

export default class UserRepositoryPrismaPg implements UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async searchByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async add(user: User): Promise<User> {
    const userData = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    return {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    };
  }
}
