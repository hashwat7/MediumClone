import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/Blogcard";
import { BlogSkeleton } from "../components/BlogSkleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  console.log(blogs[0]);

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div>
          Hey
          {blogs &&
            blogs.map((blog) => (
              <BlogCard
                id={blog.id}
                authorName={blog.author || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate={"2nd Feb 2024"}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
