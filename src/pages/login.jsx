import React from 'react'
import InputField from '../components/InputField'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";


const login = () => {
  const navigate = useNavigate()
  // const [password, setPassword] = useState("")
  // const [userName, setUserName] = useState("")

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();


  const handleLogin =(data)=> {
    const { userName, password } = data
    // console.log("password", password);
    // console.log("username", userName);
    // if (!userName.trim() || !password.trim()) {
    //   alert("Please enter username and password");
    //   return;
    // }
    if(password === "123" && userName === "ara"){
      sessionStorage.setItem("user", userName);
      navigate("/home");
    }else{
      // alert("Invalid username or password");
      setError("password",{
        type: "manual",
        message: "Invalid username or password"
      })
    } 
  }
  return (
     <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[450px] bg-white p-8 rounded-2xl shadow-lg">
        
        <h1 className="text-3xl text-gray-600 text-center mb-6">LOGIN</h1>

        <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-4">
    
          <div className="flex flex-col gap-4 justify-center items-center w-[360px] mx-auto">
            <InputField
              type="text"
              label={"User Name"}
              placeholder={"Enter Userame"}
              error={errors.userName?.message}
              {...register("userName", {
                required: "Username is required"
              })}
              // value={userName}
            />
  
            <InputField
              type="password"
              label={"Password"}
              placeholder={"Enter Password"}
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required"
              })}
              // value={password}
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