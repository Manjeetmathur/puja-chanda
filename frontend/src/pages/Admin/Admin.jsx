import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {

  const menu = [
    {
      title: "Create / Update User",
      path: "/user-admin",
      color: "from-green-500 to-teal-600",
    },
    {
      title: "चंदे की जानकारी",
      path: "/user",
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "विवाह शुल्क लिखें",
      path: "/vivah-admin",
      color: "from-pink-500 to-red-500",
    },
    {
      title: "विवाह शुल्क की जानकारी",
      path: "/vivah-shulk-details",
      color: "from-purple-500 to-indigo-600",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-orange-50 flex flex-col">

      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 to-pink-600 text-white py-6 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide">
            🙏 जय मां मथुरासिनी 🙏
          </h1>
        </div>
      </header>

      {/* Dashboard */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">

        <div className="w-full max-w-xl">

          {/* Title */}
          <h2 className="text-center text-xl sm:text-2xl font-bold text-orange-700 mb-8">
            Admin Dashboard
          </h2>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {menu.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`bg-gradient-to-r ${item.color} text-white rounded-xl shadow-md p-5 text-center font-semibold text-lg hover:scale-105 transition-transform duration-300`}
              >
                {item.title}
                <div className="text-sm mt-1 opacity-80">Open ➜</div>
              </Link>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Admin;