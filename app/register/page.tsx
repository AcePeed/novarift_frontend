'use client'
import { useState, useRef, useEffect } from "react"
import '../css/login.css'
import Link from "next/link"
import { register as UserRegister } from '@/app/lib/user'
import { check as UserCheck } from '@/app/lib/user'

export default function Loading(props: any){
    

    const [login,setLogin] = useState('')
    const [password,setPassword] = useState('')
    const refs = [useRef(null),useRef(null),useRef(null)]

    const tryRegister = ()=>{
        UserRegister({email:login,password:password,fname:refs[0].current!["value"],lname:refs[1].current!["value"],login:refs[2].current!["value"]}).then((res)=>{
            console.log(res)
            if(typeof res.auth!='undefined' && res.auth==true){
                window.location.href = `${process.env.FRONT_HOST}/catalog`
            }
        })
    }

    useEffect(()=>{
        UserCheck().then(result=>{
            if(((typeof result.auth!='undefined' && result.auth==true))){
                window.location.href = `${process.env.FRONT_HOST}/catalog`
            }
        })       
    },[])

    return <>
        <div className="login-container">
            <span className="login-title">Register</span>
            <form action={tryRegister}>
                <input type="text" name="first_name" placeholder="First Name" ref={refs[0]} />
                <input type="text" name="last_name" placeholder="Last Name" ref={refs[1]} />
                <input type="text" name="email" placeholder="Email" value={login} onChange={(e)=>{setLogin(e.target.value)}} />
                <input type="text" name="login" placeholder="Login" ref={refs[2]} />
                <input type="password" name="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                <div className="form_button" onClick={tryRegister}>Register</div>
                <input type="submit" className="invisible"/>
            </form>
            <span className="login_register">Already have an account? <Link href={`${process.env.FRONT_HOST}/login`}><span className="login_register_button">Log In</span></Link></span>
        </div>
    </>
}