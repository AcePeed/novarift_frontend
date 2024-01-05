"use client";

import { serverRedirect } from "@/app/lib/server-functions";

export default function Veil(props: any) {
  return (
    <div
      className="title-detail-veil"
      onClick={() => {
        serverRedirect("/catalog", undefined);
      }}
    ></div>
  );
}
