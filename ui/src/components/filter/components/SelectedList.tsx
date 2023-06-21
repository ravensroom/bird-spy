interface SelectedListProps {
  items: string[];
}

const SelectedList: React.FC<SelectedListProps> = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => (
        <span key={index}>{item}</span>
      ))}
    </div>
  );
};

export default SelectedList;
