import { getTitle } from "@/app/lib/catalog";
import Image from "next/image";
import "./page.css";
import { redirect } from "next/navigation";
import Veil from "./veil";
import Link from "next/link";

export default async function TitlePage(props: { params: { id: string } }) {
  let title = await getTitle(props.params.id);
  if (!title.title) {
    redirect("../");
  } else {
    title = title.title;
  }
  return (
    <>
      <div className="title-detail-subcontainer">
        <div className="title-detail-container">
          <Image
            className="title-detail-poster"
            src={process.env.API_HOST + title.img + "?from=localhost"}
            height={1080}
            width={1920}
            alt={title.name}
            draggable={false}
          />
          <div className="title-detail">
            <div className="title-detail-name-container">
              <div className="title-detail-name">{title.name}</div>
              <Link href={"/watch/" + title.watch}>
                <div className="title-detail-watch-button">
                  <span>Watch</span>
                  <Image
                    src="/images/play.png"
                    priority
                    alt="Play"
                    width={200}
                    height={200}
                  />
                </div>
              </Link>
            </div>
            <div className="title-detail-detail">
              <div className="title-detail-description">{title.details}</div>
              <div className="title-detail-additional">
                <div className="title-detail-additional-producers">
                  <p>Producers : </p>
                  {title.producers.map((prod: string) => {
                    return <span key={prod}>{prod}</span>;
                  })}
                </div>
                <div className="title-detail-additional-maincast title-detail-additional-producers">
                  <p>Main Cast :</p>
                  {title.main_cast.map((prod: string) => {
                    return <span key={prod}>{prod}</span>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Veil />
    </>
  );
}
