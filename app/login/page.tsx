'use client'
import { useState } from "react"
import '../css/login.css'
import { redirect } from 'next/navigation'
import { login as UserLogIn } from '@/app/lib/user'
import Link from "next/link"


export default function Loading(props: any){
    

    const [login,setLogin] = useState('')
    const [password,setPassword] = useState('')

    const tryLogin = ()=>{
        UserLogIn(login,password).then((res)=>{
            console.log(res)
            if(typeof res.auth!='undefined' && res.auth==true){
                if(typeof res.isAdmin!='undefined' && res.isAdmin==true){
                    window.location.href = `${process.env.FRONT_HOST}/admin`
                }
                else{
                    window.location.href = `${process.env.FRONT_HOST}/catalog`
                }
            }
        })
    }

    return <>
        <div className="login-container">
            <span className="login-title">Log in</span>
            <form action={tryLogin}>
                <input type="text" name="email" placeholder="Login or Email" value={login} onChange={(e)=>{setLogin(e.target.value)}} />
                <input type="password" name="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                <div className="form_button" onClick={tryLogin}>Log In</div>
                <input type="submit" className="invisible"/>
            </form>
            <span className="login_register">Don{"'"}t have an account? <Link href={`${process.env.FRONT_HOST}/register`}><span className="login_register_button">Register</span></Link></span>
        </div>
    </>
}