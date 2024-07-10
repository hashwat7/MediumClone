import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BackEndURL } from "../config.ts";
export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState({
    username: "",
    name: "",
    password: "",
  });
  const [error, setError] = useState("");

  const url = `${BackEndURL}/api/v1/${type === "signup" ? "signup" : "signin"}`;

  console.log("to send is " + postInputs);
  console.log(url);
  async function sendRequestSignup() {
    console.log(BackEndURL);
    try {
      const response = await axios.post(`${url}`, {
        email: postInputs.username,
        name: postInputs.name,
        password: postInputs.password,
      });
      const data = response.data;
      localStorage.setItem("token", `Bearer ${data.jwt}`);
      navigate("/blogs");
    } catch (e) {
      console.log(e);
      alert();
      // alert the user here that the request failed
    }
  }

  async function sendRequestSignin() {
    console.log(BackEndURL);
    try {
      const response = await axios.post(`${url}`, {
        email: postInputs.username,
        password: postInputs.password,
      });
      const data = response.data;
      localStorage.setItem("token", `Bearer ${data.jwt}`);
      navigate("/blogs");
    } catch (e: any) {
      setError(e.response.data.error);
      // alert the user here that the request failed
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">Create an account</div>
            <div className="text-slate-500">
              {type === "signin"
                ? "Don't have an account?"
                : "Already have an account?"}
              <Link
                className="pl-2 underline"
                to={type === "signin" ? "/signup" : "/signin"}
              >
                {type === "signin" ? "Sign up" : "Sign in"}
              </Link>
            </div>
          </div>
          <div className="pt-8">
            {type === "signup" ? (
              <LabelledInput
                label="Name"
                placeholder="Harkirat Singh..."
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    name: e.target.value,
                  });
                }}
              />
            ) : null}
            <LabelledInput
              label="Username"
              placeholder="harkirat@gmail.com"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  username: e.target.value,
                });
              }}
            />
            <LabelledInput
              label="Password"
              type={"password"}
              placeholder="123456"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
            <button
              onClick={
                type === "signup" ? sendRequestSignup : sendRequestSignin
              }
              type="button"
              className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === "signup" ? "Sign up" : "Sign in"}
            </button>
            {error ? <div>{error}</div> : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm text-black font-semibold pt-4">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}