import React from 'react';

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-brunswick_green mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Blog post cards will go here */}
        <div className="bg-white dark:bg-dark_green p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-brunswick_green dark:text-nyanza">Blog Post Title</h2>
          <p className="text-gray-600 dark:text-gray-300">Blog post excerpt goes here...</p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
