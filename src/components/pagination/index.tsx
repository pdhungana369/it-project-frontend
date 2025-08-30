import React from 'react';
import { MdOutlineSkipNext, MdOutlineSkipPrevious } from 'react-icons/md';
import { TbPlayerTrackNext, TbPlayerTrackPrev } from 'react-icons/tb';

interface IProps {
  metaData: {
    currentPage: number;
    totalPages: number;
  };
  setPageNumber: any;
  pageLimit: any;
  setPageLimit: any;
}

const Pagination: React.FC<IProps> = ({
  metaData,
  setPageNumber,
  setPageLimit,
  pageLimit,
}) => {
  return (
    <div className="my-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 md:py-10">
      <button
        onClick={() => setPageNumber(1)}
        className="my-4 cursor-pointer rounded-lg bg-secondary p-1 disabled:bg-secondary disabled:bg-opacity-50 md:my-0"
        disabled={metaData?.currentPage === 1}
      >
        <TbPlayerTrackPrev size={20} color="#fff" />
      </button>
      <button
        onClick={() => setPageNumber((prev: number) => prev - 1)}
        disabled={metaData?.currentPage === 1}
        className="my-4 cursor-pointer rounded-lg bg-secondary p-1 disabled:bg-secondary disabled:bg-opacity-50 md:my-0"
      >
        <MdOutlineSkipPrevious size={20} color="#fff" />
      </button>
      <div className="flex items-center space-x-2 text-xs font-medium">
        <p>
          Page <span className="mx-1">{metaData?.currentPage}</span> of
          <span className="mx-1">{metaData?.totalPages} </span>
        </p>
      </div>
      <button
        onClick={() => setPageNumber((prev: number) => prev + 1)}
        disabled={metaData?.currentPage === metaData?.totalPages}
        className="my-4 cursor-pointer rounded-lg bg-secondary p-1 disabled:bg-secondary disabled:bg-opacity-50 md:my-0"
      >
        <MdOutlineSkipNext size={20} color="#fff" />
      </button>
      <button
        disabled={metaData?.currentPage === metaData?.totalPages}
        onClick={() => setPageNumber(metaData?.totalPages ?? 0)}
        className="my-4 cursor-pointer rounded-lg bg-secondary p-1 disabled:bg-secondary disabled:bg-opacity-50 md:my-0"
      >
        <TbPlayerTrackNext size={20} color="#fff" />
      </button>
      <div className="flex items-center gap-1">
        <p className="text-xs">Result Per Page</p>
        <select
          value={pageLimit}
          onChange={(e) => {
            setPageLimit(Number(e.target.value));
          }}
          className="flex items-center justify-center rounded border border-border bg-none px-3 py-1 text-sm font-normal focus:outline-0"
        >
          {[1, 5, 10, 20, 30, 40, 50].map((pageSize: number, idx: number) => (
            <option key={idx} value={pageSize} className="text-sm">
              {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default React.memo(Pagination);
