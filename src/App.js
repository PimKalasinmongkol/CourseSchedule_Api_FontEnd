import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./LoginWithGG/Login";
import Sidebar from "./Sidebar/Sidebar";
import AddUser from "./Page_admin/AddUser/AddUser";
import AllUser from "./Page_admin/AllUser/AllUser";
import EditSubject from "./Page_admin/EditSubject/EditSubject";
import FirstPage from "./Page_admin/FirstPage/FirstPage";
import ImportRoom from "./Page_admin/ImportRoom/ImportRoom";
import ImportSubject from "./Page_admin/ImportSubject/ImportSubject";
import MainPage from "./Page_admin/MainPage/MainPage";
import Profile from "./Page_admin/Profile/Profile";
import SubjectTable from "./Page_admin/SubjectTable/SubjectTable";

function App() {
  const [stage ,setStage] = useState(0)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {stage === 1 && <Route path="/FirstPage" element={<FirstPage />} />} {/* แสดง Sidebar สำหรับ Admin */}
        {stage === 0 && <Route path="/FirstPage" element={<FirstPage />} />} {/* แสดง Sidebar สำหรับ Teacher */}
        <Route
          path="/*"
          element=
            {
              <div style={{ display: "flex" }}>
              {stage === 1 && <Sidebar />} {/* แสดง Sidebar สำหรับ Admin */}
              {stage === 0 && <Sidebar />} {/* แสดง Sidebar สำหรับ Teacher */}
              <Routes>
                {/* Admin Pages */}
                <Route path="/Profile" element={<Profile />} />
                <Route path="/MainPage" element={<MainPage />} />
                <Route path="/SubjectTable" element={<SubjectTable />} />
                <Route path="/EditSubject" element={<EditSubject />} />
                <Route path="/ImportSubject" element={<ImportSubject />} />
                <Route path="/ImportRoom" element={<ImportRoom />} />
                <Route path="/AllUser" element={<AllUser />} />
                <Route path="/AddUser" element={<AddUser />} />
              </Routes>
            </div>
            } 
        />
      </Routes>
    </Router>
  );
}

export default App;
