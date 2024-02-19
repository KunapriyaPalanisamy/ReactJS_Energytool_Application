import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import axios from "axios" 
import {NotificationContainer, NotificationManager} from 'react-notifications';
export default function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [property,setPropertyType] = useState("")
    const onSubmit = data => {
console.log(data)
if(property=="") return NotificationManager.info('Please select property type')
data.propertyType=property
        axios.post(`${process.env.REACT_APP_HOST}/users/sign-up`,data).then(res=>{
            console.log(res)
            NotificationManager.success("User signed up successfully")
            window.location.replace("/login")
        }).catch(err =>{
            console.log(err.response.data)
            NotificationManager.error(err.response.data.err[0].msg)
        })
    }
  return (
<>
  <NotificationContainer />
<form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md p-10">
  <div className="flex flex-wrap -mx-3 mb-6 ">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
      Email
      </label>
      <input required {...register("email",{required:true})} name="email" className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="email" placeholder="@email" />
     {errors.email && <p className="text-red-500 text-xs italic">Please fill out this field.</p> }
    </div>
    <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
        Password
      </label>
      <input required {...register("password",{required:true})} name="password" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="password" placeholder="******************" />
      {errors.password && <p className="text-red-500 text-xs italic">Please fill out this field.</p> }

    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
        Address
      </label>
      <input required {...register("address",{required:true})} name="address" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder='Leicester,UK' />
      {errors.address && <p className="text-red-500 text-xs italic">Please fill out this field.</p> }

    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-2">
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
        Bedrooms
      </label>
      <input required {...register("bedrooms",{required:true})} name="bedrooms" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="number" placeholder="e.x. 3" />
      {errors.bedrooms && <p className="text-red-500 text-xs italic">Please fill out this field.</p> }

    </div>
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
    Property type
      </label>
      <div className="relative">
        <select onChange={(e)=>setPropertyType(e.target.value)}className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">          <option value="detached">Detached</option>
          <option value="semi-detached">Semi Detached</option>
          <option value="terraced">Terraced</option>
          <option value="flat">Flat</option>
          <option value="cottage">Cottage</option>
          <option value="bungalow">Bungalow </option>
          <option value="mansion">Mansion </option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
      </div>
    </div>
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
        EVC
      </label>
      <input required {...register("evc",{maxLength:8,minLength:8,required:true})} name="evc" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder={"90210EXV"} />
      {errors.evc && <p className="text-red-500 text-xs italic">Please fill out this field.</p> }

    </div>
  </div>
  <button className="bg-blue-500 uppercase mt-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Sign Up
    </button>
</form>
</>
  )
}
