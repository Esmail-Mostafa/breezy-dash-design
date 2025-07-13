
import React from 'react'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';

function CustomPagination({page,setPage,totalPages}) {
  return (
    <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious
          onClick={(e) => {
            e.preventDefault();
            if (page > 1) setPage(page - 1);
          }}
        />
      </PaginationItem>

      {[...Array(totalPages)].map((_, i) => {
        const pageNum = i + 1;
        return (
          <PaginationItem key={pageNum}>
            <PaginationLink
              isActive={pageNum === page}
              onClick={(e) => {
                e.preventDefault();
                setPage(pageNum);
              }}
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        );
      })}

      <PaginationItem>
        <PaginationNext
          onClick={(e) => {
            e.preventDefault();
            if (page < totalPages) setPage(page + 1);
          }}
        />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
  )
}

export default CustomPagination