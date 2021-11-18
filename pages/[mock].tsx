import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Product } from 'product/types'
import api from 'product/api'
import ProductStore from 'product/screens/Store'
import { ParsedUrlQuery } from 'querystring'

interface Props {
  products: Product[]
}

interface Params extends ParsedUrlQuery {
  mock: 'default' | 'empty'
}

const RouteIndex: NextPage<Props> = ({ products }) => {
  return <ProductStore products={products} />
}

export const getStaticProps: GetStaticProps<any, Params> = async ({
  params,
}) => {
  const products = await api.mock.list(params?.mock as string)

  return {
    props: {
      products,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: process.env.NODE_ENV === 'production' ? false : 'blocking',
  }
}

export default RouteIndex
