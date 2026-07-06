
import toast, { Toaster } from 'react-hot-toast';

export default function  useToaster(){


    function success(){
        console.log("Success");

    }



    function error(message:any){

       toast.error(message,{
          position: 'top-right',
       });


    }


    function warning(){

       console.log("Warning");


    }



    return {
        success,
        error,
        warning
    }
}