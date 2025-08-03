export type tParams = {
  searchParams: {
    start: number;
    category: string;
    room_facilities: string;
    bath_facilities: string;
    rules: string;
    campus: string;
    q: string;
    city: string;
    district: string;
    minPrice: string;
    maxPrice: string;
    sorting: string;
  };
};

export type tLoc = {
  id: number;
  name: string;
};
export type tRooms = {
  id: string;
  name: string;
  thumbnail: string;
  price: number;
};

export type tKosts = {
  id: string;
  name: string;
  category: string;
  address: string;
  province: tLoc;
  city: tLoc;
  active_rooms: tRooms[];
};
