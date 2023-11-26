import "./App.css";
import Header from "./components/partial/Header";
import SideBar from "./components/partial/SideBar";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import WallpaperState from "./context/WallpapersState";
import Wallpaper from "./components/Wallpaper/Wallpaper";
import UserMaster from "./components/UserMaster/UserMaster";
import Notification from "./components/PushNotification/Notification";
import Setting from "./components/Setting/Setting";
import Dashboard from "./components/dashboard/Dashboard";
import LoginPage from "./components/Login/login";
import AddUser from "./components/AddUser/AddUser";
import ChangePassword from "./components/AddUser/ChangePassword";
import Target from "./components/target/Target";

function App() {
  // check if authentication and role is true in localStorage
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const role = localStorage.getItem("role");

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
            ) : role === "admin" ? (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/user-master" element={<UserMaster />} />
                <Route path="/create-user" element={<AddUser />} />
                <Route path="/wallpapers" element={<Wallpaper />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Wallpaper />} />
              </>
            )}
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/target" element={<Target />} />
            <Route path="/push-notification" element={<Notification />} />
            <Route path="/settings" element={<Setting />} />

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
