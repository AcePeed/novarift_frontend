
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


