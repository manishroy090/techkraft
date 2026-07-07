"use client";
import { Eye } from "lucide-react";
import { getCandidates } from "@services/Candidates";
import { useEffect, useState } from "react";
import Filter from "@/components/Filter";
import { Icandidate } from "@/interface/Candidate";
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  Controller,
} from "react-hook-form";

const page = () => {
  const { register, handleSubmit, reset } = useForm();

  const [candidates, setCandidate] = useState<[]>([]);
  const [status, setStatus] = useState<string[]>([]);
  const [roleslist, setroleappliedlist] = useState<string []>([]);
  const [skillslist, setSkill] = useState<string []>([]);
  const [filterclear,setFilterclear] = useState(false);

  useEffect(() => {
    const getAllCandidatesDetails = async () => {
      const result = await getCandidates();
      setCandidate(result);
    };

    getAllCandidatesDetails();
  }, [filterclear]);

  useEffect(() => {
    const role_appliedData = candidates.map((item:Icandidate) => item.role_applied);
    const statusData = candidates.map((item:Icandidate) => item.status);
    const roles_appliedList = [...new Set(role_appliedData)];
    const statusdList = [...new Set(statusData)];
    const skillData = candidates.map((item:Icandidate) => item.skill);
    const skillsArray = skillData.map((item) => item);
    const skills = skillsArray.map((item:string[]) => item[0]);
    const skillsList = [...new Set(skills)];

    setStatus(statusdList);
    setroleappliedlist(roles_appliedList);
    setSkill(skillsList);
  }, [candidates]);

  const applyFilter = async (data:any) => {
    console.log("data",data)
    const filerData = Object.entries(data);
    const result = await getCandidates(data);
    setCandidate(result);
  };

  const resetfilter = () => {
    setFilterclear(pre =>!pre)
    reset();
  };

  return (
    <div className="flex flex-col space-y-10">
      <div className=" ">
        <div className="flex flex-col items-center justify-center bg-blue-400 h-26 w-52 ">
          <span className="text-xl font-semibold">Total Candidates</span>
          <span className="font-semibold">{candidates.length}</span>
        </div>
      </div>
      <div className="flex justify-between">
        <span className="font-semibold text-xl">Candidates List</span>
        <Filter rest={() => resetfilter()}>
          <form onSubmit={handleSubmit(applyFilter)}>
            <div>
              <label>Status</label>
              <select
                className="w-full border rounded-md h-10 px-3"
                {...register("status")}
              >
                <option disabled>select Status</option>
                {status.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Role Applied</label>
              <select
                className="w-full border rounded-md h-10 px-3"
                {...register("role_applied")}
              >
                <option  disabled>select Role</option>
                {roleslist.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Skill</label>
              <select
                className="w-full border rounded-md h-10 px-3"
                {...register("skill")}
              >
                <option disabled>select Status</option>
                {skillslist.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Keyword</label>
              <input type="text" {...register("keyword")}></input>
            </div>
            <button type="submit" className="bg-black text-white p-2">
              Apply
            </button>
          </form>
        </Filter>
      </div>
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
                  <td className="text-center p-2 text-left text-left">
                    {item.role_applied}
                  </td>
                  <td className="text-center p-2 text-left">{item.status}</td>
                  <td className="text-center p-2">
                    <a href={`/admin/candidates/details/${item.candidate_id}`}>
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
                  <td colSpan={4} className="p-8 text-center">
                    No Record Found
                  </td>
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
