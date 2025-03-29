import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import {useState} from 'react'
import Main from "./ui/Main";
import Content from "./ui/Content";
import Profile from "./components/Profile/Profile";
import Stats from "./components/Stats/Stats";
import Team from "./components/Team/Team";
import Event from "./components/Event/Event";

function App() {
  const [darkMode, setdarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleDarkMode = ()=>{
    setdarkMode(!darkMode);
  }
  const toggleSidebar = ()=>{
    setIsSidebarOpen(!isSidebarOpen);
  }
  return (
    <div className={`font-quickSand ${darkMode && 'dark'}`}>
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
        <Profile />
      </Main>

    </div>
  );
}

export default App;
