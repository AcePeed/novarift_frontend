'use client'
import { useEffect, useState } from "react"
import '../css/login.css'
import { redirect } from 'next/navigation'
import { login as UserLogIn } from '@/app/lib/user'
import Link from "next/link"
import { register as UserRegister } from '@/app/lib/user'
import { check as UserCheck } from '@/app/lib/user'


export default function Loading(props: any){

    const [error, setError] = useState({server: false, fname: false, lname:false, email: false, login: false, password:false})
    const [login,setLogin] = useState('')
    const [password,setPassword] = useState('')

    const tryLogin = ()=>{
        UserLogIn(login,password).then((res)=>{
            setError((previous)=>{
                previous = {server: false, fname: false, lname:false, email: false, login: false, password:false}
                try{
                    res.error.forEach((element:{field: string | null}) => {
                    if(element.field=='email'){previous['email'] = true}
                    if(element.field=='password'){previous['password'] = true}
                    });
                }
                catch(e){previous.server=true}
                return previous
            })
            if(typeof res.auth!='undefined' && res.auth==true){
                if(typeof res.isAdmin!='undefined' && res.isAdmin==true){
                    window.location.href = `admin`
                }
                else{
                    window.location.href = `catalog`
                }
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
            <span className="login-title">Log in</span>
            <form action={tryLogin}>
                <input type="text" className={error.email ? 'input_error' : '' } name="email" placeholder="Login or Email" value={login} onChange={(e)=>{setLogin(e.target.value)}} />
                <input type="password" className={error.password ? 'input_error' : '' } name="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                <div className={"form_button " + (error.server ? 'login_register_button_error' : '' )} onClick={tryLogin}>Log In</div>
                <input type="submit" className="invisible"/>
            </form>
            <span className="login_register">Don{"'"}t have an account? <Link href={`register`}><span className="login_register_button">Register</span></Link></span>
        </div>
    </>
}