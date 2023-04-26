import { Layout } from "antd";
import "./App.css";
import Sidebar from "./components/Sidebar";
import SignIn from "./components/SignIn";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile";
import Assistants from "./components/Assistants";
import Students from "./components/Students";
import Dashboard from "./components/Dashboard";
import QRScanner from "./components/QRScanner";
import Courses from "./components/Courses";
import Instructors from "./components/Instructors";
import Classrooms from "./components/Classrooms";
import Attendances from "./components/Attendances";
import ShowAttendances from "./components/ShowAttendances";
import Sections from "./components/Sections";
import RecordAttendance from "./components/RecordAttendance";

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
            <Route path="" element={<Dashboard />} />
            <Route path="sections" element={<Sections />} />
            <Route path="qr" element={<QRScanner />} />
            <Route path="assistants" element={<Assistants />} />
            <Route path="attendances" element={<Attendances />} />
            <Route path="show-attendances" element={<ShowAttendances />} />
            <Route path="students" element={<Students />} />
            <Route path="instructors" element={<Instructors />} />
            <Route path="classrooms" element={<Classrooms />} />
            <Route path="courses" element={<Courses />} />
            <Route path="record-attendance" element={<RecordAttendance />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
