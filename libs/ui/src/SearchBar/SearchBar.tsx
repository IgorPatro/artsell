import * as S from "./SearchBar.styled"

interface SearchBarProps {
  placeholder?: string
}

export const SearchBar = (props: SearchBarProps) => {
  return <S.SearchBar {...props} />
}

export default SearchBar
