import { Card, Container, Footer, Navbar } from '@components';
import SearchBar from '@components/search-bar';
import useFetch from '@hooks';
import { useState } from 'react';

export default function Services() {
  const [searchValue, setSearchValue] = useState('');

  const { data: salonList } = useFetch('/product?limit=100000');

  const filterSearch =
    salonList?.length > 0
      ? salonList?.filter((item: any) =>
          item?.name?.toLowerCase()?.includes(searchValue?.toLowerCase())
        )
      : [];

  return (
    <main>
      <Navbar />
      <Container>
        <section className="mb-5 mt-10 flex items-center justify-center">
          <SearchBar
            searchValue={searchValue}
            onChange={(event) => setSearchValue(event?.target?.value)}
          />
        </section>

        <section className="mb-10 mt-20 grid flex-1 grid-cols-1 gap-5 md:grid-cols-3">
          {filterSearch?.length > 0 ? (
            filterSearch?.map((item: any, index: number) => (
              <Card key={index} item={item} />
            ))
          ) : (
            <div className="flex h-[35dvh] items-center justify-center">
              <p className="text-center text-4xl font-semibold text-danger">
                No items found
              </p>
            </div>
          )}
        </section>
      </Container>
      <Footer />
    </main>
  );
}
