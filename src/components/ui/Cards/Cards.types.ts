export interface CardItemProps {
  title?: string | undefined;
  description: string[];
}

export interface CardsProps {
  data: CardItemProps[];
}
