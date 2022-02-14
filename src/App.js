import './App.css';
import React,{useState} from 'react'
import Home from './components/Home'
import Posts from './components/Posts'
import { BrowserRouter , Route, Routes } from "react-router-dom";
import PostDetails from './components/PostDetails';
import Comments from './components/Comments';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './components/Theme';
import { GlobalStyles } from './components/Global';
import UserState from './context/UserState'

function App() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  return ( 
    <div className='App'>
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
    <GlobalStyles />
    <button className='toggle' onClick={toggleTheme}>Toggle theme</button>
    <UserState>
    <BrowserRouter>
    <div className='Container'>
      <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/posts/:user_id" element={<Posts/>} />
          <Route exact path="/:user_id/postDetails/:id" element={<PostDetails/>} />
          <Route exact path="/comments/:id" element={<Comments/>} />
      </Routes>
    </div>
    </BrowserRouter>
    </UserState>
    </ThemeProvider>
    </div>
  );
}

export default App;
