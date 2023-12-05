import React, { useState } from 'react';
import AddTaskModal from '../modals/AddTaskModal';

const AddTasks = () => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div className="flex mt-5 justify-center">
      <button
        type="button"
        className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        onClick={openModal}
      >
        Add Tasks
      </button>

      {open && <AddTaskModal closeModal={closeModal} />}
    </div>
  );
};

export default AddTasks;
