import * as S from "./NavigationIcon.styled"
import { StaticImageData } from "next/image"

interface NavigationIconProps {
  src: StaticImageData
  alt: string
  description: string
}

const NavigationIcon = ({ description, ...props }: NavigationIconProps) => {
  return (
    <S.IconWrapper>
      <S.IconImage {...props} />
      <S.IconDescritpion>{description}</S.IconDescritpion>
    </S.IconWrapper>
  )
}

export default NavigationIcon
