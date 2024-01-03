"use client";

import { serverRedirect } from "@/app/lib/server-functions";

export default function Veil(props: any) {
  return (
    <div
      className="title-detail-veil"
      onClick={() => {
        console.log("Heeee");
        serverRedirect("/catalog", undefined);
      }}
    ></div>
  );
}
