import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Contact from "./components/Contact";
import Home from "./components/Home/Home";
import About from "./components/About";
import Logout from "./components/User/Logout";
import Profile from "./components/User/Profile";
import { NoteState } from "./components/context/NoteState";
import Login from "./components/User/Login";
import SignUp from "./components/User/SignUp";
import Footer from "./Footer";

function App() {
  return (
    <>
      <NoteState>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Home" element={<Home />} />
          <Route exact path="/About" element={<About />} />
          <Route exact path="/Contact" element={<Contact />} />
          <Route exact path="/Logout" element={<Logout />} />
          <Route exact path="/Profile" element={<Profile />} />
          <Route exact path="/Login" element={<Login/>} />
          <Route exact path="/SignUp" element={<SignUp/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
