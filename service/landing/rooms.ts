const Rooms = (id: string | null = "") => {
  const res = fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/landing/rooms${
      id !== "" ? "/" + id : ""
    }`,
    {
      method: "GET",
    }
  ).then((resp) => resp.json());
  return res;
};

export default Rooms;
