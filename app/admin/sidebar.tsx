import Image from "next/image";
import Link from "next/link";

export default function SideBar(props: {}) {
  return (
    <div className="admin-sidebar-container">
      <div className="admin-sidebar">
        <SideBarButtons url="/admin/titles" icon='/images/play.png' invert />
        <SideBarButtons url="/admin/users" icon='/images/film.png' invert />
      </div>
    </div>
  );
}

const SideBarButtons = (props: { url: string; icon: string, invert?:boolean}) => {
  return (
    <Link href={props.url}>
      <div className="admin-sidebar-button-container">
        <Image src={props.icon} width={50} height={50} alt={props.icon} style={props.invert ? {filter:'invert(100%)'} : {}} />
      </div>
    </Link>
  );
};
