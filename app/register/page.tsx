'use client'
import { useState } from "react"
import '../css/login.css'
import Link from "next/link"
import { login as UserLogIn } from '@/app/lib/user'


export default function Loading(props: any){
    

    const [login,setLogin] = useState('')
    const [password,setPassword] = useState('')

    const tryLogin = ()=>{
        UserLogIn(login,password).then((res)=>{
            console.log(res)
            if(typeof res.auth!='undefined' && res.auth==true){
                if(typeof res.isAdmin!='undefined' && res.isAdmin==true){
                    //window.location.href = `${process.env.FRONT_HOST}/admin`
                }
                else{
                    window.location.href = `${process.env.FRONT_HOST}/catalog`
                }
            }
        })
    }

    return <>
        <div className="login-container">
            <span className="login-title">Register</span>
            <form action={tryLogin}>
                <input type="text" name="first_name" placeholder="First Name" />
                <input type="text" name="last_name" placeholder="Last Name" />
                <input type="text" name="email" placeholder="Email" value={login} onChange={(e)=>{setLogin(e.target.value)}} />
                <input type="text" name="login" placeholder="Login" />
                <input type="password" name="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                <div className="form_button" onClick={tryLogin}>Log In</div>
                <input type="submit" className="invisible"/>
            </form>
            <span className="login_register">Already have an account? <Link href={`${process.env.FRONT_HOST}/login`}><span className="login_register_button">Log In</span></Link></span>
        </div>
    </>
}