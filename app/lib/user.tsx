
export async function check(){
    const result = await fetch(`${process.env.API_HOST}/user`,{
        cache:'no-store',
        credentials: 'include',
        headers: {"Content-Type": "application/json"},
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


export async function register(cred:{fname:string | null,lname:string | null,email:string | null,password:string | null,login:string | null}) {
    console.log({
        fname: cred.fname,
        lname: cred.lname,
        email: cred.email,
        login: cred.login,
        password: cred.password,
    })
    const result = await fetch(`${process.env.API_HOST}/user/register`,{
        cache:'no-store',
        method: 'POST',
        credentials: 'include',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            fname: cred.fname,
            lname: cred.lname,
            email: cred.email,
            login: cred.login,
            password: cred.password,
        })
    })
    return await result.json()
}


