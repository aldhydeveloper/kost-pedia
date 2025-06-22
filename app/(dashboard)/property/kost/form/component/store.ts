import { create } from "zustand";
import { devtools } from "zustand/middleware";

import type {
  tKost,
  tAddress,
  tImage,
  tFacilities,
  tRooms,
} from "../component/FormType";
type FormState = {
  id: string | null;
  kost: tKost;
  address: tAddress;
  image: tImage;
  facilities: tFacilities;
  rooms: tRooms[];
  step: number;
  submited: boolean;
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
      field:
        | keyof tKost
        | keyof tAddress
        | keyof tImage
        | keyof tFacilities
        | keyof tRooms;
      value: any;
      param: keyof Omit<FormState, "id" | "step" | "submited">;
    }
  | {
      type: "SET_FIELD_ROOM";
      value: tRooms[];
    }
  | {
      type: "SUBMITED";
      value: boolean;
    }
  | {
      type: "SET_KOST";
      state: Omit<FormState, "step" | "submited">;
    };

type ContextValue = {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
};

const initialStateRoom = {
  id: null,
  type_name: "",
  desc: "",
  p: 0,
  l: 0,
  price: 0,
  price_year: 0,
  facilities: [],
  bath_facilities: [],
  first_image: undefined,
  second_image: [],
  third_image: undefined,
  active: true,
  thumbnail: "",
};
const initialState: FormState = {
  id: null,
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
    address: "",
    address_note: "",
    province_id: 0,
    city_id: 0,
    district_id: 0,
    village_id: 0,
  },
  image: {
    first_image: undefined,
    second_image: [],
    third_image: undefined,
  },
  facilities: {
    value: [],
  },
  rooms: [initialStateRoom],
  step: 1,
  submited: false,
};
const useStore = create<ContextValue>()(
  devtools((set) => ({
    state: initialState,
    dispatch: (action: FormAction) => {
      // console.log(action);
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

          case "SET_FIELD_ROOM":
            return {
              ...store,
              state: {
                ...state,
                rooms: action.value,
              },
            };

          case "SUBMITED":
            return {
              ...store,
              state: {
                ...state,
                submited: action.value,
              },
            };

          case "SET_KOST":
            return {
              ...store,
              state: {
                ...state,
                ...action.state,
              },
            };

          default:
            return store;
        }
      });
    },
  }))
);

export default useStore;
export type { FormState };
export { initialStateRoom };
