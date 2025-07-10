import Sidebar from "./WizSidebar";
interface iProps {
  sidebar: String[];
  children: React.ReactNode;
}
export default function WizContent({ sidebar, children }: iProps) {
  return (
    <>
      <div className="grid grid-cols-5">
        <Sidebar sidebar={sidebar} />
        <div className="col-span-4">{children}</div>
      </div>
    </>
  );
}
