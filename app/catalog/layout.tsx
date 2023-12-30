import { Children } from "react";
import { Swiper } from "./titleCard"
import Header from "../lib/header";
import '../css/catalog.css'





export default function CatalogLayout({children,}: {children: React.ReactNode}){
    const data = [
        {
            name: 'Iron Man 1',
            img: '/posters/1051995_iron_man_1.jpg',
        },
        {
            name: 'Spider-man 1',
            img: '/posters/spider-mane-1-2002.jpg',
        },
        {
            name: 'Ant-man 1',
            img: '/posters/ant-man-1-2015.jpg',
        },
    ]

    return <>
    <Header/>
    <div className="catalog_container">
        <Swiper data={data}/>
        {children}
    </div>
    </>
}