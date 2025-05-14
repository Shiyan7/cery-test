import { useSearchParams, useRouter } from 'next/navigation';

export function usePagination<T>(items: T[], rowsPerPage: number = 25) {
  const router = useRouter();

  const rawParams = useSearchParams();

  const urlPage = rawParams?.get('page');

  const page = urlPage ? parseInt(urlPage) : 1;

  const totalPages = Math.ceil(items.length / rowsPerPage);

  const paginatedItems = items.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const onPageChange = (newPage: number) => {
    const newParams = new URLSearchParams(rawParams?.toString());
    if (newPage > 1) {
      newParams.set('page', newPage.toString());
    } else {
      newParams.delete('page');
    }
    router.replace(`?${newParams.toString()}`, { scroll: false });
  };

  return {
    page,
    totalPages,
    paginatedItems,
    onPageChange,
  };
}
