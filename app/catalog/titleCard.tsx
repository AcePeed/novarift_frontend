import Image from 'next/image'
import '../css/catalog.css'
import { cookies } from 'next/headers'


export function Swiper(props: {data:Array<{name: string, img: string}>}){
    return <div className='catalog_swiper'>
        <div className='catalog_swiper_sub'>
            {props.data.map((e)=>{
                return <Card key={e.name} name={e.name} img={e.img} />
            })}
        </div>
    </div>
}



export function Card(props : {name: string, img: string}){
    console.log(process.env.API_HOST+props.img+"?from=localhost")
    //<Image width={100} height={100} alt={props.img} src={props.img}/>
    //<ImageAPI cookies='' src={process.env.API_HOST+props.img} draggable={false} alt={"Picture of "+props.name} />
    return <>
        <div className="catalog_card">
            <Image src={process.env.API_HOST+props.img+"?from=localhost"} draggable={false} width={1000} height={500} alt={"Picture of "+props.name} />
            <span className='catalog_card_title'>{props.name}</span>
        </div>
    </>
}