import { Resolve } from '../../libs/return';

interface Paginate<T> {
  data: [T[], number];
  page: number;
  limit: number;
}

interface PaginationControls {
  totalItems: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number;
}

interface PaginationParams {
  page: number;
  limit: number;
}

interface Paginated<T> {
  items: T[];
  pagination: PaginationControls;
}

function PaginationProvider<T>({ data, limit, page }: Paginate<T>): Resolve {
  const [result, total] = data;
  const lastPage = Math.ceil(total / limit);
  const nextPage = page + 1 > lastPage ? null : page + 1;
  const prevPage = page - 1 < 1 ? null : page - 1;

  if (!data[0].length) {
    return { status: 204, success: true };
  }

  const formattedData = {
    items: [...result],
    pagination: {
      totalItems: total,
      currentPage: page,
      nextPage,
      prevPage,
      lastPage
    }
  };

  return { status: 200, success: true, data: formattedData };
}

export default PaginationProvider;
export { Paginated, Paginate, PaginationParams };
