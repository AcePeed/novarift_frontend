'use server'
import { cookies } from 'next/headers'

export async function getCatalog(){
    const cookieStore = cookies()
    const session_cookies = cookieStore.getAll()
    var cookieStr : string = ''
    session_cookies.forEach(elem=>{
        cookieStr+=elem.name+"="+elem.value+";"
    })
    const result = await fetch(`${process.env.API_HOST}/catalog`,{
        //cache:'no-store',
        next: { revalidate: 30 },
        credentials: 'include',
        headers: {"Content-Type": "application/json", "Cookie":cookieStr},
    })

    return result.json()
}