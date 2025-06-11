import { create } from "zustand";
import type { tKost, tAddress } from "../component/FormType";
type FormState = {
  kost: tKost;
  address: tAddress;
  step: number;
};

type FormAction =
  | {
      type: "NEXT_STEP";
    }
  | {
      type: "PREV_STEP";
    }
  | {
      type: "SET_STEP";
      value: number;
    }
  | {
      type: "SET_FIELD";
      field: keyof tKost | keyof tAddress;
      value: string;
      param: keyof Omit<FormState, "step">;
    };

type ContextValue = {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
};

const initialState: FormState = {
  kost: {
    name: "",
    desc: "",
    created_year: "",
    category: "",
    kost_rules: [],
    admin_kost_name: "",
    admin_kost_phone: "",
  },
  address: {
    full_address: "",
    address_note: "",
    province_id: 0,
    city_id: 0,
    district_id: 0,
    village_id: 0,
  },
  step: 1,
};
const useStore = create<ContextValue>((set) => ({
  state: initialState,
  dispatch: (action: FormAction) => {
    set((store) => {
      const { state } = store;
      switch (action.type) {
        case "NEXT_STEP":
          return {
            ...store,
            state: {
              ...state,
              step: state.step + 1,
            },
          };

        case "PREV_STEP":
          return {
            ...store,
            state: {
              ...state,
              step: state.step - 1,
            },
          };

        case "SET_STEP":
          return {
            ...store,
            state: {
              ...state,
              step: action.value,
            },
          };

        case "SET_FIELD":
          return {
            ...store,
            state: {
              ...state,
              [action.param]: {
                ...state[action.param],
                [action.field]: action.value,
              },
            },
          };

        default:
          return store;
      }
    });
  },
}));

export default useStore;
