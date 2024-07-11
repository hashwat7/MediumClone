import { Appbar } from "../components/Appbar";
import { useState } from "react";
import { BlogCard } from "../components/Blogcard";
import { BlogSkeleton } from "../components/BlogSkleton";
import { useBlogs } from "../hooks";
const BLOGS_PER_PAGE = 4;
export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  const [visibleBlogs, setVisibleBlogs] = useState<number>(BLOGS_PER_PAGE);

  const loadMoreBlogs = () => {
    setVisibleBlogs((prevVisibleBlogs) => prevVisibleBlogs + BLOGS_PER_PAGE);
  };

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div>
          {loading ? (
            <>
              <BlogSkeleton />
              <BlogSkeleton />
              <BlogSkeleton />
              <BlogSkeleton />
              <BlogSkeleton />
            </>
          ) : (
            <>
              {blogs.slice(0, visibleBlogs).map((blog) => (
                <BlogCard
                  key={blog.id}
                  id={blog.id}
                  authorName={blog.author || "Anonymous"}
                  title={blog.title}
                  content={blog.content}
                  publishedDate={"2nd Feb 2024"} // Adjust accordingly
                />
              ))}
              {visibleBlogs < blogs.length && (
                <button
                  onClick={loadMoreBlogs}
                  className="mt-2 mb-2 p-1 bg-gray-600 text-white rounded"
                >
                  Load More...
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
