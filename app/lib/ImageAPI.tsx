import React, {useState, useEffect} from 'react';
import Image from 'next/image'
import { cookies } from 'next/headers';
export default async function ImageAPI(props: {src: string, cookies: string, draggable: boolean | null, alt: string}) {
  var image = "";

  const cookieStore = cookies()
    const session_cookies = cookieStore.getAll()
    var cookieStr : string = ''
    session_cookies.forEach(elem=>{
        cookieStr+=elem.name+"="+elem.value+";"
    })

  //Get if url already exists in local storage
  const response = await fetch(props.src, {
    credentials: 'include',
    headers: {
      Method: "GET",
      "Cookie": cookieStr,
    },
  });
  //Extract image from response body
  let base64Image = await response.text();
  //console.log(base64Image)
  let imageObject = await fetch(`data:image/jpeg;utf8,${base64Image}`);
  //console.log(imageObject)
  let imageObject2 = await imageObject.blob();

                //Create an Url that stores the image
  const objectURL = URL.createObjectURL(imageObject2);

                //Save in local storage and component state
  image = objectURL;

    console.log(image)

  return (
    <>
      {image!='' ? (
        <Image
          src={image}
          alt={props.alt}
          draggable={!(!props.draggable ? true : false)}
          width={50}
          height={50}
        />
      ) : (
        <div className=""></div>
      )}
    </>
  );
}