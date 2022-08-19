import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type Image = {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
};

type ApiResult = {
  data: Image[];
  after?: string;
};

export default function Home(): JSX.Element {
  async function fetchImages({ pageParam = null }): Promise<ApiResult> {
    const results = await api
      .get<ApiResult>(`/api/images`, {
        params: {
          after: pageParam,
        },
      })
      .then(response => {
        return response.data;
      });
    return results;
  }
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<ApiResult>('images', fetchImages, {
    getNextPageParam: lastpage => lastpage.after || null,
  });

  const formattedData = useMemo(() => {
    return data?.pages.flatMap(pages =>
      pages.data.flatMap(dataImages => dataImages)
    );
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button mt={4} type="button" onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
