"use client";
import { MousePointer2 } from "lucide-react";
import { Loginschema } from "@schemas/Login.schema";
import { decodeToken } from "@libs/jwt";
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
import { setAuthUser, fetchAuthUser } from "@/store/features/AuthUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@store/store";
import Spinner from "@components/Spinner";
import { useEffect, useState } from "react";

export const Login = () => {
  const [Loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({ resolver: yupResolver(Loginschema) });

  const dispatch = useDispatch<AppDispatch>();
  const { authUser, loading } = useSelector((state: any) => state.authUser);

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
          console.log("loading",loading)

    const { payload } = await dispatch(fetchAuthUser(data));
    if (payload?.role == "admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }
  };

  useEffect(() => {

      console.log("loading",loading)
      setLoading(loading);
 
  }, [authUser]);

  const onError = (error: any) => {
    console.log("FORM ERROR", error);
  };

  return (
    <>
      <div
        className="relative h-screen w-full flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/premium_photo-1661488439548-a87936c95700-ezremove.png')",
        }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"></div>

        {/* card */}
        <div
          className="relative z-10 w-[360px] p-8 rounded-3xl 
        backdrop-blur-xl bg-white/2 
        border border-white/20 
        shadow-2xl shadow-black/40"
        >
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="bg-blue-600 p-4 rounded text-white">
              <MousePointer2 />
            </div>
            <span className="font-semibold text-xl text-gray-400">
              Candidate Scoring
            </span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-4">
              <label className="text-gray-400 text-lg">Email</label>
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
            <div className="flex flex-col space-y-4">
              <label className="text-gray-400 text-lg">Password</label>
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
            <button className="w-fit bg-blue-600 p-2 rounded text-white mt-4 flex items-center justify-center space-x-2">
              <span>Login</span>
              {Loading && <Spinner />}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
