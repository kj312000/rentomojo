import axios from 'axios';
import React,{useState,useEffect} from 'react'

function Comments({id}) {
  const [Comments, setComments] = useState([{}])
  const [Loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        .then((res)=>{setComments(res.data);setLoading(false)})
    },[id])
  return (
    <div>
        <h2 style={{textAlign:"center"}}>Comments</h2>
        {Loading?<h1>Loading...</h1>:<div>
        {
          Comments.map((e,index)=>{
            return(
            <div className='commentbox' key={index}>
              <li className='imgtitle'><div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}><img className='imglogo' src="https://tse1.mm.bing.net/th?id=OIP.d80cum7owIU8OeE1vw4KQwHaHa&pid=Api&P=0&w=153&h=153" alt="img" /><b>{e.name} Says :</b></div><div>{`${Math.floor(Math.random()*30)+1}/${Math.floor(Math.random()*12)}/2021`}</div></li>
              <ul>{e.body}</ul>
            </div>)
          })
        }
        </div>}
    </div>
  )
}

export default Comments