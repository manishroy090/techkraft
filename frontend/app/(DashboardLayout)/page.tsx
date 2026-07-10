"use client";
import React, { use, useEffect, useState } from "react";
import { MoveUp, CardSim } from "lucide-react";
import Model from "@components/Modal";
import { useForm, SubmitHandler } from "react-hook-form";
import { IScore } from "@/interface/IScore";
import { yupResolver } from "@hookform/resolvers/yup";
import { scoringSchema } from "@/schemas/Scoring.Schema";
import {
  getCandidateDetails,
  getCandidates,
  submitScore,
} from "@services/Candidates";
import { useSelector } from "react-redux";
import { ICandidaDetails } from "@/interface/Candidate";
import { getScoreStream } from "@services/Candidates";
import { useRouter } from "next/navigation";

const page = () => {
  const [candidateDetails, setCandidateDetails] = useState<any>();
  const [candidateScoreDetails, setCandidateScoreDetail] = useState<
    ICandidaDetails[]
  >([]);
  const [Loading, setLoading] = useState(false);
  const [progressInfo, setProgressInfo] = useState<string>();
  const { authUser } = useSelector((state: any) => state.authUser);
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(scoringSchema),
  });

  const [toggelmodal, setShowModal] = useState(false);
  const [candidateId, setCandidateId] = useState<number | string>(0);
  const [otherCandidates, setOtherCanidates] = useState<[]>([]);
  const router = useRouter();

  const showModal = (Id:string |number) => {
    setCandidateId(Id);
    setShowModal(true);
  };

  const onSubmit: SubmitHandler<IScore> = async (data) => {
    const result = await submitScore(candidateId, data);
    if (result.status == 200) {
      setShowModal(false);
    }
  };

  const onError = (error: any) => {
    console.log("error", error);
  };

  useEffect(() => {
    const getCandidateDetail = async () => {
      const result = await getCandidateDetails(authUser?.candidate_id);

      console.log("result", result);

      if (result.length > 0) {
        setCandidateDetails(result[0]);
      }
    };

    const otherCandidates = async () => {
      const getotherCandidates = await getCandidates();
      const paginationRemoved = getotherCandidates.filter(
        (item: any) => !item.pagination,
      );
      const otherCandidates = paginationRemoved.filter(
        (item: any) => item.email != authUser?.email,
      );
      setOtherCanidates(otherCandidates);
    };

    const callApi = async () => {
      await Promise.all([getCandidateDetail(), otherCandidates()]);
    };
    callApi();
  }, [authUser]);

  const onGetMessage = () => {
    setCandidateScoreDetail([]);
    const eventSource = new EventSource(
      `http://scoring.local/api/candidates/${authUser.candidate_id}/stream`,
    );
    setLoading(true);

    eventSource.onmessage = (event) => {
      const {message} = JSON.parse(event.data);
      if (message) {
        setCandidateScoreDetail((prev) => [...prev, message]);
      }
    };

    eventSource.onerror = (error) => {
      console.log("EventSource failed", error);
      eventSource.close();
      setProgressInfo("Connection closed-" + JSON.stringify(error));
        setLoading(false);
    };

    eventSource.addEventListener("end", (event) => {
      setProgressInfo("Stream ended -" + JSON.stringify(event));
      console.log("Stream ended", event);
      eventSource.close();
      setLoading(false);
    });

    eventSource.onopen = () => {
      setProgressInfo("connection opened");
    };
  };


  useEffect(()=>{
    onGetMessage();

  

  },[])

  return (
    <div className="px-30 py-8">
      <div className="flex flex-col space-y-14 rounded">
        <div className="flex w-full justify-between bg-slate-300 h-48">
          <div className="flex items-center space-x-8 p-10">
            <div
              className="h-32 w-32 rounded-full bg-red-600 bg-cover bg-center"
              style={{
                backgroundImage: "url('/profile/user-4.jpg')",
              }}
            ></div>
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-4 items-center ">
                <h1 className="text-xl ">{candidateDetails?.name}</h1>{" "}
                <span>{candidateDetails?.role}</span>
              </div>
              <span>{candidateDetails?.email}</span>
              <div className="flex space-x-4 w-full text-xs flex-wrap">
                {candidateDetails?.skill.map((item: string, index: number) => (
                  <span
                    key={index}
                    className="bg-blue-600 text-white p-2 rounded-full text-bs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="p-4 rounded bg-slate-300 ">
              <h1 className="font-semibold text-xl ">Scoring</h1>
              <div className="flex space-x-4 flex justify-between">
                <div className="flex flex-col">
                  <span>Your Score</span>

                  <div></div>
                </div>

                <div>
                  <span>Other Candidate</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow flex justify-between    w-full">
            <div className="your_scoring_table w-1/2    ">
              <table className=" w-full border">
                <thead className="p-2 bg-slate-500 ">
                  <tr className="p-2">
                    <td className="p-2 font-semibold">Category</td>
                    <td className="font-semibold">Score</td>
                  </tr>
                </thead>
                <tbody>
                  {candidateScoreDetails.map((item, index) => (
                    <tr
                      className={
                        index % 2 == 0
                          ? "p-2 border  bg-slate-100"
                          : "p-2 border  bg-yellow-100"
                      }
                      key={index}
                    >
                      <td className="p-2 text-gray-500">{item?.category}</td>
                      <td className="p-2 flex items-center text-gray-500">
                        <span>{item?.score}</span>
                        <MoveUp
                          absoluteStrokeWidth
                          size={16}
                          className="text-green-600 text-xs font-semibold"
                        />{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="other_candidate_scoring_table w-1/2">
              <table className="w-full">
                <thead className="p-2 bg-slate-500 ">
                  <tr className="p-2">
                    <td className="p-2 font-semibold">Name</td>
                    <td className="p-2 font-semibold">Email</td>
                    <td className="p-2 font-semibold">Action</td>
                  </tr>
                </thead>
                <tbody>
                  {otherCandidates?.length > 0 ? (
                    otherCandidates?.map((item:any, index) => (
                      <tr className="p-2 border bg-slate-100" key={index}>
                        <td className="p-2">{item.name}</td>
                        <td className="p-2">{item.email}</td>
                        <td className="p-2">
                          <div className=" h-5 w-8 rounded-full flex text-gray-500 items-center justify-center p-1 cursor-pointer">
                            <CardSim
                              onClick={() => showModal(item.candidate_id)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="p-2 border  bg-slate-100 text-center ">
                      {" "}
                      <td className="p-4" colSpan={4}>
                        No Record Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Model showModal={toggelmodal} className="w-96 h-fit">
        <div>
          <h1 className="text-center bg-slate-500 p-4  rounded-t text-sm">
            scoreing Form
          </h1>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="flex flex-col space-y-4 p-6">
              <div className="flex flex-col space-y-2">
                <label>Category</label>
                <input
                  {...register("category")}
                  type="text"
                  placeholder=""
                  className="flex h-10 w-full border rounded-lg px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:rounded-sm file:text-sm file:font-medium file:text-primary file:mr-5  focus-visible:outline-0"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label>Score</label>
                <input
                  {...register("score", { valueAsNumber: true })}
                  type="number"
                  placeholder=""
                  min={1}
                  max={5}
                  className="flex h-10 w-full border rounded-lg px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:rounded-sm file:text-sm file:font-medium file:text-primary file:mr-5  focus-visible:outline-0"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label>Notes</label>
                <textarea
                  {...register("note")}
                  rows={20}
                  placeholder=""
                  className="flex h-32 w-full border rounded-lg px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:rounded-sm file:text-sm file:font-medium file:text-primary file:mr-5  focus-visible:outline-0"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button className="bg-red-600 text-white p-2 rounded place-self-end">
                  Cancel
                </button>
                <button
                  className="bg-slate-500 text-white p-2 rounded"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </Model>
    </div>
  );
};

export default page;
