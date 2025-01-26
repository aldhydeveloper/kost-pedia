"use client";
// import Product from "@/components/Product/product";
// import products from "@/data/product.json";

// var data: any = [];
// // Object.keys(products).forEach((v: string, i) => {
// data.push(
//   products["Kost"].map((v2: any, i2: any) => {
//     return (
//       <Product
//         folder="Kost"
//         img={v2.img}
//         name={v2.name}
//         address={v2.address}
//         price={v2.price}
//         route={`/product/Kost/${i2}`}
//         key={i2}
//       />
//     );
//   })
// );
// data.push(
//   products["Apartment"].map((v2: any, i2: any) => {
//     return (
//       <Product
//         folder="Apartment"
//         img={v2.img}
//         name={v2.name}
//         address={v2.address}
//         price={v2.price}
//         route={`/product/Apartment/${i2}`}
//         key={i2}
//       />
//     );
//   })
// );
// });
export default function Search() {
  return (
    <div className="container px-8 mx-auto my-36">
      <h2 className="text-xl mb-6">Hasil Pencarian</h2>
      
      {/* <div className="grid grid-cols-5 gap-6">{data}</div> */}
    </div>
  );
}
