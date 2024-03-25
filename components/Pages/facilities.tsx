import { Facilities } from "@/service";
import Checkbox from "@/components/Checkboxes/Checkbox";
const dataPromise = Facilities();
const facilitiy = async (...props: any) => {
  const res = await dataPromise;
  // console.log(res.data);
  return (
    <>
      {res.success
        ? res?.data.map((v: any, i: number) => {
            console.log(v);
            return (
              <Checkbox
                {...props}
                key={v.id}
                value={v.name}
                label={v.name}
                name="facility"
              />
            );
          })
        : ""}
    </>
  );
};

export default facilitiy;
