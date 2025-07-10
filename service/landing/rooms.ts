const Rooms = (id: string = "") => {
  const res = fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/landing/rooms${
      id !== "" ? "/" + id : ""
    }`,
    {
      method: "GET",
      cache: "no-store",
    }
  ).then((resp) => resp.json());
  return res;
};

export default Rooms;
