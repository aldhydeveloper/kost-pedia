import Checkbox from "@/components/Checkboxes/Checkbox";
import { Facilities } from "@/service";
import { memo, useEffect } from "react";

type tFacility = {
  id: string;
  name: string;
  checked: boolean;
};
interface iFacilities {
  dataFacilities: tFacility[];
  handleDataFacilities: (facilities: tFacility[]) => void;
}
const FacilitiesKost = memo(function FacilitiesKost({
  dataFacilities,
  handleDataFacilities,
}: iFacilities) {
  // const [facilitiesList, setFacilitiesList] = useState<tFacility[]>([]);
  useEffect(() => {
    if (dataFacilities.length === 0) {
      Facilities().then((resp) => {
        // console.log(resp);
        if (resp.success) {
          const temp = resp.data.map((v: tFacility) => {
            return { ...v, chekced: false };
          });
          // setFacilitiesList(temp);
          handleDataFacilities(temp);
        }
      });
    }
  }, [dataFacilities, handleDataFacilities]);
  console.log("rnder facilities");
  return (
    <>
      <label className="font-bold text-xl mb-6 block">Fasilitas Kost</label>
      {dataFacilities && (
        <ul className="grid grid-cols-2 gap-2 mb-8">
          {dataFacilities.map((v) => (
            <li key={v.id}>
              <Checkbox
                id={`check${v.id}`}
                value={v.id}
                label={v.name}
                checked={v.checked}
                name="facilities"
                onChange={({ target }) => {
                  // console.log(target);
                  const temp = dataFacilities.map((v) => {
                    // console.log(v.id === target.value);
                    if (v.id == target.value) {
                      return { ...v, checked: true };
                    } else {
                      return v;
                    }
                  });
                  handleDataFacilities(temp);
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
});

export default FacilitiesKost;
export type { tFacility };
