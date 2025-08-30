import { Link } from 'react-router-dom';

interface ICardProps {
  item: any;
}

export default function Card({ item }: ICardProps) {
  return (
    <Link
      key={item?.id}
      to={`/salon/${item?.id}`}
      className="rounded-md border border-border"
    >
      <img
        src={
          item?.imageUrl ??
          'https://kids.earth.org/wp-content/uploads/2022/04/Untitled-1024-%C3%97-768px-17.jpg'
        }
        className="h-72 w-full rounded-t-md object-cover"
        alt="Product image"
      />
      <div className="p-4">
        <h2 className="pt-2 text-2xl font-bold text-primary">{item?.name}</h2>
        <p
          className="mt-2 min-h-20 text-sm leading-7"
          dangerouslySetInnerHTML={{
            __html: item?.descriptions?.slice(0, 100),
          }}
        />
        <div className="my-5 flex justify-end pt-4">
          <h6 className="text-xl font-semibold text-danger">
            Rs. {item?.price}
          </h6>
        </div>
      </div>
    </Link>
  );
}
