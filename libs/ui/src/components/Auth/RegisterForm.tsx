import React from "react"
import { useRouter } from "next/router"
import {
  RegisterSchema,
  type RegisterRequest,
  RegisterResponse,
  fetchRegister,
} from "@artsell/network"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import {
  FormErrorMessage,
  FormControl,
  Input,
  Button,
  Box,
  Text,
  Link,
  Checkbox,
  useToast,
} from "@chakra-ui/react"
import NextLink from "next/link"
import { pageMap } from "@artsell/constants"

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    resolver: zodResolver(RegisterSchema),
  })
  const toast = useToast()

  const router = useRouter()

  const registerMutation = useMutation<
    RegisterResponse,
    Error,
    RegisterRequest
  >({
    mutationFn: async (data: RegisterRequest) => fetchRegister(data),
    onSuccess: () => router.push("/login"),
    onError: (error) =>
      toast({
        title: "Błąd logowania",
        position: "bottom-right",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      }),
  })

  const onSubmit = handleSubmit((data) => registerMutation.mutate(data))

  return (
    <Box className="flex flex-col max-w-sm bg-white shadow-lg p-10 rounded-lg">
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <FormControl isInvalid={!!errors.firstName}>
          <Input placeholder="Imię" {...register("firstName")} />
          <FormErrorMessage>{errors?.firstName?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.lastName}>
          <Input placeholder="Nazwisko" {...register("lastName")} />
          <FormErrorMessage>{errors?.lastName?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.email}>
          <Input placeholder="Email" type="email" {...register("email")} />
          <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <Input
            placeholder="Hasło"
            type="password"
            {...register("password")}
          />
          <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.repPassword}>
          <Input
            placeholder="Hasło"
            type="password"
            {...register("repPassword")}
          />
          <FormErrorMessage>{errors?.repPassword?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.isTermsAccepted}>
          <Checkbox {...register("isTermsAccepted")} color="gray.400">
            <Text fontSize="sm">Akceptuję regulamin serwisu</Text>
          </Checkbox>
        </FormControl>
        <Button type="submit" isLoading={registerMutation.isLoading}>
          Zarejestruj się
        </Button>
      </form>
      <Text color="gray.600" mt="5" mb="3">
        Masz już konto?{" "}
        <Link as={NextLink} href={pageMap.login} color="yellow.400">
          Zaloguj się
        </Link>
      </Text>
      <Text color="gray.600" fontSize="xs">
        Rejestrując się do Artsell akceptujesz{" "}
        <Link as={NextLink} href={pageMap.statute} color="yellow.400">
          Regulamin
        </Link>{" "}
        w aktualnym brzmieniu obowiązującym od dnia 21.03.2023. Informacje o
        planowanych oraz archiwalnych zmianach Regulaminu są dostępne na
        stronie.
      </Text>
    </Box>
  )
}
