import * as yup from "yup"

 export const scoringSchema =yup.object({
    category:yup.string().required("Category is required"),
    score:yup.number().required("Score is required"),
    note:yup.string().optional()
 })