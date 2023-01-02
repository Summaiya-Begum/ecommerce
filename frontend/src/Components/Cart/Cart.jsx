import {
  Box,
  Button,
  Divider,
  Heading,
  List,
  Select,
  Stack,
  ListItem,
  HStack,
  useColorModeValue,
  Image,
  Flex,
  Spacer,
  SimpleGrid,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons'
import OrderSummary from './OrderSummary';
import { FiGift } from 'react-icons/fi'
import { Link } from "react-router-dom"
import ArrowUp from '../ArrowUp';
import { useDispatch, useSelector } from 'react-redux';
import { changeCartItems } from '../../Redux/cart/cart.action';



export const PackageTier = ({ item, handlePlus, handleMinus }) => {

  return (
    <>
      <Stack spacing="10" width="full" textAlign={'start'} direction={{ base: 'column', md: 'row' }}>
        <Image
          rounded="lg"
          width="150px"
          height="150px"
          fit="cover"
          src={item.category.image}
          alt={'cart'}
          draggable="false"
          loading="lazy"
          margin={'auto'}
        />
        <Box pt="4">
          <Stack spacing="0.5">
            <Text fontWeight="medium">Title: {item.title}</Text>
            <Text fontWeight="medium">Category: {item.category.name}</Text>
            <Text color={('gray.600', 'gray.400')} fontSize="sm">
              Description: {item.description}
            </Text>
          </Stack>

          <HStack spacing="1" mt="3" color={('gray.600', 'gray.400')}>
            <Icon as={FiGift} boxSize="4" />
            <Link fontSize="sm" textDecoration="underline">
              Add gift wrapping
            </Link>
          </HStack>
        </Box>
        <Box display='flex' alignItems='center' justifyContent={'center'} gap={2}>
          <Button  onClick={()=>handlePlus(item._id)}>+</Button>
          <Box as='span'>
            {item.quantity}
          </Box>
          <Button disabled={item.quantity==1} onClick={()=>handleMinus(item._id)}>-</Button>
        </Box>
        <Stack justifyContent={'center'} textAlign={'center'}>
          <Heading size={'1xl'}>₹{item.price * item.quantity}</Heading>
        </Stack>
        <Stack justifyContent={'center'}>
          <Button
            size="md"
            color={useColorModeValue('black', 'white')}
            bg={useColorModeValue('white', 'gray.800')}>
            <CloseIcon />
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

const Cart = () => {
  const dispatch = useDispatch()
  const { cartItems } = useSelector(state => state.cart)


  
  const handleMinus = (id) => {
    dispatch(changeCartItems(id,"minus"))
  }
  const handlePlus = (id) => {
    dispatch(changeCartItems(id,"plus"))
  }



  return (
    <>
      <Flex
        // border={'2px solid orange'}
        py={{
          lg: '5rem',
          md: '2rem'
        }}
        px={{
          lg: '1rem',
          md: '2rem'
        }}
        justifyContent={{
          base: 'flex-start',
          md: 'space-between',
          lg: 'space-arround',
        }}
        direction={{
          base: 'column',
          md: 'row',
        }}
        gap={15}
        m={'auto'}
      >

        <SimpleGrid
          direction={['row', 'column']}
          cursor={'pointer'} >
          <Stack spacing={4} width={'auto'} direction={'column'}>
            <VStack
              justifyContent={{
                base: 'flex-start',
                md: 'space-between',
              }}
              direction={{
                base: 'column',
                md: 'row',
              }}
              alignItems={'start'}
            >
              <Stack>
                <Heading size={'lg'}>
                  Cart  Items:  <span style={{ color: "#E80070" }}>{cartItems.length}</span>
                </Heading>
              </Stack>
            </VStack>
            {/* Passing data props */}
            {
              cartItems.map((el, i) => {
                // console.log(el)
                return <PackageTier item={el} handlePlus={handlePlus} handleMinus={handleMinus} key={i}/>
              })
            }
          </Stack>
          <Divider />
        </SimpleGrid>

        <Flex direction="column" align="end" flex="1"  >
          <OrderSummary />
          <HStack fontWeight="semibold">
            <p>or</p>
            <Link color={('blue.500', 'blue.200')} to={'/'}>Continue shopping</Link>
          </HStack>
        </Flex>
      </Flex>
      <ArrowUp />
    </>
  );
};

export default Cart;