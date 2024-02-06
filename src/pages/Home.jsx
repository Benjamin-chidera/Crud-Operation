import { BsFillSave2Fill } from "react-icons/bs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalContext } from "../hook/useGlobalContext";
import { Goals } from "./Goals";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Home = () => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    handleSubmit,
    items,
    setSearch,
  } = useGlobalContext();

  const [seen, setSeen] = useState("")

  const token = localStorage.getItem("token");

  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.reload()
  };

  const handleSearch = (e) => {
    e.preventDefault()
    setSearch(seen)
  }

  console.log(seen);

  return (
    <div>
      <form className=" text-center">
        <input
          type="text"
          className="w-[400px] p-2 rounded-md outline-none bg-transparent border mb-5"
          placeholder="Search..."
          value={seen}
          onChange={(e) => setSeen(e.target.value)}
        />
        <button
          className="ms-3 border py-1 px-5 rounded-md"
          onClick={handleSearch}
        >
          Search
        </button>
      </form>

      {token ? (
        <div className=" text-end">
          {" "}
          <button
            className=" border py-1 px-5 rounded-md"
            onClick={handleLogOut}
          >
            LogOut
          </button>
        </div>
      ) : (
        <div className="flex justify-center gap-20 mb-5">
          <Link to={"/register"} className=" border py-1 px-5 rounded-md">
            Register
          </Link>
          <Link to={"/login"} className=" border py-1 px-5 rounded-md">
            Login
          </Link>
        </div>
      )}

      <ToastContainer position="bottom-left" />
      <form onSubmit={handleSubmit}>
        <div className=" flex justify-center gap-10 items-center mb-3">
          <div>
            <input
              type="text"
              placeholder="Title..."
              className=" w-[400px] p-2 rounded-md outline-none bg-transparent border"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Description..."
              className=" w-[400px] p-2 rounded-md outline-none bg-transparent border"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <button className=" border p-3 shadow-inner rounded-md">
              <BsFillSave2Fill />
            </button>
          </div>
        </div>
        <hr />
      </form>
      <h1 className="text-center font-bold my-3 text-3xl">
        {items.length < 1 ? "Please Add Goals" : `Goal (${items.length})`}
      </h1>
      <Goals items={items} />
    </div>
  );
};
