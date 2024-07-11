import { Link } from "react-router-dom";
import { Avatar } from "./Blogcard";
import { useGetUserName } from "../hooks";

export const Appbar = () => {
  const user = useGetUserName();
  console.log(user);
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <Link
        to={"/blogs"}
        className="flex tracking-tighter font-noe-display text-4xl font-bold flex-col justify-center cursor-pointer"
      >
        Medium
      </Link>
      <div>
        <Link to={`/publish`}>
          <button
            type="button"
            className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
          >
            Publish +
          </button>
        </Link>

        <Link to={`/profile`}>
          <Avatar size={"big"} name={user} />
        </Link>
      </div>
    </div>
  );
};
