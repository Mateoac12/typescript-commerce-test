import { Product } from 'product/types'

import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  IconButton,
  Image,
  Link,
  Stack,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react'
import { PAGE } from 'constants/page'
import ListProducts from 'product/components/ListProducts'
import { toFormatPrice } from 'utils/toFormatPrice'
import { useEffect, useState } from 'react'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'

interface Props {
  products: Product[]
}

const ProductStore: React.FC<Props> = ({ products }) => {
  const [cart, setCart] = useState<Product[]>([])
  const [cartMessage, setCartMessage] = useState<string>('')

  // for set animations with framermotion
  const [productSelected, setProductSelected] = useState<Product | null>(null)

  useEffect(() => {
    const titleMessage = 'PEDIDO PARA MESA 8:\n'
    const bodyMessage = cart
      .map((product) => `*${product.title}: ${toFormatPrice(product.price)}.`)
      .join('\n')
    const footerMessage = `\nTotal: ${toFormatPrice(
      cart.reduce((total, current) => total + current.price, 0)
    )}`

    setCartMessage(titleMessage + bodyMessage + footerMessage)
  }, [cart])

  const handleAddCart = (product: Product) => {
    setCart((currentProducts) => currentProducts.concat(product))
    setProductSelected(null)
  }

  return (
    <>
      <Box>
        <Image
          src={'//placehold.it/992x200'}
          alt='background of banner'
          height={'180px'}
          w={'100%'}
          objectFit={'cover'}
        />
        <VStack paddingX={'4'} gridColumnGap={'4'}>
          <Image
            src='//placehold.it/120'
            alt={`Logo de ${PAGE.title}`}
            w={'120px'}
            height={'120px'}
            objectFit={'contain'}
            borderRadius={'full'}
            mt={'-8'}
            border={'2px solid white'}
          />
          <Stack>
            <Heading>{PAGE.title}</Heading>
            <Text color={'gray.600'}>{PAGE.description}</Text>
          </Stack>
        </VStack>
      </Box>

      <AnimateSharedLayout type='crossfade'>
        {products.length ? (
          <>
            <Heading>Productos</Heading>
            <Grid
              gridTemplateColumns={'repeat(auto-fill, minmax(280px, 1fr))'}
              gap={'2'}
            >
              <ListProducts
                products={products}
                setProductSelected={setProductSelected}
              />
            </Grid>
          </>
        ) : (
          <Tag
            textAlign={'center'}
            position={'absolute'}
            left={'50%'}
            mt={'8'}
            transform={'translateX(-50%)'}
            size={'lg'}
            colorScheme={'cyan'}
            data-test-id='alert-empty-products'
          >
            No hay productos
          </Tag>
        )}
        <AnimatePresence>
          {productSelected && (
            <Flex
              key='backdrop'
              alignItems={'center'}
              justifyContent={'center'}
              position={'fixed'}
              left={0}
              top={0}
              w={'100%'}
              h={'100vh'}
            >
              <Stack
                minW={'800px'}
                minHeight={'400px'}
                key='productModal'
                backgroundColor={'white'}
                border={'1px solid'}
                borderColor={'gray.100'}
                as={motion.article}
                layoutId={productSelected.id}
                borderRadius={'md'}
                position={'relative'}
              >
                <Image
                  src={productSelected.image}
                  alt={productSelected.title}
                  key='imageProductModal'
                  maxH={'200px'}
                  objectFit={'cover'}
                  w={'full'}
                  borderTopRadius={'md'}
                  filter={'brightness(0.8)'}
                />
                <IconButton
                  aria-label='Hidde modal'
                  position={'absolute'}
                  top={0}
                  right={'2'}
                  onClick={() => setProductSelected(null)}
                  icon={
                    <Image
                      src={'https://icongr.am/fontawesome/remove.svg?size=24'}
                      alt='cancel button'
                    />
                  }
                />
                <Flex p={'4'} direction={'column'} flex={'1'}>
                  <Box position={'absolute'} top={'40px'} left={'4'}>
                    <Heading
                      as={motion.h1}
                      layoutId={productSelected.title}
                      key='titleProductModal'
                    >
                      {productSelected.title}
                    </Heading>
                    <Tag size={'lg'} key='priceProductModal' mt={'4'}>
                      {toFormatPrice(productSelected.price)}
                    </Tag>
                  </Box>
                  {productSelected.description && (
                    <Text color={'gray.400'}>Descripcion:</Text>
                  )}
                  <Text key='descriptionProductModal'>
                    {productSelected.description}
                  </Text>
                </Flex>
                <Button
                  left={'50%'}
                  bottom={'4'}
                  transform={'translateX(-50%)'}
                  colorScheme={'yellow'}
                  w={'max-content'}
                  onClick={() => handleAddCart(productSelected)}
                >
                  Agregar al carrito de compras
                </Button>
              </Stack>
            </Flex>
          )}
        </AnimatePresence>
      </AnimateSharedLayout>
      {cart.length ? (
        <Button
          as={Link}
          href={`https://api.whatsapp.com/send/?phone=59898559874&text=${encodeURIComponent(
            cartMessage
          )}&app_absent=0`}
          isExternal
          colorScheme={'whatsapp'}
          position={'fixed'}
          bottom={'8'}
          left={'50%'}
          transform={'translateX(-50%)'}
          leftIcon={
            <Image
              src='https://icongr.am/jam/whatsapp.svg?size=20&color=ffffff'
              alt='Whatsapp icon'
            />
          }
        >
          Completar pedido ({cart.length} pedido/s)
        </Button>
      ) : null}
    </>
  )
}

export default ProductStore
