"use client";
import { getCookie } from "cookies-next";
import { useRef, useEffect, useState, memo } from "react";
import { Facilities } from "@/service";
import useSWR from "swr";

import Checkbox from "@/components/Checkboxes/Checkbox";

interface iRule {
  id: string;
  name: string;
  checked: boolean;
}
interface iFacilities {
  // facilities: iRule[];
  choosenFacilities: number[];
  // handleChange: (temp: iRule[]) => void;
  handleChangeChoose: (temp: number[]) => void;
}
const fetcher = (url: string) =>
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  }).then((res) => res.json());
const FacilitiesKost = function FacilitiesKost({
  // facilities,
  choosenFacilities,
  // handleChange,
  handleChangeChoose,
}: iFacilities) {
  const [checked, setChecked] = useState<number[]>(choosenFacilities);
  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_HOST}/facility/type/0`,
    fetcher,
    { revalidateIfStale: false }
  );
  console.log(checked);
  // const [facilities, setFacilities] = useState<iRule[]>([]);
  // useEffect(() => {
  //   console.log(facilities);
  //   if (facilities.length == 0) {
  //     (async () => {
  //       const res = await Facilities(0);
  //       console.log(res);
  //       if (res.success) {
  //         const resl = res.data.map((v: iRule, i: number) => {
  //           return {
  //             id: v.id,
  //             name: v.name,
  //           };
  //         });
  //         handleChange(resl);
  //       }
  //     })();
  //   }
  // }, [facilities, handleChange]);
  // sessionStorage.setItem("name", "wildan");
  // console.log(data);
  if (isLoading) return <div>Loading...</div>;
  // if (isLoading) return <>Loading</>;
  return (
    <>
      <div className="mb-4">
        <label>Fasilitas Kos</label>
        {data.data.map((v: iRule, i: number) => {
          return (
            <Checkbox
              id={v.id}
              name="rule"
              key={i}
              value={v.id}
              label={v.name}
              checked={checked.includes(parseInt(v.id))}
              onChange={({ target }) => {
                // const newRule = facilities.map((v: iRule) => {
                const val = parseInt(target.value);
                let temp = [];
                if (target.checked) {
                  temp = [...checked, val];
                } else {
                  temp = checked.filter((id) => id !== val);
                }
                setChecked(temp);
                handleChangeChoose(temp);
              }}
            />
          );
        })}
      </div>
    </>
  );
};

export default FacilitiesKost;
export type { iRule as iRule };
