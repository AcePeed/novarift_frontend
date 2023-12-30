import Image from 'next/image'
import { redirect } from 'next/navigation'
import { check as UserCheck } from '@/app/lib/user-server'
import './css/loading_special.css';
import { useEffect } from 'react'

export default async function Home() {
  var result = await UserCheck()
  if((!(typeof result.auth!='undefined' && result.auth==true))){
    redirect(`login`)
  }
  else{
    redirect(`catalog`)
  }
  
  return (
    <>
      <span>{(typeof result.auth!='undefined' && result.auth==true) ? 'Connected' : 'Not Connected'}</span>
      {(typeof result.auth=='undefined' && result.auth==true) ? '' : <>
        <form action={`${process.env.API_HOST}/user`} method='POST'>
          <input name="email" type="text" />
          <input name="password" type="password" />
          <input type='submit' />
        </form>
      </> }
    </>
  )
}
