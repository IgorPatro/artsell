import * as S from "./CategoriesBar.styled"

const CategoriesBarData = [
  {
    key: 1,
    title: "Dla niej",
    path: "/",
  },
  {
    key: 2,
    title: "Dla niego",
    path: "/",
  },
  {
    key: 3,
    title: "Dziecko",
    path: "/",
  },
  {
    key: 4,
    title: "Akcesoria",
    path: "/",
  },
  {
    key: 5,
    title: "Dom & mieszkanie",
    path: "/",
  },
  {
    key: 6,
    title: "Sztuka",
    path: "/",
  },
  {
    key: 7,
    title: "Fotografia",
    path: "/",
  },
  {
    key: 8,
    title: "Specjalne",
    path: "/",
  },
]

export const CategoriesBar = () => {
  return (
    <S.CategoriesBarWrapper>
      <S.ItemsList>
        {CategoriesBarData.map((item) => (
          <S.ListElement key={item.key}>
            <S.ListLink href={item.path}>{item.title}</S.ListLink>
          </S.ListElement>
        ))}
      </S.ItemsList>
    </S.CategoriesBarWrapper>
  )
}
