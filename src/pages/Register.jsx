import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalContext } from "../hook/useGlobalContext";
import axios from "axios";

export const Register = () => {
  const { BASE_URL } = useGlobalContext();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setClicked(true);

    if (!user.email || !user.password || !user.name) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const { data } = await axios.post(`${BASE_URL}/register`, { ...user });

      if (data) {
        setClicked(false);
        toast.success("Successful Registration");
        navigate("/login");
        setUser({
          name: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      setClicked(false);
      console.log(error);
      toast.error(error.response?.data?.msg);
    }
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Username"
            className="p-2 w-[400px] text-gray-800"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-2 w-[400px] mt-5 text-gray-800"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-2 w-[400px] mt-5 text-gray-800"
            value={user.password}
            onChange={handleChange}
          />
        </div>

        <button className=" border py-1 px-5 rounded-md mt-5">
          {clicked ? "Signing Up" : "Register"}
        </button>
      </form>

      <h1 className="my-3">Already have an account?</h1>
      <Link to={"/login"} className="">
        Login Here
      </Link>
    </div>
  );
};
