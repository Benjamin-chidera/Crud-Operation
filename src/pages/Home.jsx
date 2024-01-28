import { BsFillSave2Fill } from "react-icons/bs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalContext } from "../hook/useGlobalContext";
import { Goals } from "./Goals";

export const Home = () => {
  const { title, setTitle, description, setDescription, handleSubmit, items } =
    useGlobalContext();

  return (
    <div>
      <ToastContainer position="bottom-left" />
      <form onSubmit={handleSubmit}>
        <div className=" flex justify-center gap-10 items-center mb-3">
          <div>
            <input
              type="text"
              placeholder="Title"
              className=" w-[400px] p-2 rounded-md outline-none bg-transparent border"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Description"
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
