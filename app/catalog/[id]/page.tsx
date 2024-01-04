import { getTitle } from "@/app/lib/catalog";
import Image from "next/image";
import "./page.css";
import { redirect } from "next/navigation";
import Veil from "./veil";

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
              <div className="title-detail-watch-button"><span>Watch</span><Image src="/images/play.png" priority alt="Play" width={200} height={200} /></div>
            </div>
            <div className="title-detail-detail">{title.details}</div>
          </div>
        </div>
      </div>
      <Veil />
    </>
  );
}
