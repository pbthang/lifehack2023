import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import FourOFour from "./pages/FourOFour";
import Spin from "./pages/Spin";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/spin" element={<Spin />} />
        <Route path="*" element={<FourOFour />} />
      </Routes>
    </Layout>
  );
}

export default App;
