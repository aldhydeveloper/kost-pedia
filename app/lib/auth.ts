import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export const verifyToken = async (token: string) => {
  const { payload } = await jwtVerify(token, secret);
  return payload; // ini payload yang asli
};
