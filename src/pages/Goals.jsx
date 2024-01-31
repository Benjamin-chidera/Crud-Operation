import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useGlobalContext } from "../hook/useGlobalContext";
import { Link } from "react-router-dom";

export const Goals = ({ items }) => {
  const { handleDelete } = useGlobalContext();

  const token = localStorage.getItem("token")


  return (
    <div className="m-5">
      {items.map((item) => {
        const { title, description, _id } = item;

        return (
          <div
            key={_id}
            className="flex justify-between gap-5 items-center space-y-6"
          >
            <h1 className=" capitalize font-bold text-3xl">{title}</h1>
            <p className=" capitalize font-semibold text-xl">{description}</p>
            <div className="flex gap-10">
              <Link
              
                to={`/update/${_id}`}
                className=" border p-3 shadow-inner rounded-md"
                
              >
                <FaEdit />
              </Link>
              <button
              disabled={!token}
                className=" border p-3 shadow-inner rounded-md"
                onClick={() => handleDelete(_id)}
              >
                <MdDeleteForever />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
