
import React from 'react'
import {parseCookies} from 'nookies'
import Button from '@material-ui/core/Button';

import Image from 'next/image'
     

function profile({res2}) {
    const cookieuser = parseCookies()

    return (
        <>
        <div  >
          <h1 > Hi, {cookieuser.fName +" "+ cookieuser.lName} </h1>
          <p  >This is Dashboard</p>
        </div>

        </>
    )
}

export default profile

export async function getServerSideProps(ctx){
    const {token, email} = parseCookies(ctx)
if(token){
    const res1 =  await fetch(`https://murray-puneetkathar1.vercel.app//api/apiFetch`,{
  method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            email: email
          })
})
const res2 = await res1.json()  
if(res2 == false){
    const {res} = ctx
    res.writeHead(302,{Location:"/pricing"})
    res.end()
}
}

if(!token){
    const {res} = ctx
    res.writeHead(302,{Location:"/login"})
    res.end()
}


  return {
      props:{ 
       }
  }
}



