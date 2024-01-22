import data from '@/data/product.json';
import Product from '@/components/Product/product';
import Wrap from './wrapBugget';

const el = data['Apartment'].map((v, i) => {
  return (
    <Product folder="Apartment" img={v.img} name={v.name} address={v.address} price={v.price} route={`product/Apartment/${i}`} key={`lt3${i}`} />
  )
});
export default function Between35() {
  return (
    <Wrap comp={el} />
  )
}