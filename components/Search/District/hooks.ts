import { useEffect, useState } from "react";
import Get from "@/service/get";
import { iParams } from "./district";

export function useDistrict(cityId: number) {
  const [district, setDistrict] = useState<iParams[]>([]);

  useEffect(() => {
    const resp = Get(
      `${process.env.NEXT_PUBLIC_API_HOST}/loc/district/${cityId}`,
      "default"
    );

    // console.log(resp);
    resp
      .then((resl) => {
        setDistrict(resl.data);
      })
      .catch(() => {});
  }, [cityId]);

  return { district };
}
