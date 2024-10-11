import { useState } from "react"
import { BACKEND_URL } from "../config"
import axios from "axios"

export const Signin = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return <div>
        <input onChange={(e) => {
            setUsername(e.target.value);
        }} type="text" placeholder="username" />
        <input onChange={(e) => {
            setPassword(e.target.value);
        }} type="password" placeholder="password" />
        <button onClick={async () => {
            await axios.post(`${BACKEND_URL}/signin`, {
                username,
                password
            }, {
                withCredentials: true,  //option in Axios is used to include credentials such as cookies,
                //If you don't set withCredentials: true in your Axios request when making cross-origin requests ,then 1.Cookies Won't Be Sent or Set:
                //2.Authentication Won't Work Properly:
                //Cross-Origin Requests (CORS) Impact
                //withCredentials: true in Axios, it means you want to send cookies 
                // (or other credentials like HTTP authentication headers) along with the request.
            });
            alert("you are logged in")
        }}>Submit</button>
    </div>
}