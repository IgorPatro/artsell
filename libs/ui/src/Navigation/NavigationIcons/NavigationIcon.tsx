import * as S from "./NavigationIcon.styled"

interface Props {
  src: string
  alt: string
  description: string
  width?: number
  height?: number
}

const NavigationIcon = (props: Props) => {
  return (
    <S.IconWrapper>
      <S.IconImage
        src={props.src}
        alt={props.alt}
        width={props.width}
        height={props.height}
      />
      <S.IconDescritpion>{props.description}</S.IconDescritpion>
    </S.IconWrapper>
  )
}

export default NavigationIcon
