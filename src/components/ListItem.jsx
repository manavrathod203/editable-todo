import React, {useState,memo } from "react";

function ListItem({ todo, index, toggleCheck, deleteTask, updateValue }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedValue, setUpdatedValue] = useState(todo.value);

  return (
    <div className="flex items-center gap-2 w-full ">
      <div
        className={`bg-zinc-800 border-2 border-zinc-700 rounded-md px-3 py-2 text-base sm:text-xl flex items-center gap-2 w-full ${
          todo.isCompleted === true && "opacity-25"
        }`}
      >
        <i
          onClick={() => toggleCheck(index)}
          className={`${
            todo.isCompleted === false
              ? "ri-checkbox-blank-line"
              : "ri-checkbox-line"
          }`}
        ></i>

        {!isEditing ? (
          <p
            className={`w-full bg-zinc-800  text-sm sm:text-xl focus:outline-none ${
              todo.isCompleted === true && "line-through"
            }`}
          >
            {todo.value}
          </p>
        ) : (
          <input
            value={updatedValue}
            onChange={(e) => setUpdatedValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateValue(index, updatedValue);
                setIsEditing(false);
              }
            }}
            type="text"
            className={`w-full bg-zinc-800  text-sm sm:text-xl  focus:outline-none ${
              todo.isCompleted === true && "line-through"
            }`}
          />
        )}
      </div>
      {!todo.isCompleted && !isEditing && (
        <div
          onClick={() => setIsEditing(true)}
          className="border-2 border-zinc-700 rounded-md px-3 py-2 text-sm sm:text-xl"
        >
          <i className="ri-pencil-line" />
        </div>
      )}

      <button
        onClick={() => deleteTask(index)}
        type="button" 
        disabled={isEditing}
        className="border-2 border-zinc-700 rounded-md px-3 py-2 text-sm sm:text-xl"
      >
        <i className="ri-delete-bin-7-line" />
      </button>
    </div>
  );
}
export default memo(ListItem);
