  const eventSource = new EventSource("http://scoring.local/api/candidates/1/stream");

    eventSource.onerror = (error)=>{
      console.log("EventSource failed:",error)
       eventSource.close()
       setLoading(false)
      
    }


    eventSource.onmessage = (event) =>{
      let {message} = JSON.parse(event.data)
      setCandidateScoreDetail((prev)=>[...prev,message])
     
    }


    return () =>{
      eventSource.close()
    }

