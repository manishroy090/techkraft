import { Axios } from "@/libs/axios";

export const getCandidates = async (filterdata) => {
  console.log("filterdata",filterdata)
  
  const result = Axios.get("candidates/",{
    params:{
       ...filterdata
    }
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log("error", error);
    });

  return result;
};

export const getCandidateDetails = async (id) => {
  const candidatesDetails = Axios.get(`/candidates/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log("error", error);
    });

  return candidatesDetails;
};

export const getAiSummaryResult = async (id,onMessage:(data:any)=>void) => {
  return Axios.post(
    `/candidates/${id}/summary`,
    {},
    {
      onDownloadProgress: (progressEvent) => {
        const response = progressEvent.event.target.response;
        let message ="";
        const events = response.split("\r\n");
        const filterevent = events.filter((item)=>item!='data: connected' && item!='event: info' && item!='retry: 10000' && item!='')
        if(filterevent.length>0){
          const eventWithData = filterevent.filter((item)=>item.startsWith("data:"));
            message =  eventWithData.map((item)=>{
            const data = item.replace("data:","")
            const parsed = JSON.parse(data)
            onMessage(parsed);
           
          })
          
        }

        return message
     
   
      },
    },
  )
    .then((res) => {
      console.log("res", res);
    })
    .catch((error) => {});

 
};

const summariesContent = () => {};
