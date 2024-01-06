import SideBar from "./sidebar";
import "./admin.css";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SideBar />
      {children}
    </>
  );
}
