import React, { useState } from 'react'
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CompletedCheckbox = ({ onComplete, todo }) => {

  const [isChecked, setIsChecked] = useState(false); 
  console.log("todo id: ", todo)
  const token = Cookies.get('token');

  const complete = async () => {
    setIsChecked(true)
    try {
      const resp = await fetch(`/completetodo/${todo}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "token": token
        }
      });

      const data = await resp.json();

      if (resp.status === 400) {
        toast.error(data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.success(data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        onComplete(todo)
      }
    } catch (error) {

      console.error("Error performing soft delete:", error);
      
    } finally {
      setIsChecked(false);
    }
  }
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    
      <div className="flex items-center w-32 h-12 ps-4 ml-3 border border-gray-200 rounded dark:border-gray-700">
        <input
          id={`bordered-checkbox-${todo}`}
          type="checkbox"
          value=""
          checked={isChecked}
          onChange={complete}
          name={`bordered-checkbox-${todo}`}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor={`bordered-checkbox-${todo}`}
          className="w-full py-4 ms-2 px-3 text-sm font-medium text-gray-900"
        >
          Completed
        </label>
      </div>
    </>
  )
}

export default CompletedCheckbox