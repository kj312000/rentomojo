import axios from 'axios';
import React,{useState,useEffect,useContext} from 'react'
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom'
import Context from "../context/Context";

const elementStyle ={
  border:'solid',
  borderRadius:'10px',
  position:'relative',
  left:'30%',
  height:'3vh',
  width:'50%',
  marginTop:'5vh',
  marginBottom:'10vh',
  padding:'1rem'
}


function Posts() {
  const response = useContext(Context)
  const {data , setData} = response
  const {user_id} = useParams()
  const [Loading, setLoading] = useState(true)
  const [state, setState] = useState([{}])

    useEffect(() => {
      axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user_id}&skip=0&limit=10`)
      .then((res)=>{setData(res.data);setLoading(false)})
      // eslint-disable-next-line
    },[user_id])


    const searchSpace=(event)=>{
      let keyword = event.target.value;
      setState({search:keyword})
    }
    return (
    <div className='posts'>
      {Loading?
            <h1>Loading...</h1>:
            <div className='sub_post'>
              <input type="text" placeholder="Search" style={elementStyle} onChange={(e)=>searchSpace(e)} />
              {data.filter((res)=>{
                if(state.search == null)
                    return res
                else if(res.title.toLowerCase().includes(state.search.toLowerCase()))
                    return res
                else return false
              }).map((e,index)=>{
              return(
                <div className='postsInfo' key={index+1}>
                    <b><p >
                      {index+1} . {e.title}
                    </p></b>
                    <Link to={`/${user_id}/postDetails/${e.id}`}>See Details</Link>
                  <br/>
              </div>
                )
            })}
      </div>}
    </div>
  )
}

export default Posts