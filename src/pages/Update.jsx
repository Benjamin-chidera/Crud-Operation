import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Update = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const redirect = useNavigate();

  const url = `https://goalon.onrender.com/api/v1/goals/${id}`;

  const Update = async () => {
    try {
      const {
        data: { goal },
      } = await axios(url);

      if (goal) {
        setTitle(goal.title);
        setDescription(goal.description);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    Update();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(url, { title, description });

      if (res) {
        toast.success("Updated SuccessFully");
        redirect("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-[60vh] border w-fit p-10 mx-auto">
      <ToastContainer />
      <form onSubmit={handleUpdate}>
        <div>
          <input
            type="text"
            className=" w-[400px] p-2 rounded-md outline-none bg-transparent border"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <input
            type="text"
            className=" w-[400px] p-2 rounded-md outline-none bg-transparent border"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <button className=" border p-3 shadow-inner rounded-md">
            <FaEdit />
          </button>
        </div>
      </form>
    </div>
  );
};
