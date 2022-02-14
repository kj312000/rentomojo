import { useState,useEffect,useContext } from "react";
import axios from "axios";
import Context from "../context/Context";
import {  Link } from "react-router-dom";

function Home() {
  const data = useContext(Context)
  const {User , setUser} =data
  const [Loading, setLoading] = useState(true)
  const [state, setState] = useState([{}])
  const searchSpace=(event)=>{
    let keyword = event.target.value;
    setState({search:keyword})
  }
  useEffect(() => {
    loadUser()// eslint-disable-next-line
  }, [])

  const loadUser = async()=>{
    const result = await axios.get("https://jsonplaceholder.typicode.com/users");
      const res = await result.data
      setUser(res)
      setLoading(false)
      }
  
  return (
    <div className='Home'>
        {Loading?<h1>Loading....</h1>:
        <div>
        <input type="text" placeholder="Search" className="elementStyle" onChange={(e)=>searchSpace(e)} />
        <table><tbody>
        <tr>
          <th>Sr.No</th>
          <th>Name</th>
          <th>Company</th>
          <th>Blog Posts</th>
        </tr>
              {User.filter((res)=>{
                    const {name , company} = res
                    if(state.search == null)
                        return res
                    else if(name.toLowerCase().includes(state.search.toLowerCase())||company.name.toLowerCase().includes(state.search.toLowerCase()))
                        return res
                    else return false
                    }).map((e,index)=>{
                        const {name , company} = e
                    return(
                      <tr key={index}>
                      <td>{index+1}</td>
                      <td>{name}</td>
                      <td>{company.name}</td>
                      <td>
                          <Link to={`/posts/${index+1}`}>Blog Posts</Link>
                      </td>
                  </tr>
        )
      })}
        </tbody>
      </table>
      </div>}
    </div>
    
  )
}

export default Home
