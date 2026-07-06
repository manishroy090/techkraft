"use client";
import { Eye } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCandidateDetails } from "@services/Candidates";
import { useScroll } from "framer-motion";
import { getAiSummaryResult } from "@services/Candidates";
import {
  useForm
} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";

const page = () => {
  const params = useParams();
  const { id } = params;
  const [message, setMessage] = useState();
  const [loading ,setLoading] = useState(true);

  const {
    register,
    handleSubmit
  } = useForm()

  useEffect(() => {
    const getAiSummary = async () => {
      const result = await getAiSummaryResult(id, (data) => {
        if(data){
          setLoading(false)
          
        }
        setMessage((prev) => prev + data.message);
      })
        .then((res) => {
          console.log("res", res);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

     getAiSummary();
  }, []);



  // const generateAiSummary = (data) =>{
  //   console.log("data",data);
  // }



  // const onError = () =>{

  //   console.log("onError")

  // }



  return (
    <div className="flex flex-col space-y-10 p-32  h-full">

      {loading ? <span className="font-semibold text-xl">Loading...</span> : ""}
      <div className="h-9/10 bg-border border-black border overflow-y-scroll p-8">
        <span style={{ whiteSpace: "pre-wrap" }}>{message}</span>
      </div>
      {/* <form onSubmit={handleSubmit(generateAiSummary,onError)} className="hidden">
        <textarea
          {...register("usercontent")}
          placeholder="type here"
          rows={120}
          className={
            "mt-2 border-input placeholder:text-muted-foreground focus-visible:outline-0 focus-visible:border-primary aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          }
        ></textarea>
        <button  className="bg-black w-fit text-white p-4 rounded mt-10 hidden">
          Generate Summary
        </button>
     </form> */}
    </div>
  );
};

export default page;
