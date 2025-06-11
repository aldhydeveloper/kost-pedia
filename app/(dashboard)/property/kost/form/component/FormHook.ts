"use client";
import { useCallback } from "react";
import { useFormContext, FormState } from "../context/FormContext";
import { tKost, tAddress } from "./FormType";
import NumberFormat from "react-number-format";

type tParam = keyof Omit<FormState, "step">;
export const useForm = () => {
  const { state, dispatch } = useFormContext();
  const dispactInput = useCallback(
    (
      name: keyof tKost,
      value: string | number | string[] | number[],
      param: tParam
    ) => {
      dispatch({
        type: "SET_FIELD",
        field: name,
        value: value,
        param: param,
      });
    },
    [dispatch]
  );

  const handleInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispactInput(
      e.target.name as keyof tKost,
      e.target.value,
      e.target.getAttribute("data-param") as tParam
    );
  };

  const handleInputFormatNumber = (
    values: NumberFormat.NumberFormatValues,
    name: keyof tKost,
    param: tParam
  ) => {
    dispactInput(name, values.floatValue as number, param);
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const val = parseInt(target.value);
    let temp: number[] = [];
    if (target.checked) {
      temp = [...state.kost.kost_rules, val];
    } else {
      temp = state.kost.kost_rules.filter((id) => id !== val);
    }
    dispactInput(
      e.target.name as keyof tKost,
      temp,
      e.target.getAttribute("data-param") as tParam
    );
  };

  return { handleInput, handleInputFormatNumber, handleCheckbox };
};
