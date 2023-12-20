import Image from 'next/image'
import { redirect } from 'next/navigation'
import { check as UserCheck } from '@/app/lib/user-server'
import { useEffect } from 'react'

export default async function Home() {
  var result = await UserCheck()
  console.log(await result)
  if((!(typeof result.auth!='undefined' && result.auth==true))){
    redirect(`${process.env.FRONT_HOST}/login`)
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
