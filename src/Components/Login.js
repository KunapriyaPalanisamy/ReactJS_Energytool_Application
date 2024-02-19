import React from 'react'
import {Link} from 'react-router-dom'
import { useForm } from "react-hook-form";
import axios from "axios" 
import {NotificationContainer, NotificationManager} from 'react-notifications';
export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        axios.post(`${process.env.REACT_APP_HOST}/users/login`,data).then(res=>{
            console.log(res.data)
            localStorage.setItem("token",res.data.token)
            window.location.replace("/home")
        }).catch(err=>{
            NotificationManager.error(err.response.data.err[0].msg)
        })
    }
  return (
    <>
    <NotificationContainer />
  <div className="w-full max-w-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
  <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        Email
      </label>
      <input required {...register("email",{required:true})} name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="email" placeholder="@email" />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Password
      </label>
      <input required {...register("password",{required:true})} name="password" className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />

    </div>
    <div className="flex items-center justify-between">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Sign In
      </button>
    <Link to="/">  <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Sign up?
      </a>
      </Link>
    </div>
  </form>
 
</div>
</>
  )
}
