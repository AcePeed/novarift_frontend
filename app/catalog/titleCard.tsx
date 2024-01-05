import Image from "next/image";
import "../css/catalog.css";
import { cookies } from "next/headers";
import Link from "next/link";

export function Swiper(props: {
  data: Array<{ id: string; name: string; img: string; is_movie: boolean }>;
}) {
  return (
    <div className="catalog_swiper">
      <div className="catalog_swiper_sub">
        {props.data.map((e) => {
          return (
            <Card
              key={e.name}
              id={e.id}
              name={e.name}
              img={e.img}
              is_movie={e.is_movie}
            />
          );
        })}
      </div>
    </div>
  );
}

export function Card(props: {
  name: string;
  img: string;
  id: string;
  is_movie: boolean;
}) {
  //<Image width={100} height={100} alt={props.img} src={props.img}/>
  //<ImageAPI cookies='' src={process.env.API_HOST+props.img} draggable={false} alt={"Picture of "+props.name} />
  return (
    <Link href={`/catalog/${props.id}`}>
      <div className="catalog_card">
        <Image
          priority
          src={process.env.API_HOST + props.img + "?from=localhost"}
          draggable={false}
          width={1000}
          height={500}
          alt={"Picture of " + props.name}
        />
        <span className="catalog_card_title">
          <span>{props.name}</span> 
          <Image
            src={props.is_movie ? "/images/film.png" : "/images/video.png"}
            className={props.is_movie ? "catalog_card_icon_movie" : "catalog_card_icon_series"}
            width={100}
            height={100}
            alt="icon"
          />
        </span>
      </div>
    </Link>
  );
}
