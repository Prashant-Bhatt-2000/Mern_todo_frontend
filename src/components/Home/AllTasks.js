import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { NavLink } from 'react-router-dom';
import SoftDeleteButton from '../Tasks/SoftDeleteButton';
import CompletedCheckbox from '../Tasks/CompletedCheckbox';

const AllTasks = ({ search }) => {
  const [todos, setTodos] = useState([]);
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`/gettodos/?search=${search}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "token": token
          },
        });

        const data = await response.json();
        console.log(data.todos);
        if (Array.isArray(data.todos)) {
          setTodos(data.todos);
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    const intervalId = setInterval(fetchTodos, 1000);
    return () => clearInterval(intervalId);

  }, [search, token]);

  const handleSoftdelete = (id) => {
    console.log('softdelete');
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
  };

  const handleCompleted = (id) => {
    console.log('completed');
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
  };

  return (
    <div className="flex justify-center items-center mt-6 ml-40">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {todos.length > 0 ? (
          todos.map((todo, index) => (
            <div key={index} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-300 dark:border-gray-700">
              <NavLink to={`/${todo.id}`}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-600">
                  {todo.title}
                </h5>
              </NavLink>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-700">
                {todo.description}
              </p>
              <div className="flex">
                <SoftDeleteButton onDelete={handleSoftdelete} todo={todo._id} />
                <CompletedCheckbox onComplete={handleCompleted} todo={todo._id}/>
              </div>
            </div>
          ))
        ) : (
          <div className="notasks max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-300 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-800">No Tasks Found Create one By clicking on Add Tasks Button</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTasks;
