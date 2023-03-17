import { Product, fetchProducts } from "@artsell/network"
import Link from "next/link"
import { Button } from "@artsell/ui"
import { Button as Button2 } from "@chakra-ui/react"
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react"
import { Input } from "@chakra-ui/react"
import { Skeleton, Stack } from "@chakra-ui/react"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
interface Props {
  data: Product[]
}

const IndexPage = ({ data }: Props) => {
  return (
    <>
      <h1>Index Page</h1>
      <Link href="/cart">Koszyk</Link>
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
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Your browser is outdated!</AlertTitle>
        <AlertDescription>
          Your Chakra experience may be degraded.
        </AlertDescription>
      </Alert>
      <Input placeholder="Basic usage" />
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
      <br />
      {data.map((product) => (
        <div key={product.id}>
          <Link href={`/product/${product.slug}`}>{product.name}</Link>
        </div>
      ))}
      <Button2 colorScheme="teal" size="lg">
        Button
      </Button2>
      <Button>Click me</Button>
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
