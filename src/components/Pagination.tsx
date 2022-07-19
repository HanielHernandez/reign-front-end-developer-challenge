import { FC } from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export const Pagination: FC<PaginationProps> = () => {
  return <div className="pagination"></div>;
};

export default Pagination;
