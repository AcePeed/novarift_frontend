import Image from 'next/image'
import '../css/catalog.css'
import { cookies } from 'next/headers'
import Link from 'next/link'


export function Swiper(props: {data:Array<{id:string ,name: string, img: string}>}){
    return <div className='catalog_swiper'>
        <div className='catalog_swiper_sub'>
            {props.data.map((e)=>{
                return <Card key={e.name} id={e.id} name={e.name} img={e.img} />
            })}
        </div>
    </div>
}



export function Card(props : {name: string, img: string, id: string}){
    //<Image width={100} height={100} alt={props.img} src={props.img}/>
    //<ImageAPI cookies='' src={process.env.API_HOST+props.img} draggable={false} alt={"Picture of "+props.name} />
    return <Link href={`/catalog/${props.id}`}>
        <div className="catalog_card">
            <Image priority src={process.env.API_HOST+props.img+"?from=localhost"} draggable={false} width={1000} height={500} alt={"Picture of "+props.name} />
            <span className='catalog_card_title'>{props.name}</span>
        </div>
    </Link>
}