import { Layout } from "antd";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Profile from "./components/Profile";
import AddSection from "./components/AddSection";
import AddTeachingAssistant from "./components/AddTeachingAssistant";
import AddStudent from "./components/AddStudent";
import Home from "./components/Home";

function App() {
  // return loggedIN ? (
  //   <BrowserRouter>
  // <Layout className="min-h-screen ">
  //   <Sidebar />
  //   {/* <Navbar /> */}
  //   <Routes>
  //     <Route path="/profile" element={<Profile />} />
  //   </Routes>
  // </Layout>
  //   </BrowserRouter>
  // ) : (
  //   <SignIn />
  // );

  return (
    <BrowserRouter>
      <Layout className="min-h-screen ">
        <Routes>
          <Route path="/" element={<Sidebar />}>
            <Route path="" element={<Home />} />
            <Route path="add-section" element={<AddSection />} />
            <Route
              path="add-teaching-assistant"
              element={<AddTeachingAssistant />}
            />
            <Route path="add-student" element={<AddStudent />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
