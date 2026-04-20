import React from "react";
import logo from "../../assets/hero.png";
import { useNavigate, useLocation } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const menuTabs = [
    {
      name: "Users List",
      url: "/home/users",
    },
    {
      name: "Info Card",
      url: "/home/infoCard",
    },
    {
      name: "Gallery",  
      url: "/home/gallery",
    },
    {
      name: "Calendar",
      url: "/home/calendar",
    },
    {
      name: "Wold Map",
      url: "/home/worldMap",
    }
  ];
  return (
    <aside className="min-w-64 bg-white border border-gray-200 h-screen flex flex-col justify-between p-5">
      <div>
        <div className="flex items-center justify-center mb-10">
          <img src={logo} className="w-24 object-contain" />
        </div>

        <nav className="flex flex-col gap-2">
          {menuTabs.map((item, index) => {
            const isActive = currentPath.startsWith(item.url);

            return (
              <button
                key={index}
                onClick={() => navigate(item.url)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gray-900 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {item.icon && <span className="text-lg">{item.icon}</span>}

                <span>{`${item.name}`}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
