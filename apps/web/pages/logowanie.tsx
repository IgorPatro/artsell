import { GetServerSideProps } from "next"
import { getServerSession } from "@artsell/hooks"
import { LoginForm } from "@artsell/ui"
import { Center } from "@chakra-ui/react"
import { pageMap } from "@artsell/constants"

const LoginPage = () => {
  return (
    <Center>
      <LoginForm />
    </Center>
  )
}

export default LoginPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx)

  if (session) {
    return {
      redirect: {
        destination: pageMap.home,
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
