import React, { useState, useEffect,usec } from "react";
import ListItem from "./ListItem";

function ToDo() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  const handlechange = (e) => {
    setTask(e.target.value);
  };

  const addTask = () => {
    // create copy of current todos to newTodos variable
    const newTodos = todos.map((todo) => {
      return { ...todo };
    });
    // add new task to newTodos
    newTodos.push({
      value: task,
      isCompleted: false,
      id: new Date().getTime(),
    });

    // set todo with added task i.e newTodos
    setTodos(newTodos);
    setTask("");
  };

  const handleKeyDown = (e) => {
    // console.log(e)
    if (e.key === "Enter") addTask();
  };

  const toggleCheck = (index) => {
    // create copy of current todos to newTodos variable
    const newTodos = todos.map((todo) => {
      return { ...todo };
    });

    // toggle check uncheck
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };
  const deleteTask = (index) => {
    // create copy of current todos to newTodos variable
    const newTodos = todos.map((todo) => {
      return { ...todo };
    });

    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const count = () => {
    return todos.filter((todo) => todo.isCompleted === false).length;
  };

  const updateValue = (index, updatedValue) => {
    
      // create copy of current todos to newTodos variable
      const newTodos = todos.map((todo) => {
        return { ...todo };
      });
      newTodos[index].value = updatedValue;
      setTodos(newTodos);
  
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="w-full md:w-2/3 lg:w-2/3 xl:w-1/3 px-2 md:px-0 flex flex-col gap-4">
      <h1 className="text-center mb-8">
        {count() !== 0
          ? `You have ${count()} tasks pending `
          : `You have no pending task`}
      </h1>

      <div className="flex items-center justify-between gap-2">
        <input
          value={task}
          onChange={handlechange}
          onKeyDown={handleKeyDown}
          type="text"
          className="w-full bg-zinc-800 border-2 border-zinc-700 rounded-md px-3 py-2 text-sm sm:text-xl focus:outline-none"
        />
        <button
          onClick={addTask}
          className=" whitespace-nowrap  border-2 border-zinc-700 rounded-md px-3 py-2 text-sm sm:text-xl"
        >
          Add Task
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {todos.map((todo, index) => (
          <ListItem
            key={index}
            todo={todo}
            index={index}
            toggleCheck={toggleCheck}
            deleteTask={deleteTask}
            updateValue={updateValue}
          />
        ))}
      </div>
    </div>
  );
}

export default ToDo;
