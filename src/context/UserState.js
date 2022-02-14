import React,{useState} from "react";
import Context from "./Context";


const UserState = (props) =>{
    const [User, setUser] = useState([{}])
    const [data, setData] = useState([{}])
    return(
        <Context.Provider value={{User,setUser,data,setData}}>
            {props.children}
        </Context.Provider>
    )
}

export default UserState