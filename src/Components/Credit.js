import React, { useEffect } from 'react'
import Navbar from './Navbar'
import axios from "axios"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Auth from './Auth'
 function Credit({user}) {
    useEffect(()=>{
        if(user=="Admin")
        window.location.replace("/login")

    },[])
    const submit = (e)=>{
e.preventDefault()
axios.put(`${process.env.REACT_APP_HOST}/users/credits/${e.target.evc.value}`,{},{headers:{"Authorization":localStorage.getItem("token")}}).then(res=>{
    console.log(res)
    NotificationManager.success(res.data.msg)
    window.location.reload()
}).catch(err=>{
    console.log(err.response.data)
    NotificationManager.error(err.response.data.err[0].msg)
})
    }
  return (
    <div>
        <NotificationContainer />
        <Navbar />
        <form onSubmit={submit} className="w-full max-w-sm mx-auto mt-10">
  <div className="flex items-center border-b border-teal-500 py-2">
    <input required name="evc" className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="e.x. 123ABC1B" aria-label="Full name" />
    <button className="uppercase flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
apply
    </button>
   
  </div>
</form>

    </div>
  )
}
export default Auth(Credit)