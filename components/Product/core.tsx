import ProductWrap from "./product";
// console.log(product)
interface MyProps {
  /** The text to display inside the button */
  folder: string;
  data: any;
}
interface dataProps {
  name: string;
  img: string;
  address: string;
  price: number;
  route: string;
}

export default function Product({ data, folder }: MyProps) {
  const datas: dataProps[] = data;

  return (
    <>
      <div className="scrollbar-none relative flex snap-x snap-mandatory flex-row space-x-4 overflow-x-auto md:snap-none md:px-0">
        {datas.map((v: any, i) => {
          return (
            <ProductWrap
              folder={folder}
              img={
                v.images.length > 0
                  ? v?.images[0]?.url
                  : "http://localhost:3000/img/empty-img.jpg"
              }
              name={v.name}
              address={v.address}
              price={v.price}
              route={`product/${v.id}`}
              key={i}
            />
          );
        })}
      </div>
    </>
  );
}
