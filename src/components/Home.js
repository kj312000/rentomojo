import { useState } from "react";
import {  Link } from "react-router-dom";

const elementStyle ={
  border:'solid',
  borderRadius:'10px',
  position:'relative',
  left:'30%',
  height:'3vh',
  width:'20vw',
  marginTop:'5vh',
  marginBottom:'10vh',
  padding:'1rem'
}



function Home({User , Loading}) {
  const [state, setState] = useState([{}])
  const searchSpace=(event)=>{
    let keyword = event.target.value;
    setState({search:keyword})
  }
  

  return (
    <div className='Home'>
        {Loading?<h1>Loading....</h1>:
        <div>
        <input type="text" placeholder="Search" style={elementStyle} onChange={(e)=>searchSpace(e)} />
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