import { useEffect, useState } from "react";

const Pagination = ({
  handlePagination,
  pageSize,
  handlePerPagePagination
}: {
  handlePagination: (index:number) => void;
  pageSize: number;
  handlePerPagePagination:(perPage:number)=>void
}) => {


  const [currentpage, setCurrentPage] = useState<number>(1);
  const [perPagesOption,setPerPagesOption] = useState([10,25,50,100])
  const [PerPage,setPerPages] = useState<number|string>(20);
  const pageOnClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  

  const handlePerPage = (event:any) =>{
    const value = event.target.value
    setPerPages(value)
    handlePerPagePagination(Number(value))
  }


  useEffect(()=>{
    handlePagination(currentpage)
  },[currentpage])


  const pages = () => {
    let elements = [];

    for (let index = 1; index <= (pageSize/2); index++) {
      elements.push(
        <li key={index}>
          <a
            href="#"
            onClick={() => pageOnClick(index)}
            className="flex items-center justify-center text-body bg-neutral-secondary-medium border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading shadow-xs font-medium leading-5 text-sm w-9 h-9 focus:outline-none"
          >
            {index}
          </a>
        </li>,
      );
    }


    return elements;

  };




  return (
    <nav
      aria-label="Page navigation example bg-red-600 absolute top-0 left-0 right-0"
      className="flex items-center space-x-4"
    >
      <ul className="flex -space-x-px text-sm">
        <li>
          <a
            href="#"
            onClick={() => setCurrentPage((prev: number) =>prev!=1 ? prev - 1 :prev)}
            className="flex items-center justify-center text-body bg-neutral-secondary-medium border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading shadow-xs font-medium leading-5 rounded-s-base text-sm px-3 h-9 focus:outline-none"
          >
            Previous
          </a>
        </li>

        {pages()}

        <li>
          <a
            href="#"
            onClick={() => setCurrentPage((prev: number) =>prev!=pageSize/2 ? prev + 1 : prev)}
            className="flex items-center justify-center text-body bg-neutral-secondary-medium border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading shadow-xs font-medium leading-5 rounded-e-base text-sm px-3 h-9 focus:outline-none"
          >
            Next
          </a>
        </li>
      </ul>
      <form className="w-32 mx-auto">
        <label className="sr-only">Select an option</label>
        <select
          name="perpage"
          id="countries"
          onChange={handlePerPage}
          className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm leading-4 rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
        >
          {perPagesOption.map((item,index)=>(
                 <option value={item} key={index}>{item} per page</option>
            ))}
        </select>
      </form>
    </nav>
  );
};

export default Pagination;
