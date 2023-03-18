import { Product, fetchProducts } from "@artsell/network"
import Link from "next/link"
import { Button, Search } from "@artsell/ui"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react"
import { Avatar } from "@chakra-ui/react"

interface Props {
  data: Product[]
}

const IndexPage = ({ data }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="underline text-red-500 font-bold">
            Modal Title
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="flex flex-col gap-2">
            <Avatar
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
              className="w-36"
            />
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non libero
            velit sunt quia eos neque vero soluta, quas possimus fugiat
            consectetur nihil in perspiciatis laudantium doloremque placeat
            tempora. Ab, dolores?
          </ModalBody>

          <ModalFooter>
            <button onClick={onClose} className="underline">
              Close
            </button>
            <button>Secondary Action</button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <h1 className="text-3xl font-bold underline">Index Page</h1>
      <Link href="/cart">Koszyk</Link>
      <Button onClick={onOpen}>Open Modal</Button>
      <br />
      <br />
      <Tabs>
        <TabList>
          <Tab>One</Tab>
          <Tab>Two</Tab>
          <Tab>Three</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Search />
      {data.map((product) => (
        <div key={product.id}>
          <Link href={`/product/${product.slug}`}>{product.name}</Link>
        </div>
      ))}
      <Button onClick={() => console.log("TEST")}>Child</Button>
    </>
  )
}

export default IndexPage

export const getServerSideProps = async () => {
  const data = await fetchProducts()

  return {
    props: {
      data,
    },
  }
}
