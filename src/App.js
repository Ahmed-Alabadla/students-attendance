import { Layout } from "antd";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Students from "./components/Students/Students";
import Profile from "./components/Auth/Profile";
import SignIn from "./components/Auth/SignIn";
import Instructors from "./components/Instructor/Instructors";
import Assistants from "./components/Assistants/Assistants";
import Courses from "./components/Courses/Courses";
import Sections from "./components/Sections/Sections";
import Rooms from "./components/Rooms/Rooms";
import RecordAttendance from "./components/Attendances/record/RecordAttendance";
import QRScanner from "./components/Attendances/record/QRScanner";
import Attendances from "./components/Attendances/show/Attendances";
import ShowAttendances from "./components/Attendances/show/ShowAttendances";
import Lectures from "./components/Lectures/Lectures";

function App() {
  return (
    <BrowserRouter>
      <Layout className="min-h-screen ">
        <Routes>
          <Route path="/" element={<Sidebar />}>
            <Route path="" element={<Dashboard />} />
            <Route path="sections" element={<Sections />} />
            <Route path="lectures" element={<Lectures />} />
            <Route path="qr" element={<QRScanner />} />
            <Route path="assistants" element={<Assistants />} />
            <Route path="attendances" element={<Attendances />} />
            <Route path="show-attendances" element={<ShowAttendances />} />
            <Route path="students" element={<Students />} />
            <Route path="instructors" element={<Instructors />} />
            <Route path="rooms" element={<Rooms />} />
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
