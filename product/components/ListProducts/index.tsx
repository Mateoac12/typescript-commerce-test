import React, { Dispatch, SetStateAction } from 'react'
import { Product } from 'product/types'
import ProductItem from '../ProductItem'

interface Props {
  products: Product[]
  setProductSelected: Dispatch<SetStateAction<Product | null>>
}

const ListProducts: React.FC<Props> = ({ products, setProductSelected }) => {
  return (
    <>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          setProductSelected={setProductSelected}
        />
      ))}
    </>
  )
}

export default React.memo(ListProducts)
