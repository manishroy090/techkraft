"use client";
import { Eye } from "lucide-react";
import { getCandidates } from "@services/Candidates";
import { useEffect, useState } from "react";

const page = () => {
  const [candidates, setCandidate] = useState([]);

  useEffect(() => {


    const getAllCandidatesDetails = async () => {
      const result = await getCandidates();
      console.log(result)
      setCandidate(result);
    };


    getAllCandidatesDetails();
  }, []);


  return (
    <div className="flex flex-col space-y-10">
      <div className=" ">
        <div className="flex flex-col items-center justify-center bg-blue-400 h-26 w-52 ">
          <span className="text-xl font-semibold">Total Candidates</span>
          <span className="font-semibold">200</span>
        </div>
      </div>
      <span className="font-semibold text-xl">Candidates List</span>
      <div className=" p-2 shadow-md bg-slate-200 rounded">
        <table className="w-full">
          <thead>
            <tr>
              <td className="text-left">Name</td>
              <td className="text-left">Email</td>
              <td className="text-left">Role Applied</td>
              <td className="text-left">Status</td>
              <td>Action</td>
            </tr>
          </thead>

          <tbody>
            {candidates?.length > 0 ? (
              candidates?.map((item: any, index: any) => (
                <tr className="border-b border-gray-300" key={index}>
                  <td className="text-center p-2 text-left">{item.name}</td>
                  <td className="text-center p-2 text-left">{item.email}</td>
                  <td className="text-center p-2 text-left text-left"> Full Stack</td>
                  <td className="text-center p-2 text-left">Applied</td>
                  <td className="text-center p-2">
                    <a href={`/admin/candiates/details/${item.candidate_id}`}>
                      <div className="bg-black p-2 h-8 w-8 rounded-full flex items-center justify-center">
                        <Eye className="text-white text-2xl " />
                      </div>
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <>
                <tr className="border-b border-gray-300 p-4">
                  <td colSpan={4} className="p-8 text-center">No Record Found</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
