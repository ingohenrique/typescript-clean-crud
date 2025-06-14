import { expect, test, beforeAll } from "bun:test";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.user.deleteMany();
});

test("should create a new user successfully", async () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password",
  };

  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  expect(response.status).toBe(201);
  const data = await response.json();
  expect(data.user.name).toBe(user.name);
  expect(data.user.id).toBeDefined();
});

test("should not allow creating a user with existing email", async () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password",
  };


  await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });


  const duplicateResponse = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  expect(duplicateResponse.status).toBe(400);
});
