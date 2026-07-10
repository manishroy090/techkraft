"use client";
import { Eye } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCandidateDetails } from "@services/Candidates";
import { useScroll } from "framer-motion";
import { ICandidaDetails } from "@/interface/Candidate";
import { MoveUp, CardSim } from "lucide-react";
import { getScoreStream } from "@services/Candidates";

const page = () => {
  const params = useParams<{ id: string }>();
  const [candidateDetails, setCandidateDetails] = useState<any>();
  const [candidateScoreDetails, setCandidateScoreDetail] = useState<ICandidaDetails[]>([]);
  const [Loading, setLoading] = useState(false);
  const [progressInfo, setProgressInfo] = useState<string>();
  
  const { id } = params;

    const onGetMessage = async() => {
    const eventSource = await getScoreStream(id)
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


  useEffect(() => {
    const getCandidateDetail = async () => {
      const result = await getCandidateDetails(id);
      if (result) {
        setCandidateDetails(result[0]);
      }
    };
 
      onGetMessage();

    getCandidateDetail();
  }, []);

  useEffect(() => {
    console.log(candidateScoreDetails);
  }, [candidateScoreDetails]);

  return (
    <div className="px-30 py-8">
      <div className="flex flex-col space-y-14 rounded">
        <div className="flex w-full justify-between bg-slate-300 h-48 p-12">
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
          <a href={`/summary/${id}`}>
            <button className="bg-slate-500 text-white p-2 rounded h-fit ">
              Generate AI Summary
            </button>
          </a>
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
            <div className="your_scoring_table w-full">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
