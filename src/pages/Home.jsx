import { Outlet } from "react-router-dom";
import SideBar from "../components/layout/SideBar";
import TopBar from "../components/layout/TopBar";

const Home = () => {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <SideBar />
        <div className="flex flex-col flex-grow">
          <TopBar />
          <main
            id="scrollableDiv"
            className="flex-grow overflow-auto bg-[#FAFAFA]"
          >
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;
