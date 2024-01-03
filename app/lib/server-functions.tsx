'use server'
import { RedirectType, redirect } from "next/navigation";


export async function serverRedirect(url:string,type:RedirectType | undefined){
    redirect(url)
}