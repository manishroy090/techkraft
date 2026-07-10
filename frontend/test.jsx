










  <div className="w-full flex flex-col space-y-10">
      <div className="flex justify-between">
        <span className="font-semibold">Profile Details</span>
    

        <button className="bg-black text-white p-2 rounded">Generate AI Summary</button>
        </a>
      </div>

      <table className="bg-slate-100 shadow-md w-full rounded border ">
        {candidateDetails?.map((item:any) => (
          <tr className="border-gray-200 border-b">
            <td className="p-4 py-1 font-semibold text-sm  w-72">{item[0]}:</td>
            <td className="p-4 ">{item[1]}</td>
          </tr>
        ))}

        <tr className="">
          <td className="p-4 text-xl font-semibold" colSpan={2}>
            <div>
              <h1 className="border-b">
                Candidate Scores List Categories Wise{" "}
              </h1>
              <table className="text-sm  w-full ">
                <thead>
                  <tr>
                    <td className="p-2  p-3">Category</td>
                    <td className="w-26 text-center">Score</td>
                  </tr>
                </thead>
                <tbody>
                  {candidateScoreDetails?.length > 0 ? (
                    candidateScoreDetails?.map((item, index) => (
                      <tr key={index}>
                        <td className="p-2 border-b">{item.category}</td>
                        <td className="text-center border-b">{item.score}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>No Score of this user</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      </table>
    </div>