import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { NavLink } from 'react-router-dom';
import DeleteTodo from './DeleteTodo';

const Completed = ({ search }) => {
  const [todos, setTodos] = useState([]);
  const token = Cookies.get('token');

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch(`/getcompletedtodo`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "token": token
          },
        });

        const data = await response.json();
        console.log('completed: ', data);
        if (Array.isArray(data.todos)) {
          setTodos(data.todos);
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }

    fetchTodos();
  }, [search, token]);

  const handledelete = (id) => {
    console.log('delete')
    setTimeout(()=> {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    }, 3000)
  }

  return (
    <>
      <div className="grid grid-cols-1 mt-3 ml-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
            <DeleteTodo onDelete={handledelete} todo={todo._id} />
            </div>
          </div>
        ))
        ) : (
          <div class="flex items-center justify-center h-screen">
          <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-300 dark:border-gray-700">
            <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-800">No Task is Completed</h5>

            <NavLink to="/" class="inline-flex mt-5 items-center text-white hover:underline">
              <button type="button" class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Go Back to Home</button>
            </NavLink>
          </div>
        </div>
      )}
      </div>
</>
  );
};

export default Completed;
