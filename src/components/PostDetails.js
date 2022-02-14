import axios from 'axios';
import React,{useState,useEffect,useContext} from 'react'
import {  useParams,useNavigate } from 'react-router-dom';
import Comments from './Comments';
import Context from "../context/Context";

function PostDetails() {
  const response = useContext(Context)
  const {data , setData} = response
  const navigate = useNavigate()
  const {user_id , id} = useParams()
  const [ShowComments, setShowComments] = useState(false)
  const [postDetails, setPostDetails] = useState({})
  const [Loading, setLoading] = useState(true)
    useEffect(() => {
      axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res)=>{setPostDetails(res.data);setLoading(false)})
    },[id])


    function deletePost(id){
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{method:'DELETE'})
      .then((res)=>{
        if(res.status !== 200){
          return
        }else{
          setData(data.filter((user)=>{
            return `${user.id}` !== id;
          }))
          alert(`Deleted post No : ${id}`)
        }
      })
      navigate(`/posts/${user_id}`)
      
    }


  return (
    <div className='postdetails'>
      {Loading?<h1>Loading....</h1>:
        <div>
            {
                <div className='subpostdetails'>
                  <b><div className='title'><h1><li className='text'>{postDetails.title}</li></h1></div></b>
                  <div className='body'>{postDetails.body}</div>
                  <div style={{margin:"0 auto"}}>
                  <button className='btn' onClick={()=>setShowComments(!ShowComments)}>{ShowComments?"Hide Comments":"Show Comments"}</button>
                  <button className='btn' onClick={()=>deletePost(id)}>Delete Post</button>
                  </div>
                  <div>{
                      ShowComments?<Comments id={id}/>:<></>
                  }</div>
                </div>
            }
        </div>
      }
    </div>
  )
}

export default PostDetails