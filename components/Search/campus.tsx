import Link from "next/link";
import Accordion from "@/components/Utility/Accordion";
import { FaMapMarkerAlt } from "react-icons/fa";
const data = [
  {
    city: "Bandung",
    campus: ["Lorem", "Ipsum", "simply", "dummy"],
  },
  {
    city: "Jakarta",
    campus: ["dummy", "Lorem", "Ipsum"],
  },
  {
    city: "Bogor",
    campus: ["dummy", "Lorem", "Ipsum", "simply"],
  },
  {
    city: "Surabay",
    campus: ["dummy", "Lorem", "Ipsum", "Ipsum", "Ipsum"],
  },
  {
    city: "Yogyakarta",
    campus: ["dummy", "Lorem", "Ipsum", "simply"],
  },
];
export default function Campus() {
  var dataAcc: any = [];
  data.forEach((v, i) => {
    dataAcc.push({
      header: v.city,
      body: v.campus.map((v2, i2) => {
        return (
          <Link
            href="/search"
            className="flex justify-between items-center pb-2 mb-3 px-2 border-b"
            key={i2}
          >
            <div className="rounded-full w-[2.5rem] h-[2.5rem] border flex justify-center items-center">
              <FaMapMarkerAlt />
            </div>
            {v2}
          </Link>
        );
      }),
    });
  });
  return (
    // data.map((v, i) => {
    //   return (
    <Accordion data={dataAcc} />
    // <Accordion
    //   key={i}
    //   header={v.city}
    //   body={
    //     v.campus.map((v2, i2) => {
    //       return (
    //         <div key={i2}>
    //           <FaMapMarkerAlt />
    //           {v2}
    //         </div>
    //       )
    //     })
    //   }
    // />
    //   )
    // })
  );
}
