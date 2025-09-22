import { VisualItem } from "../Api";

interface CardProps {
  item: VisualItem;
}

const Card = ({ item }: CardProps) => {
  return (
    <div className="card">
      <img src={item.imagePath} alt={item.name} />
      <hr />
      <div>{item.name}</div>
      <p>{item.description}</p>
    </div>
  );
};

export default Card;
