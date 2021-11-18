import axios from 'axios'
import Papa from 'papaparse'

import { PAGE } from 'constants/page'

import { Product } from './types'

export default {
  list: async (): Promise<Product[]> => {
    const { data: productsCSV }: any = await axios.get(PAGE.googleSheet, {
      responseType: 'blob',
    })

    return new Promise((resolve, reject) => {
      Papa.parse(productsCSV, {
        header: true,
        complete: (response) =>
          resolve(normalizeProduct(response.data as Product[])),
        error: (errors) => reject(errors.message),
      })
    })
  },
  mock: {
    list: (mock: string): Promise<Product[]> =>
      import(`product/mocks/${mock}.json`).then((result) => result.default),
  },
}

const normalizeProduct = (products: Product[]): Product[] =>
  products.map((product) => ({
    ...product,
    price: Number(product.price),
  }))
