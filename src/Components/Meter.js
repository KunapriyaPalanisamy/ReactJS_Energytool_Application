import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from "axios" 
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Auth from "./Auth"
 function Meter({user}) {
    const [data,setData]= useState([])
    const [modal,setModal]= useState(false)
    const [bill,setBill]= useState(0)




    useEffect(()=>{
        if(user=="Customer")
        getData()
        else
        getMeterAdmin()
    },[])

    const getMeterAdmin = ()=>{
        axios.get(`${process.env.REACT_APP_HOST}/admin/users`,{headers:{"Authorization":localStorage.getItem("token")}}).then(res=>{
            console.log(res)
            setData(res.data.data)
        }).catch(err=>{
            console.log(err.response.data)
        }) 
    }


const getData= ()=>{
    axios.get(`${process.env.REACT_APP_HOST}/users/meterReading`,{headers:{"Authorization":localStorage.getItem("token")}}).then(res=>{
        console.log(res)
        setData(res.data.data)
    }).catch(err=>{
        console.log(err.response.data)
    })
}

const getBill=()=>{
    axios.get(`${process.env.REACT_APP_HOST}/users/bill`,{headers:{"Authorization":localStorage.getItem("token")}}).then(res=>{
        setBill(res.data.bill)
        console.log(res.data)
        setModal(true)
    }).catch(err=>{
        console.log(err.response.data)
    })
}

const payBill = ()=>{
    axios.get(`${process.env.REACT_APP_HOST}/users/pay`,{headers:{"Authorization":localStorage.getItem("token")}}).then(res=>{
        console.log(res.data)
        NotificationManager.success(res.data.msg)
        setModal(false)
        window.location.reload()
    }).catch(err=>{
        console.log(err.response.data)
    })
}
if(user=="Customer")
  return (
    <div >
        <NotificationContainer />
        {modal &&
        <div className='absolute border shadow-md shadow-slate-200 px-10 py-14 bg-gray-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <p className='text-center font-semibold'>Calculated bill {Intl.NumberFormat("us-en",{style:"currency",currency:"gbp"}).format(bill)}</p>
            <button onClick={payBill} className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
      pay bill
    </button>
        </div>
}
        <Navbar />
       <table className="table-auto mt-10 mx-auto">
  <thead>
    <tr>
      <th className="px-4 py-2">ID</th>
      <th className="px-4 py-2">Date</th>
      <th className="px-4 py-2">Day reading</th>
      <th className="px-4 py-2">Night reading</th>
      <th className="px-4 py-2">Gas reading</th>
      <th className="px-4 py-2"></th>
    </tr>
  </thead>
  <tbody>
    {data.map(val=>{
        return(
            <tr>
            <td className="border px-4 py-2">{val.id}</td>
            <td className="border px-4 py-2">{val.date}</td>
            <td className="border px-4 py-2">{val.day_reading}</td>
            <td className="border px-4 py-2">{val.night_reading}</td>
            <td className="border px-4 py-2">{val.gas_reading}</td>
            <td>{val.payed==0 ?<button onClick={getBill} className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
      Bill
    </button>:""}</td>
          </tr>
        )
    })}
  
   
  </tbody>
</table>

    </div>
  )
  else
  return(
    <div >
    <NotificationContainer />
    {modal &&
    <div className='absolute border shadow-md shadow-slate-200 px-10 py-14 bg-gray-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <p className='text-center font-semibold'>Calculated bill {Intl.NumberFormat("us-en",{style:"currency",currency:"gbp"}).format(bill)}</p>
        <button onClick={payBill} className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
  pay bill
</button>
    </div>
}
    <Navbar  isAdmin={true}/>
   <table className="table-auto mt-10 mx-auto">
<thead>
<tr>
  <th className="px-4 py-2">ID</th>
  <th className="px-4 py-2">User Email</th>
  <th className="px-4 py-2">Date</th>
  <th className="px-4 py-2">Day reading</th>
  <th className="px-4 py-2">Night reading</th>
  <th className="px-4 py-2">Gas reading</th>
</tr>
</thead>
<tbody>
{data.map(val=>{
    return(
        <tr>
        <td className="border px-4 py-2">{val.id}</td>
        <td className="border px-4 py-2">{val.userID}</td>
        <td className="border px-4 py-2">{val.day_reading}</td>
        <td className="border px-4 py-2">{val.night_reading}</td>
        <td className="border px-4 py-2">{val.gas_reading}</td>
        <td className="border px-4 py-2">{val.gas_reading}</td>
       
      </tr>
    )
})}


</tbody>
</table>

</div>
  )
}
export default Auth(Meter)