import { useEffect, useState } from "react";
import axios from "axios";
import { BackEndURL } from "../config";

export interface Blog {
  id: number;
  title: string;
  content: string;
  author: string;
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    axios
      .get(`${BackEndURL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlog(response.data.post);
        setLoading(false);
      });
  }, [id]);

  return {
    loading,
    blog,
  };
};
export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const url = `${BackEndURL}/api/v1/blog/bulk`;

  useEffect(() => {
    const fetchdata = async () => {
      axios
        .get(url, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setBlogs(response.data);
          setLoading(false);
        });
    };
    fetchdata();
  }, []);

  return {
    loading,
    blogs,
  };
};

export const useGetUserName = () => {
  const [user, setUser] = useState("Anonymous");
  const url = `${BackEndURL}/api/v1/blog/userName`;

  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get(url, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setUser(res.data);
    };
    fetchdata();
  }, []);

  return user;
};

export const useGetAuthor = (id: number) => {
  const url = `${BackEndURL}/api/v1/blog/author_name/${id}`;
  const [author, setAuthor] = useState("");
  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get(url, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setAuthor(res.data.name);
    };
    fetchdata();
  }, []);

  return author;
};
