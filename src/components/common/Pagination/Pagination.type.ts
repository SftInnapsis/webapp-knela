export interface PaginationProps {
   data: Array<any>;
   dataPerPage: number;
   setPageNumber: (value: any) => void;
   navPageNumber?: number;
}
