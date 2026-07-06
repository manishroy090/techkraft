import { FieldValues, UseFormRegister, Path } from "react-hook-form";

export interface ICandidaDetails {
  user_id: number;
  email: [];
  role: [];
  name: [];
  create_at: [];
  role_applied: [];
  skill: [];
  score: [];
  category: [];
}

export interface Icandidate {
  id: number;
  name: string;
  email: string;
  role_applied: string;
  status: string;
  skill: [];
}


