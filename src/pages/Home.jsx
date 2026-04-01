import { Outlet } from "react-router-dom";
import SideBar from "../components/layout/SideBar";
import TopBar from "../components/layout/TopBar";

const Home = () => {
  return (
    <>
      <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[350px] bg-white p-8 rounded-2xl shadow-lg">
        
        <h1 className="text-3xl font-serif text-center mb-6">CardFlip</h1>

        <form className="flex flex-col gap-4">
          
          <input
            type="email"
            placeholder="Email"
            className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            placeholder="Password"
            className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            className="bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Login
          </button>

        </form>


      </div>
    </div>

      {/* <div className="flex h-screen overflow-hidden">
        <SideBar />
        <div className="flex flex-col flex-grow">
          <TopBar />
          <main className="flex-grow overflow-auto bg-[#FAFAFA]">
            <Outlet />
          </main>
        </div>
      </div> */}
    </>
  );
};

export default Home;
