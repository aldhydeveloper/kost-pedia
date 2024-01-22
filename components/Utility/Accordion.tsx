import { useTransition } from 'react-transition-state';
import { Accordion as Acc, AccordionItem as Item } from '@szhsin/react-accordion';
import { FaChevronDown } from "react-icons/fa";

const AccordionItem = ({ header, ...rest }:any) => (
  <Item
    {...rest}
    header={({ state: { isEnter } }:any) => (
      <>
        {header}
        <FaChevronDown className={`duration-200 ease-out ml-auto ${isEnter && 'rotate-180'}`} />
      </>
    )}
    className="border-b"
    buttonProps={{
      className: ({ isEnter }:any) =>
        `flex w-full p-4 text-left hover:bg-slate-50 ${
          isEnter && "bg-slate-50"
        }`
    }}
    contentProps={{
      className: "transition-height duration-200 ease-out"
    }}
    panelProps={{ className: "p-4" }}
  />
);

interface iAccordion {
    data: { header: string; body: any; }[];
}
export default function Accordion({data}:iAccordion) {
  return (
    <Acc transition>
      {
        data.map((v, i) => {
          return (
            <AccordionItem header={v.header} key={i}>
              {v.body}
            </AccordionItem>
          )
        })
      }
      {/* <AccordionItem header="What is Lorem Ipsum?">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </AccordionItem>

      <AccordionItem header="Where does it come from?">
        Quisque eget luctus mi, vehicula mollis lorem. Proin fringilla
        vel erat quis sodales. Nam ex enim, eleifend venenatis lectus
        vitae, accumsan auctor mi.
      </AccordionItem>

      <AccordionItem header="Why do we use it?">
        Suspendisse massa risus, pretium id interdum in, dictum sit amet
        ante. Fusce vulputate purus sed tempus feugiat.
      </AccordionItem> */}
    </Acc>
  )
}