import { BsStarFill } from 'react-icons/bs';

const starFunction = (val = 1, size = 15, gap = 1) => {
  const star = (
    <div className={`flex items-center`} style={{ gap: gap }}>
      {Array(Math.round(val))
        .fill('')
        .map((_, idx) => (
          <BsStarFill size={size} color="#FFD938" key={idx} />
        ))}
    </div>
  );

  return star;
};

export default starFunction;
