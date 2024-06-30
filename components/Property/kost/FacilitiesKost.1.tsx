import { Facilities } from "@/service";
import { memo, useEffect } from "react";
import { iFacilities } from "./FacilitiesKost";

export const FacilitiesKost = memo(function FacilitiesKost({
  datafacilities,
  handleDataFacilities,
}: iFacilities) {
  useEffect(() => {
    Facilities().then((resp) => {
      console.log(resp);
    });
  });
  return <></>;
});
