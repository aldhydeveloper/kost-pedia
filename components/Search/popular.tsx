import Link from "next/link";
type iData = {
  [key: string]: any;
};
const data: iData = {
  Jakarta: ["Lorem", "Ipsum", "Dummy", "Text", "Printing"],
  Bandung: ["Ipsum", "Lorem", "Text", "Printing"],
  Bogor: ["Ipsum", "Printing", "Text", "Lorem"],
  Surabaya: ["Ipsum", "Text", "Printing", "Ipsum"],
  Yogyakarta: ["Ipsum", "Lorem", "Text", "Printing"],
};

// const revalidate = 60;
const Popular = async ({ name }: any) => {
  // const key:keyof iData = name;
  //  await new Promise<any>((resolve) => {
  //     setTimeout(() => {
  //       resolve(
  //         console.log('wildan')
  //       )
  //     }, 500)
  //   })
  return (
    <>
      {data[name].map((v: string, i: number) => {
        return (
          <Link
            href={`/search/${v}`}
            className="rounded-full border px-6 py-1 text-center"
            key={i}
          >
            {v}
          </Link>
        );
      })}
    </>
  );
};

export default Popular;
