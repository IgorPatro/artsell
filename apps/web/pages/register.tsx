import { GetServerSideProps } from "next"
import { getServerSession } from "@artsell/hooks"
import { RegisterForm } from "@artsell/ui"
import { Center } from "@chakra-ui/react"

const RegisterPage = () => {
  return (
    <Center>
      <RegisterForm />
    </Center>
  )
}

export default RegisterPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx)

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
