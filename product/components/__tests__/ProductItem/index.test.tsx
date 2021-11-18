import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ProductItem from '../../../../product/components/ProductItem'
import { Product } from 'product/types'
import { toFormatPrice } from '../../../../utils/toFormatPrice'

const product: Product = {
  id: 'id',
  title: 'Example',
  price: 100,
  image: '//placehold.it/80',
  category: 'category',
  description: 'A custom item for my product test',
}

describe('Product Item', () => {
  test('should show a title, price and image', () => {
    render(<ProductItem product={product} setProductSelected={jest.fn()} />)

    const priceRegex = new RegExp(String(product.price), 'i')

    expect(screen.getByText(product.title)).toBeInTheDocument()
    expect(screen.getByText(priceRegex)).toBeInTheDocument()
  })

  test('should generate modal when the user tab on the product item', () => {
    const onClick = jest.fn()
    render(<ProductItem product={product} setProductSelected={onClick} />)

    fireEvent.click(screen.getByRole('article'))
    expect(onClick).toHaveBeenCalled()
  })
})
