import "./App.css";
import Home from "./components/Home";
import Header from "./components/partial/Header";
import SideBar from "./components/partial/SideBar";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Tag from "./components/tag/Tag";
import WallpaperState from "./context/WallpapersState";
import Category from "./components/category/Category";
import Wallpaper from "./components/Wallpaper/Wallpaper";
import UserMaster from "./components/UserMaster/UserMaster";
import Notification from "./components/PushNotification/Notification";
import Setting from "./components/Setting/Setting";
import Dashboard from "./components/dashboard/Dashboard";
import LoginPage from "./components/Login/login";

function App() {
  // check if authentication is true in localStorage

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <>
      <WallpaperState>
        <BrowserRouter>
          {/* header and sidebar */}
          {isAuthenticated && (
            <>
              <Header />
              <SideBar />
            </>
          )}

          {/* content */}
          <Routes>
            {/* redirect to login page if not authenticated */}
            {!isAuthenticated ? (
              <Route path="/*" element={<LoginPage />} />
            ) : (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/user-master" element={<UserMaster />} />
                <Route path="/push-notification" element={<Notification />} />
                <Route path="/settings" element={<Setting />} />
                <Route path="/wallpapers" element={<Wallpaper />} />
              </>
            )}

            {/* redirect every route to "/" */}
            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
          </Routes>
          {/* End content */}
        </BrowserRouter>
      </WallpaperState>
    </>
  );
}

export default App;
