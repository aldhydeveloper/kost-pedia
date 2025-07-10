"use client";
import { Facilities } from "@/service";
import Checkbox from "@/components/Checkboxes/Checkbox";
const dataPromise = Facilities();
const facilitiy = async (...props: any) => {
  const res = await dataPromise;
  console.log(props);
  return (
    <>
      {res.success
        ? res?.data.map((v: any, i: number) => {
            return (
              <Checkbox
                {...props}
                values={props.values}
                key={v.id}
                id={`check${v.id}`}
                value={v.name}
                label={v.name}
                name="facility"
                onChange={(e) => {
                  // props.state[v.id] = {};
                  // props.state.checked = true;
                }}
              />
            );
          })
        : ""}
    </>
  );
};

export default facilitiy;
