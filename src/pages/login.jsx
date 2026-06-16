import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FiUser, FiLock } from "react-icons/fi";
import { useAuthQuery } from "../queries/auth/useAuthQuery";
import InputField from "../components/Base/inputField/InputField";

const Login = () => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  const { login } = useAuthQuery();
  const { mutate: loginMutate, isError, error, isPending } = login;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleLogin = (data) => {
    const { userName, password } = data;
    loginMutate(
      { email: userName, password },
      {
        onSuccess: (data) => {
          console.log("inside", data);
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.id);
          navigate("/");
        },
        onError: (error) => {
          console.log(error.message);
        },
      },
    );

    // if (password === "123" && userName === "ara") {
    //   sessionStorage.setItem("user", userName);
    //   navigate("/");
    // } else {
    //   setError("password", {
    //     type: "manual",
    //     message: "Invalid username or password",
    //   });
    // }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-slate-50 font-sans">
      <div className="w-full max-w-[440px] bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] p-8 sm:p-10">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-lg text-white shadow-md">
            🎴
          </div>
          <span className="font-bold text-slate-800 tracking-tight text-lg">
            CardFlip
          </span>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Welcome back
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Please enter your details to sign in.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col gap-5"
        >
          <InputField
            label="Username"
            icon={FiUser}
            type="text"
            placeholder="e.g. ara"
            error={errors.userName?.message}
            {...register("userName", {
              required: "Username is required",
            })}
          />

          <InputField
            label="Password"
            icon={FiLock}
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required",
            })}
          />

          {/* Remember & Forgot Row */}
          <div className="flex items-center justify-between mt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 hover:text-slate-800 transition-colors">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20"
              />
              <span className="text-sm font-medium">Remember me</span>
            </label>

            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md shadow-indigo-600/10 flex justify-center items-center gap-2"
          >
            {isPending ? (
              <span className="w-5 h-5 border-2 border-white/35 border-t-white rounded-full animate-spin"></span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer Access Request */}
        <div className="mt-8 text-center text-xs text-slate-400">
          Don't have credentials?{" "}
          <span className="text-slate-500 font-medium cursor-help hover:text-slate-700 underline underline-offset-2">
            Contact administrator
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
