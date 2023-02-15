import * as S from "./Input.styled"

interface inputProps {
  placeholder?: string
}

export const Input = (props: inputProps) => {
  return <S.InputTest placeholder={props.placeholder} />
}

export default Input
