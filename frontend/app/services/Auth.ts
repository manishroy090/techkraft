import { Axios} from "@libs/axios";

export async function login(loginCredential: any) {

  const login = await Axios.post("/auth/login", loginCredential).then((res)=>{
     return  res.data

  })
  return login;
}


export async function logout() {
  const { data } = await Axios.post("auth/logout");
  return data.message;
}
