const Userscards = ({totalDoctor,totalnurse,totalreceptionist,totalaccount}:{totalDoctor:number | string,totalnurse:number | string,totalreceptionist:number | string,totalaccount:number | string}) => {

  return (

    <div className="grid grid-cols-4 gap-4">

      <div className=" rounded-md p-8 shadow bg-white flex  justify-between ">
        <div className="flex flex-col">
          <span className="font-semibold text-bs">Total Doctors</span>
          <span className="font-bold text-xl text-[#14967f] ">{totalDoctor}</span>
        </div>
        <div className=" h-14 w-14">
          <img src={"/hrm_image/doctor.png"} alt="logo" className="w-full" />
        </div>
      </div>

      <div className=" rounded-md p-8 shadow bg-white flex  justify-between ">
        <div className="flex flex-col">
          <span className="font-semibold text-bs">Total Nurses</span>
          <span className="font-bold text-xl text-[#14967f] ">{totalnurse}</span>
        </div>
        <div className=" h-14 w-14">
          <img src={"/hrm_image/nurse.png"} alt="logo" className="w-full" />
        </div>
      </div>

      <div className=" rounded-md p-8 shadow bg-white flex  justify-between ">


        <div className="flex flex-col">
          <span className="font-semibold text-bs">Total Receptionist</span>
          <span className="font-bold text-xl text-[#14967f] ">{totalreceptionist}</span>
        </div>
        <div className=" h-14 w-14">
          <img src={"/hrm_image/receptionist.png"} alt="logo" className="w-full" />
        </div>
      </div>


      <div className=" rounded-md p-8 shadow bg-white flex  justify-between ">
         <div className="flex flex-col">
          <span className="font-semibold text-bs">Total Accountant</span>
          <span className="font-bold text-xl text-[#14967f] ">{totalaccount}</span>
        </div>
        <div className=" h-14 w-14">
          <img src={"/hrm_image/accountant.png"} alt="logo" className="w-full" />
        </div>
      </div>

    </div>
  )
}


export default Userscards;