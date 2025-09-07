import {
  Button,
  Card,
  Container,
  Footer,
  Navbar,
  SearchBar,
} from '@components';
import useFetch from '@hooks';
import { useDebounce } from '@hooks/useDebounce';
import Service from '@setup/network';
import React from 'react';
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const navigate = useNavigate();

  const [categoryId, setCategoryId] = React.useState('');
  const [searchValue, setSearchValue] = React.useState('');
  const [categoriesDataWithProduct, setCategoriesDataWithProduct] =
    React.useState([]);

  const debouncedSearch = useDebounce(searchValue);

  const fetchProductsWithCategories = async () => {
    try {
      const { data } = await Service.get(
        `/product-with-category?categoryId=${categoryId ?? ''}&limit=${1000000}&page=${1}&search=${searchValue}`
      );
      setCategoriesDataWithProduct(data?.data ?? []);
    } catch (err: any) {
      console.log('error', err);
    }
  };

  const scrollRef = React.useRef<HTMLUListElement>(null);

  const scroll = (direction: string) => {
    if (scrollRef.current) {
      if (direction === 'left') {
        scrollRef.current.scrollBy({ left: -500, behavior: 'smooth' });
      } else if (direction === 'right') {
        scrollRef.current.scrollBy({ left: 500, behavior: 'smooth' });
      }
    }
  };

  const { data: categoryData } = useFetch(`/category`);

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event?.target?.value?.toLowerCase());
  };

  React.useEffect(() => {
    fetchProductsWithCategories();
  }, [categoryId, debouncedSearch]);

  return (
    <main>
      <Navbar />
      <Container>
        <section className="grid grid-cols-12 gap-5 py-20 md:gap-10">
          <div className="col-span-12 mt-10 pr-0 md:col-span-8 md:mt-20 md:pr-20">
            <h1 className="text-5xl font-bold text-primary">
              AgroFresh Connect
            </h1>
            <p className="mt-7 leading-8">
              AgroFresh Connect brings the best of Nepal's harvest directly from
              our farm to your table. No middlemen. Just fresh, affordable
              produce.
            </p>
            <Button
              variant="outline"
              text="Explore AgroFresh Connect"
              type="button"
              className="mt-10 px-9 py-3 text-lg font-semibold"
              onClick={() => navigate('/products')}
            />
          </div>
          <img
            src="/banner.jpg"
            alt="image-banner"
            className="hidden h-96 w-full rounded-lg object-cover md:col-span-4 md:block"
          />
        </section>
      </Container>

      <Container className="mx:px-0 px-4 py-5">
        <div className="flex items-center justify-end">
          <SearchBar
            onChange={handleChangeSearch}
            searchValue={searchValue}
            className="mt-5 w-full md:max-w-sm"
          />
        </div>
        <div className="mt-5 flex items-center">
          <button
            onClick={() => scroll('left')}
            className="rounded-full bg-border px-0.5 py-0.5 text-primary hover:bg-secondary hover:text-white"
          >
            <MdOutlineKeyboardArrowLeft className="h-4 w-4 md:h-7 md:w-7" />
          </button>

          <div className="mx-1 overflow-hidden md:mx-4">
            <ul
              ref={scrollRef}
              className="scrollbar-hide flex flex-row gap-x-2 overflow-y-scroll whitespace-nowrap"
            >
              <li
                className={`${
                  categoryId === ''
                    ? 'bg-primary font-normal text-white md:font-bold'
                    : 'border border-border text-primary'
                } cursor-pointer rounded-md px-4 py-2 text-xs md:text-sm`}
                role="tabpanel"
                onClick={() => setCategoryId('')}
              >
                All
              </li>
              {categoryData
                ? categoryData?.map((item: any) => (
                    <li
                      key={item?.id}
                      className={`${
                        item?.id === categoryId
                          ? 'bg-primary font-normal text-white md:font-bold'
                          : 'border border-border font-normal text-primary'
                      } cursor-pointer rounded-xl px-4 py-2 text-sm capitalize md:px-4 md:text-sm`}
                      role="tabpanel"
                      onClick={() => setCategoryId(item?.id)}
                    >
                      {item?.name}
                    </li>
                  ))
                : null}
            </ul>
          </div>

          <button
            onClick={() => scroll('right')}
            className="rounded-full bg-border px-0.5 py-0.5 text-primary hover:bg-secondary hover:text-white"
          >
            <MdOutlineKeyboardArrowRight className="h-4 w-4 md:h-7 md:w-7" />
          </button>
        </div>
        <section className="my-20 grid grid-cols-1 gap-5 md:grid-cols-3">
          {categoriesDataWithProduct?.map((item: any) => (
            <Card item={item} key={item?.id} />
          ))}
        </section>
      </Container>
      <Footer />
    </main>
  );
}
