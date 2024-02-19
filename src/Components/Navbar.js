import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import axios from "axios"
export default function Navbar({isAdmin}) {
    const [credit,setCredits] =useState(0)
    useEffect(()=>{
getCredit()
    },[])
    const getCredit = ()=>{
        axios.get(`${process.env.REACT_APP_HOST}/users/credits`,{headers:{"Authorization":localStorage.getItem("token")}}).then(res=>{
        setCredits(res.data.credit)
        }).catch(err=>{
            console.log(err)
        })
    }
  return (
   <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">


  <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div className="text-sm lg:flex-grow">
        <Link to="/home">
      <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
        Home
      </a>
        </Link>
        <Link to="/meter">
      <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
        Meter
      </a>
        </Link>
        {!isAdmin && 
        <>
        <Link to="/credit">
      <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
        Credit
      </a>
        </Link>
      <p  className="block mt-4 lg:inline-block lg:mt-0 text-white ml-5 font-semibold hover:text-white">
        credit : {Intl.NumberFormat("us-en",{style:"currency",currency:"gbp"}).format(credit)}
      </p>
      </>
}

    </div>
<Link to="/login">
      <a onClick={()=>localStorage.removeItem("token")} className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
        logout
      </a>
</Link>
  </div>
</nav>

  )
}
