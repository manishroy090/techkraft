import { Axios } from "@/libs/axios";
import { IScore } from "@/interface/IScore";
import { getCookieServer } from "@/utils/cookies";
import { EventSource } from "extended-eventsource";

export const getCandidates = async (filterdata = {}) => {
  console.log("filterdata", filterdata);

  const result = Axios.get("/candidates/", {
    params: {
      ...filterdata,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log("error", error);
    });

  return result;
};

export const getCandidateDetails = async (id: string | number) => {
  const candidatesDetails = Axios.get(`/candidates/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log("error", error);
    });

  return candidatesDetails;
};

export const submitScore = async (id: string | number, body: IScore) => {
  return await Axios.post(`/candidates/${id}/scores`, body);
};

export const getAiSummaryResult = async (
  id: string | number | undefined,
  onMessage: (data: any) => void,
) => {
  return Axios.post(
    `/candidates/${id}/summary`,
    {},
    {
      onDownloadProgress: (progressEvent) => {
        const response = progressEvent.event.target.response;
        let message = "";
        const events = response.split("\r\n");
        const filterevent = events.filter(
          (item: any) =>
            item != "data: connected" &&
            item != "event: info" &&
            item != "retry: 10000" &&
            item != "",
        );
        if (filterevent.length > 0) {
          const eventWithData = filterevent.filter((item: any) =>
            item.startsWith("data:"),
          );
          message = eventWithData.map((item: any) => {
            const data = item.replace("data:", "");
            const parsed = JSON.parse(data);
            onMessage(parsed);
          });
        }

        return message;
      },
    },
  )
    .then((res) => {
      console.log("res", res);
    })
    .catch((error) => {});
};

export const getScoreStream = async(id: string | number) => {


  const getToken = async () => {
    return await getCookieServer("token");
  };

  const token = await getToken();

  const eventSource = new EventSource(
    `http://scoring.local/api/candidates/${id}/stream`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      retry: 3000,
    },
  );


  return  eventSource
};
