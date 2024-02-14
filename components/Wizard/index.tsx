"use client";
import { Wizard } from "react-use-wizard";
import Sidebar from "./WizSidebar";
// import Content from "./WizContent";

interface iProps {
  sidebar: String[];
  children: React.ReactNode;
}
export default function wizard({ sidebar, children }: iProps) {
  return (
    <Wizard>
      <div className="grid grid-cols-4">
        <Sidebar sidebar={sidebar} />
        <div className="col-span-3">{children}</div>
      </div>
    </Wizard>
  );
}
