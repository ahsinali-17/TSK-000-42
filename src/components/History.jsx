import React, { useEffect, useState } from "react";
import { useFirebase } from "../Context/Firebase";
const History = () => {
  const { user, fetchHistoryFromFirebase, saveHistoryToFirebase } =
    useFirebase();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (user) {
      fetchHistoryFromFirebase().then((savedHistory) => {
        setHistory(savedHistory || []);
      });
    }
  }, [user, saveHistoryToFirebase]);

  return (
    <div>
      <button
        className="fixed z-10 inset-0 bg-red-500 text-black hover:text-white text-md font-semibold h-12 w-fit px-4 rounded-xl top-20 left-6"
        onClick={() => {
          saveHistoryToFirebase([]);
          setHistory([]);
        }}
      >
        Clear History
      </button>
      <h1 className="text-2xl font-bold text-center text-red-500 my-6">
        History
      </h1>
      <div className="flex flex-col items-center justify-center">
        {history.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 items-center justify-between w-4/5 p-2 my-2 bg-gray-200 rounded-md"
          >
            <p className="font-semibold text-xl w-[75%] text-balance">
              {item.text}
            </p>
            <p
              className={`${
                item.iscompleted ? "text-green-500" : "text-red-500"
              } font-semibold w-[15%]`}
            >
              {item.iscompleted ? "Completed" : "Not completed"}
            </p>
            <img
              src="/trash.svg"
              alt="delete"
              className="w-[10%] h-6 cursor-pointer"
              onClick={() => {
                let newHistory = history.filter((todo) => todo.id !== item.id);
                setHistory(newHistory);
                saveHistoryToFirebase(newHistory);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
