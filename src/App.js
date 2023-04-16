import { Layout } from "antd";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import { useState } from "react";

function App() {
  const [loggedIN, setLoggedIN] = useState(true);
  return loggedIN ? (
    <Layout className="min-h-screen ">
      <Sidebar />
      <Navbar />
    </Layout>
  ) : (
    <SignIn />
  );
}

export default App;
