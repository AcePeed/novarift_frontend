'use client'
import { useState, useRef, useEffect } from "react"
import '../css/login.css'
import Link from "next/link"
import { register as UserRegister } from '@/app/lib/user'
import { check as UserCheck } from '@/app/lib/user'

export default function Loading(props: any){
    

    const [login,setLogin] = useState('')
    const [error, setError] = useState({server: false, fname: false, lname:false, email: false, login: false, password: false, password_confirmation: false})
    const [password,setPassword] = useState('')
    const refs = [useRef(null),useRef(null),useRef(null),useRef(null)]

    const tryRegister = ()=>{
        UserRegister({email:login,password:password,fname:refs[0].current!["value"],lname:refs[1].current!["value"],login:refs[2].current!["value"],password_confirmation:refs[3].current!["value"]}).then((res)=>{
            console.log(res)
            setError((previous)=>{
                previous = {server: false, fname: false, lname:false, email: false, login: false, password: false, password_confirmation: false}
                try{
                    if(res.auth!==true){
                        res.error.forEach((element:{field: string | null}) => {
                            if(element.field=='fname'){previous['fname'] = true}
                            if(element.field=='lname'){previous['lname'] = true}
                            if(element.field=='email'){previous['email'] = true}
                            if(element.field=='login'){previous['login'] = true}
                            if(element.field=='password'){previous['password'] = true}
                            if(element.field=='password_confirmation'){previous['password_confirmation'] = true}
                        });
                    }
                }
                catch(e){previous.server=true}
                return previous
            })
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
                <input type="text" className={error.fname ? 'input_error' : '' } name="first_name" placeholder="First Name" ref={refs[0]} />
                <input type="text" className={error.lname ? 'input_error' : '' } name="last_name" placeholder="Last Name" ref={refs[1]} />
                <input type="text" className={error.email ? 'input_error' : '' } name="email" placeholder="Email" value={login} onChange={(e)=>{setLogin(e.target.value)}} />
                <input type="text" className={error.login ? 'input_error' : '' } name="login" placeholder="Login" ref={refs[2]} />
                <input type="password" className={error.password ? 'input_error' : '' } name="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                <input type="password" className={error.password_confirmation ? 'input_error' : '' } name="password_confirmation" placeholder="Confirm Password" ref={refs[3]}/>
                <div className={"form_button " + (error.server ? 'login_register_button_error' : '' )} onClick={tryRegister}>Register</div>
                <input type="submit" className="invisible"/>
            </form>
            <span className="login_register">Already have an account? <Link href={`login`}><span className="login_register_button">Log In</span></Link></span>
        </div>
    </>
}