import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Auth from "./Auth"
import moment from "moment"
import { useForm } from "react-hook-form";
import axios from "axios" 
import {NotificationContainer, NotificationManager} from 'react-notifications';
 function Dashboard({user}) {
    const { register, handleSubmit, formState: { errors } } = useForm();
     const [data,setData]=useState({day_reading_rate:"",night_reading_rate:"",gas_reading_rate:""})
    const [stats,setStats]= useState([])
     useEffect(()=>{
if(user=="Admin"){
    adminStats()
    getMeterAdmin()
}
     },[])

    const onSubmit = data => {
        console.log(data)
        axios.post(`${process.env.REACT_APP_HOST}/users/meterReading`,data,{headers:{"Authorization":localStorage.getItem("token")}}).then(res=>{
          
            NotificationManager.success("Bill submitted")
            document.getElementById("form").reset()
        }).catch(err=>{
            console.log(err.response.data)
            NotificationManager.error(err.response.data.err[0].msg)
        })
    }

    const getMeterAdmin = ()=>{
        axios.get(`${process.env.REACT_APP_HOST}/admin/meterRate`,{headers:{"Authorization":localStorage.getItem("token")}}).then(res=>{
           console.log(String(res.data[0].day_reading_rate))
           
           setData({day_reading_rate:String(res.data[0].day_reading_rate),night_reading_rate:res.data[0].night_reading_rate,gas_reading_rate:res.data[0].gas_reading_rate})
           
        }).catch(err=>{
            console.log(err.response.data)
        })
    }

    const updatePrice =(data)=>{
        axios.put(`${process.env.REACT_APP_HOST}/admin/meterRate`,data,{headers:{"Authorization":localStorage.getItem("token")}}).then(res=>{
            console.log(res.data)
            NotificationManager.success(res.data.msg)
        }).catch(err=>{
            console.log(err.response.data)
        }) 
    }
    const adminStats =(data)=>{
        axios.get(`${process.env.REACT_APP_HOST}/admin/stats`,{headers:{"Authorization":localStorage.getItem("token")}}).then(res=>{
            console.log(res.data)
            // NotificationManager.success(res.data.msg)
            let avgEle=0
            let avgGas=0
            res.data.data.map(val=>{
                avgEle+=val.avgDay
                avgGas+=val.avgNight
            })
            console.log(avgEle,avgGas)

            setStats([avgEle,avgGas])
        }).catch(err=>{
            console.log(err.response.data)
        }) 
    }

    if(user=="Customer")
  return (
    <div>
        <NotificationContainer />
<Navbar />
<form id="form" onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg mx-auto mt-20">

  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
        Date
      </label>
      <input {...register("date",{required:true})} name="date" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="date" defaultValue={moment().format("YYYY-MM-DD")}  />
      
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-2">
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
        Day reding
      </label>
      <input required {...register("day_reading",{required:true})} name="day_reading" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="number" placeholder="e.x. 100 kWh" />
    </div>
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
        Night reading
      </label>
      <input required {...register("night_reading",{required:true})} name="night_reading" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" type="number" placeholder="e.x. 100 kWh" />

    </div>
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
        Gas reading
      </label>
      <input required {...register("gas_reading",{required:true})} name="gas_reading" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="number" placeholder="e.x. 100 kWh" />
    </div>
  </div>
  <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
      Submit
    </button>
</form>


    </div>
  )
  else{
    return (
        <div>
            <NotificationContainer />
    <Navbar isAdmin={true}/>
    <form id="form" onSubmit={handleSubmit(updatePrice)} className="w-full max-w-lg mx-auto mt-20">
    
     
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
            Day reding
          </label>
          <input defaultValue={data.day_reading_rate} required {...register("day_reading",{required:true})} name="day_reading" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="number" placeholder="e.x. 100 kWh" />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
            Night reading
          </label>
          <input defaultValue={data.night_reading_rate} required {...register("night_reading",{required:true})} name="night_reading" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" type="number" placeholder="e.x. 100 kWh" />
    
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
            Gas reading
          </label>
         {console.log(data.day_reading_rate)}
          <input defaultValue={(data.gas_reading_rate)} required {...register("gas_reading",{required:true})} name="gas_reading" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="number" placeholder="e.x. 100 kWh" />
        </div>
      </div>
      <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
          Submit
        </button>
    </form>
    <div className='text-center mt-10'>
    <h2 className="text-gray-700 text-lg font-semibold">Energy consumption per day</h2>
            <p>Average electricity consumed per day {(stats[0]/30).toFixed(2)} kWh</p>
            <p>Average Gas consumed per day {stats[1]/30} kWh</p>
    </div>
    </div>

      )
  }
}

export default Auth(Dashboard)
