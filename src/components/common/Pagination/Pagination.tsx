import React from "react";
// import ReactPaginate from "react-paginate";
import { PaginationProps } from "./Pagination.type";

import "./Pagination.sass";
import { useEffect } from "react";

export const Pagination = (props: PaginationProps) => {
   const pageCount = Math.ceil(props.data.length / props.dataPerPage);

   // const changePage = ({ selected }) => {
   //    props.setPageNumber(selected);
   // };

   return (
      <div className="c-pagination">
         {/* <ReactPaginate
            previousLabel={"‹"}
            nextLabel={"›"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"c-pagination-btn"}
            previousLinkClassName={"c-pagination-btn__prev"}
            nextLinkClassName={"c-pagination-btn__next"}
            disabledClassName={"c-pagination-btn--disabled"}
            activeClassName={"c-pagination-btn--active"}
            initialPosition={props?.navPageNumber}
            forcePage={props?.navPageNumber}
         /> */}
      </div>
   );
};
