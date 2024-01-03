import { Children } from "react";
import { Swiper } from "./titleCard";
import Header from "../lib/header";
import "../css/catalog.css";
import { getCatalog } from "../lib/catalog";
import { redirect } from "next/navigation";

export default async function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let data: Array<{ name: string; img: string; id: string }> = [];
  try {
    const dataParent = await getCatalog();
    if (!dataParent.auth) {
      redirect("/login");
    }
    data = dataParent.catalog;
  } catch (e) {
    redirect("/");
  }

  return (
    <>
      <div className="cataRoot">
        <Header />
        <div className="catalog_container">
          <Swiper data={data} />
        </div>
      </div>
      {children}
    </>
  );
}
