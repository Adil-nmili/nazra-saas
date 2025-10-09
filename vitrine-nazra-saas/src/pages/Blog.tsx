import React, { useEffect, useState } from "react";
import blogsData from "../constants/blogs.json";
import Logo from "../components/Logo";
import { FiThumbsUp,FiThumbsDown, FiMessageCircle ,FiShare} from "react-icons/fi"
import Modal from "../components/Modal";
import SignIn from "../components/GetStarted/SignIn";
interface BlogInt {
  id: number;
  title: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  category: string;
}

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogInt[]>([]);

  useEffect(() => {
    setBlogs(blogsData);
  }, []);

  const [isOpen,setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#B7E4C7] to-white text-[#081c15] p-4 py-10 flex justify-center">
      <div className="max-w-6xl w-full flex flex-col-reverse md:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-mint2 mb-8 text-[#081C15]">Nazra Blog</h1>
          {blogs.map((blog) => (
<div
  key={blog.id}
  className="mb-2 border-b bg-white border-gray-200 pb-6 p-4 rounded-lg transition hover:bg-[#D8F3DC] relative"
>
  <h2 className="text-xl md:text-2xl font-semibold text-dark_green mb-2 hover:text-mint2 cursor-pointer hover:underline text-[#081C15]">
    {blog.title}
  </h2>
  <p className="text-[#1B4332] mb-2">{blog.excerpt}</p>
  <div className="flex flex-col md:flex-row justify-between gap-4 ">
  <div className="flex items-center text-sm text-brunswick_green gap-4">
    <span>{blog.date}</span>
    <span>• {blog.author}</span>
    <span>• {blog.category}</span>
  </div>

  <div className=" flex items-center gap-4">
    <button className="flex items-center gap-1 text-[#2D6A4F] hover:bg-[#B7E4C7] px-2 py-1 rounded-lg cursor-pointer  transition">
      <FiThumbsUp size={18} />
      <span>{blog?.likes || 0}</span>
    </button>
    <button className="flex items-center gap-1 hover:bg-[#B7E4C7] px-2 py-1 rounded-lg text-[#2D6A4F] cursor-pointer  transition">
      <FiThumbsDown size={18} />
      <span>{blog?.likes || 0}</span>
    </button>
    <button className="flex items-center gap-1 hover:bg-[#B7E4C7] px-2 py-1 rounded-lg text-[#2D6A4F] cursor-pointer  transition">
      <FiMessageCircle size={18} />
      <span>{blog?.comments || 0}</span>
    </button>
        <button className="flex items-center gap-1 hover:bg-[#B7E4C7] px-2 py-1 rounded-lg text-[#2D6A4F] cursor-pointer  transition">
      <FiShare size={18} />
      <span>{blog?.comments || 0}</span>
    </button>
  </div>

  </div>
</div>
          ))}
        </div>

<div className=" w-full md:w-80 md:sticky top-20 flex-shrink-0 bg-white rounded-xl shadow-md p-6 h-fit">
  <div className="flex flex-col items-center text-center">
    <div className="w-16 h-16 bg-nyanza-400 rounded-full flex items-center justify-center mb-4">
      <Logo/>
    </div>
    <h3 className="font-semibold text-dark_green text-lg mb-2">Nazra Store</h3>
    <p className="text-gray-700 text-sm mb-4">
      We give superpowers to online shops. Our SaaS platform offers the easiest way to manage your e-commerce.
    </p>

<div className="flex flex-col gap-2 w-full mb-4">
  <a
    href="https://facebook.com"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center w-full py-2 rounded-lg border border-blue-600 hover:bg-blue-50 transition"
  >
    <img
      src="https://img.icons8.com/color/24/000000/facebook.png"
      alt="Facebook"
      className="w-5 h-5 mr-2"
    />
    Facebook
  </a>



  <a
    href="https://instagram.com"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center w-full py-2 rounded-lg border border-pink-500 hover:bg-pink-50 transition"
  >
    <img
      src="https://img.icons8.com/color/24/000000/instagram-new.png"
      alt="Instagram"
      className="w-5 h-5 mr-2"
    />
    Instagram
  </a>

  <a
    href="https://linkedin.com"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center w-full py-2 rounded-lg border border-blue-800 hover:bg-blue-50 transition"
  >
    <img
      src="https://img.icons8.com/color/24/000000/linkedin.png"
      alt="LinkedIn"
      className="w-5 h-5 mr-2"
    />
    LinkedIn
  </a>
    <a
    href="https://twitter.com"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center w-full py-2 rounded-lg border border-black hover:bg-black/10 transition"
  >
    <img
      src="https://img.icons8.com/?size=100&id=phOKFKYpe00C&format=png&color=000000"
      alt="X"
      className="w-5 h-5 mr-2 object-contain"
    />
    X
  </a>
</div>


    <button className="w-full bg-mint2 from-[#1b4332] via-[#2d6a4f] to-[#081c15] text-white px-4 py-2 cursor-pointer rounded-lg hover:bg-sea_green transition bg-gradient-to-br mt-4"
  onClick={()=>setIsOpen(true)}
    >
      Follow
    </button>
  </div>
</div>


      </div>

              {
            isOpen && <Modal
                isOpen={isOpen}
                 onClose={()=>{setIsOpen(false)}} 
                 title={"Sign In "}
            >
                <SignIn/>
            </Modal>
        }
    </div>
  );
};

export default Blog;
