import { toFormatPrice } from '../toFormatPrice'

describe('currency', () => {
  it('toFormatPrice should show a normalize price', () => {
    const prevNumber = 100
    const normalizedNumber = '$\xa0100'

    expect(toFormatPrice(prevNumber)).toEqual(normalizedNumber)
  })
})
