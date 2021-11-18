import * as React from 'react'
import { motion } from 'framer-motion'
import { Flex, Image, Stack, Tag, Text } from '@chakra-ui/react'

import { toFormatPrice } from '../../../utils/toFormatPrice'
import { Product } from 'product/types'

interface Props {
  product: Product
  setProductSelected: (product: Product) => void
}

const ProductItem: React.FC<Props> = ({ product, setProductSelected }) => {
  return (
    <Stack
      data-test-id='product-item'
      as={motion.article}
      onClick={() => setProductSelected(product)}
      key={product.id}
      border={'1px'}
      borderColor={'gray.200'}
      borderRadius={'md'}
      layoutId={product.id}
      padding={'2'}
      cursor={'pointer'}
      direction={'row'}
      justifyContent={'space-between'}
      _hover={{ shadow: 'xs' }}
    >
      <Flex direction={'column'} justifyContent={'space-between'}>
        <Text as={motion.p} layoutId={product.title}>
          {product.title}
        </Text>
        <Tag w={'max-content'}>{toFormatPrice(product.price)}</Tag>
      </Flex>
      <Image
        src={product.image}
        alt={product.title}
        w={'80px'}
        height={'80px'}
        objectFit={'contain'}
        borderRadius={'md'}
      />
    </Stack>
  )
}

export default ProductItem
