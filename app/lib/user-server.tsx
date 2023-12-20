'use server'
import { cookies } from 'next/headers'


export async function check(){
    
    const cookieStore = cookies()
    const session_cookies = cookieStore.getAll()
    var cookieStr : string = ''
    session_cookies.forEach(elem=>{
        cookieStr+=elem.name+"="+elem.value+";"
    })
    const result = await fetch(`${process.env.API_HOST}/user`,{
        cache:'no-store',
        credentials: 'include',
        headers: {"Content-Type": "application/json", "Cookie":cookieStr},
    })

    return result.json()
}

export async function login(login:string,password:string) {
    const result = await fetch(`${process.env.API_HOST}/user`,{
        cache:'no-store',
        method: 'POST',
        credentials: 'include',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            email: login,
            password: password
        })
    })
    return await result.json()


}


