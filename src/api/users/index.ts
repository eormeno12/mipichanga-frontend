import { users_api } from "..";
import { env } from "../../../config";
import { UserSchema } from "./users.model";

export async function loginWithEmailAndPassword(email: string, password: string) {
  const res = await users_api.post('/auth/login', { email, password });
  const user = UserSchema.parse(res.data);
  return user;
}

export async function logout() {
  const res = await users_api.get("/auth/logout");
  const status = res.status;
  return status;
}

export async function getUser() {
  try {
    const res = await users_api.get("/users/me");
    const user = UserSchema.parse(res.data);
    console.log(env);
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}