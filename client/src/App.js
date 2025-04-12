import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import {useState} from 'react'
import Main from "./ui/Main";
import Content from "./ui/Content";
import Profile from "./components/Profile/Profile";
import Stats from "./components/Stats/Stats";
import Team from "./components/Team/Team";
import Event from "./components/Event/Event";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import Alert from "./components/Shared/Alert";

function App() {
  const [darkMode, setdarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserModalOpen, setisUserModalOpen] = useState(false);
  const toggleDarkMode = ()=>{
    setdarkMode(!darkMode);
  }
  const toggleSidebar = ()=>{
    setIsSidebarOpen(!isSidebarOpen);
  }
  const toggleUserModal = ()=>{
    setisUserModalOpen(!isUserModalOpen);
  }
  return (
    <div className={`font-quickSand ${darkMode && 'dark'}`}>
      <Alert/>
      <Router>
        <Routes>
          <Route exact path="/" element={<div><Login/></div>} />
          <Route exact path="/signup" element={<div><Signup/></div>} />
          
          <Route exact path="/dashboard" element={<>
            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} toggleSidebar={toggleSidebar} />
            <Sidebar isSidebarOpen={isSidebarOpen} />
            <Main isSidebarOpen={isSidebarOpen}>
              <Content>
                <Stats darkMode={darkMode}/>
                <div className="flex flex-col gap-3 lg:flex-row">
                  <Team/>
                  <Event/>
                </div>
              </Content>
              <Profile isUserModalOpen={isUserModalOpen} toggleUserModal={toggleUserModal} />
            </Main>
          </>} />

        </Routes>
      </Router>
      

    </div>
  );
}

export default App;
