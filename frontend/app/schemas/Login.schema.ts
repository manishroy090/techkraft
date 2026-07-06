
import * as yup from "yup"

export const Loginschema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required").min(8, "Min 8 characters"),
}).required()