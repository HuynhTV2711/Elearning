import Pagination from "react-bootstrap/Pagination";
const renderPageNumbers = (page, totalPages, setPage) => {
    const pageNumbers = [];
    const maxVisiblePages = 7;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    for (let i = 1; i <= totalPages; i++) {
      const ispage = i === page;

      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - halfVisiblePages && i <= page + halfVisiblePages)
      ) {
        pageNumbers.push(
          <Pagination.Item key={i} active={ispage} onClick={() => setPage(i)}>
            {i}
          </Pagination.Item>
        );
      } else if (
        i === page - halfVisiblePages - 1 ||
        i === page + halfVisiblePages + 1
      ) {
        pageNumbers.push(<Pagination.Ellipsis key={i} />);
      }
    }

    return pageNumbers;
  };

  export{
    renderPageNumbers
  }