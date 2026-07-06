"use client";
import { MousePointer2 } from "lucide-react";
import { Loginschema } from "@schemas/Login.schema";
import { decodeToken } from '@libs/jwt';
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  Controller,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILogin } from "@interface/ILogin";
import { login } from "@/services/Auth";
import { useRouter } from "next/navigation";
import { setAuthUser } from "@/store/features/Hoshpital/AuthSlice";
import { useDispatch } from "react-redux";





export const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({ resolver: yupResolver(Loginschema) });

  
   const dispatch = useDispatch()

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    const loginData= await login(data);
    const user = loginData[0]
     dispatch(setAuthUser(user))
   
    if(user.role == "admin"){
      router.push("/admin/candiates")
    }

    if(user.role == "reviewer"){
      router.push("/reviewer")
    }
            
   
  };

  const onError = (error: any) => {
    console.log("FORM ERROR", error);
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen ">
        <div className="flex flex-col  w-fit p-8 rounded space-y-4 shadow-md bg-slate-100">
          <div className="flex flex-col items-center justify-center">
            <div className="bg-blue-600 p-4 rounded">
              <MousePointer2 />
            </div>
            <span>Score Candidate</span>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="flex flex-col space-y-4"
          >
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                placeholder="email"
                {...register("email")}
                className="border p-2"
              />
              {errors?.["email"] && (
                <p className="text-xs text-red-500">
                  {errors["email"].message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                placeholder="password"
                {...register("password")}
                className="border p-2"
              />
              {errors?.["password"] && (
                <p className="text-xs text-red-500">
                  {errors["password"].message}
                </p>
              )}
            </div>
            <button className="w-fit bg-blue-600 p-2 rounded text-white">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

