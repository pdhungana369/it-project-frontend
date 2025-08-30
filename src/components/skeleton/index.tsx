import React from 'react';

interface IProps {
  height: string;
  width?: string;
}

const Skeleton: React.FC<IProps> = ({ height, width }) => {
  return (
    <div role="status" className="animate-pulse shadow-sm">
      <div className={`${height} ${width} bg-skeleton dark:bg-skeleton-dark`} />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default React.memo(Skeleton);
