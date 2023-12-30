import Image from 'next/image'
import '../css/catalog.css'


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
    //<Image width={100} height={100} alt={props.img} src={props.img}/>
    //<ImageAPI cookies='' src={process.env.API_HOST+props.img} draggable={false} alt={"Picture of "+props.name} />
    return <>
        <div className="catalog_card">
            <Image src={process.env.API_HOST+props.img} draggable={false} width={400} height={300} alt={"Picture of "+props.name} />
            <span className='catalog_card_title'>{props.name}</span>
        </div>
    </>
}