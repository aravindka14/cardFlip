import React from 'react'
import InputField from '../components/InputField'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const login = () => {
  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const [userName, setUserName] = useState("")

  const handleLogin =(e)=> {
    e.preventDefault();
    console.log("password", password);
    console.log("username", userName);
    if (!userName.trim() || !password.trim()) {
      alert("Please enter username and password");
      return;
    }
    if(password === "123" && userName === "ara"){
      localStorage.setItem("user", userName);
      navigate("/home");
    }else{
      alert("Invalid username or password");
    } 
  }
  return (
     <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[450px] bg-white p-8 rounded-2xl shadow-lg">
        
        <h1 className="text-3xl font-serif text-center mb-6">CardFlip</h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
    
          <div className="flex flex-col gap-4 justify-center items-center w-[360px] mx-auto">
            <InputField
              type="text"
              label={"User Name"}
              placeholder={"Enter Userame"}
              value={userName}
              onChange={(e)=> setUserName(e.target.value)}
            />
  
            <InputField
              type="password"
              label={"Password"}
              placeholder={"Enter Password"}
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-[100px] bg-black text-white mt-5 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Login
            </button>
  
          </div>
          

        </form>


      </div>
    </div>
  )
}

export default login