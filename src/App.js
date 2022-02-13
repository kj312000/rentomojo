import './App.css';
import axios from 'axios';
import React,{useState,useEffect} from 'react'
import Home from './components/Home'
import Posts from './components/Posts'
import { BrowserRouter , Route, Routes } from "react-router-dom";
import PostDetails from './components/PostDetails';
import Comments from './components/Comments';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './components/Theme';
import { GlobalStyles } from './components/Global';

function App() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }
  const [User, setUser] = useState([{}])
  const [data, setData] = useState([{}])
  const [Loading, setLoading] = useState(true)
  useEffect(() => {
    loadUser();
  },[])

  const handleState = (data)=>{
    setData(data)
  }
  const loadUser = async()=>{
    const result = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUser(result.data)
      setLoading(false)
      }

  return ( 
    <div className='App'>
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
    <GlobalStyles />
    <button className='toggle' onClick={toggleTheme}>Toggle theme</button>
    <BrowserRouter>
    <div className='Container'>
      <Routes>
          <Route exact path="/" element={<Home User={User} Loading={Loading}/>}/>
          <Route exact path="/posts/:user_id" element={<Posts data={data} handleState={handleState}/>} />
          <Route exact path="/:user_id/postDetails/:id" element={<PostDetails data={data} setData={setData}/>} />
          <Route exact path="/comments/:id" element={<Comments/>} />
      </Routes>
    </div>
    </BrowserRouter>
    </ThemeProvider>
    </div>
  );
}

export default App;
