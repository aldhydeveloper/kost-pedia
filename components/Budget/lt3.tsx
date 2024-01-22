import data from '@/data/product.json';
import Product from '@/components/Product/product';
import Wrap from './wrapBugget';

const el = data['Kost'].map((v, i) => {
  return (
    <Product folder="Kost" img={v.img} name={v.name} address={v.address} price={v.price} route={`product/Kost/${i}`} key={`lt3${i}`} />
  )
});
    
export default function Lt3() {
  return (
    <Wrap comp={el} />
  )
}