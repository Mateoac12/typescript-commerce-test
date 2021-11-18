import { GetStaticProps, NextPage } from 'next'
import { Product } from 'product/types'
import api from 'product/api'
import ProductStore from 'product/screens/Store'

interface Props {
  products: Product[]
}

const RouteIndex: NextPage<Props> = ({ products }) => {
  return <ProductStore products={products} />
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list()

  return {
    props: {
      products,
    },
    revalidate: 10,
  }
}

export default RouteIndex
