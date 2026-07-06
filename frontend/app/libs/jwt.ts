// lib/jwt.ts
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "@/interface/CustomJwtPayload";

export function decodeToken(token: string) {
  return jwtDecode(token) as CustomJwtPayload ;
}