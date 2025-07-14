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
import AppNavigator from "./AppNavigator";
import AppLocationTracker from "./AppLocationTracker";
import { UserProvider } from "./context/shared/UserContext";
import Loader from "./components/Shared/Loader";
import IncomeLayout from "./components/Income/IncomeSource/IncomeLayout";
import IncomeHisLayout from "./components/Income/IncomeHistory/IncomeHisLayout";
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
      <Loader/>
      <Alert/>
      <Router>
      <UserProvider>
        <AppNavigator/>
        <AppLocationTracker/>
          
        <Routes>
          <Route exact path="/" element={<div><Login/></div>} />
          <Route exact path="/signup" element={<div><Signup/></div>} />
          
          <Route exact path="/dashboard" element={<>
            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} toggleSidebar={toggleSidebar} />
            <Sidebar isSidebarOpen={isSidebarOpen} currActive='/dashboard' />
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
          <Route exact path="/income" element={<>
            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} toggleSidebar={toggleSidebar} />
            <Sidebar isSidebarOpen={isSidebarOpen} currActive='/income' />
            <Main isSidebarOpen={isSidebarOpen}>
                  <IncomeLayout/>
            </Main>
          </>} />
          <Route exact path="/income/:__id/history" element={<>
            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} toggleSidebar={toggleSidebar} />
            <Sidebar isSidebarOpen={isSidebarOpen} currActive='/income' />
            <Main isSidebarOpen={isSidebarOpen}>
                  <IncomeHisLayout/>
            </Main>
          </>} />
          <Route exact path="/Expence" element={<>
            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} toggleSidebar={toggleSidebar} />
            <Sidebar isSidebarOpen={isSidebarOpen} currActive='/Expence' />
            <Main isSidebarOpen={isSidebarOpen}>
              <Content>
              Expence
              </Content>
            </Main>
          </>} />
          <Route exact path="/Reports" element={<>
            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} toggleSidebar={toggleSidebar} />
            <Sidebar isSidebarOpen={isSidebarOpen} currActive='/Reports' />
            <Main isSidebarOpen={isSidebarOpen}>
              <Content>
              Reports
              </Content>
            </Main>
          </>} />

        </Routes>

      </UserProvider>
      </Router>
    </div>
  );
}

export default App;
