import { Axios} from "@libs/axios";
import { Ionboarding } from "../interface/Ionboarding";



export async function hoshpitalRegister(payload: Ionboarding) {
  const register = await Axios.post("auth/signup", payload);
  return register;
}



export async function login(loginCredential: any) {

  const login = await Axios.post("/auth/login", loginCredential).then((res)=>{
     return  res.data

  })
  return login;
}

// export async function getMe() {
//   const AuthUser = await Axios.get("auth/me");
//   return AuthUser;
// }

// export async function logout() {
//   const { data } = await Axios.post("auth/logout");
//   return data.success;
// }
