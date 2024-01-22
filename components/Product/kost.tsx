
import products from '@/data/product.json';
import Product from './core';

async function getQuotes() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved');
    }, 4000);
  });
}

export default function Kost() {
  return (
    <>
      <Product data={ products['Kost'] } folder="Kost" />
    </>
  )
}