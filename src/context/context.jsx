/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");

  const BASE_URL = "https://goalon.onrender.com/api/v1/goals";

  const url = `${BASE_URL}?title=${search}`;

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      return toast.error("Please fill all inputs");
    }

    try {
      await axios.post(
        BASE_URL,
        {
          title,
          description,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Created Successfully");
      window.location.reload();
    } catch (error) {
      console.log(error.message);
      toast.error(
        "Failed to create goal please login or check your internet connection"
      );
    }

    setTitle("");
    setDescription("");
  };

  const getData = async () => {
    try {
      const res = await axios(url);

      setItems(res.data.goal);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [search]);

  const handleDelete = async (_id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res) {
        toast.success("Deleted Successfully");
        window.location.reload();
        return;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  

  return (
    <AppContext.Provider
      value={{
        title,
        setTitle,
        description,
        setDescription,
        handleSubmit,
        items,
        setItems,
        handleDelete,
        BASE_URL,
        setSearch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
