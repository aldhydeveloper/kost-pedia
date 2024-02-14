"use client";
import { useWizard } from "react-use-wizard";
interface iProps {
  sidebar: String[];
}
export default function WizSidebar({ sidebar }: iProps) {
  const { goToStep } = useWizard();
  return (
    <>
      <ul>
        {sidebar.map((v, i) => {
          return (
            <li key={i} onClick={() => goToStep(i)}>
              <label htmlFor={`input${i}`}>
                <input id={`input${i}`} type="radio" name="wizardInput" />
                {v}
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
}
