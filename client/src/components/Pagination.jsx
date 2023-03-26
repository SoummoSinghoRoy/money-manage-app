import React  from 'react';

const Pagination = ({currentpage, transactionsPerPage, totaltransactions, paginationHandler, previousPage, nextPage}) => {
  const pageNumber = []

  for (let i = 1; i <= Math.ceil(totaltransactions / transactionsPerPage); i++) {
    pageNumber.push(i)
    
  }
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center my-2">
        <li className="page-item" onClick={previousPage}>
          <a className="page-link" style={currentpage === 1 ? {background: "#F8F9FA"}: {cursor: "pointer"}}>
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        { pageNumber.map((number) => (
               <li key={number} className={currentpage === number ? "active page-item": "page-item"} onClick={() => paginationHandler(number)}>
                <a className="page-link" style={{cursor: "pointer"}}>
                  {number}
                </a>
               </li>
            ))}
        <li className="page-item" onClick={nextPage}>
          <a className="page-link" style={currentpage === pageNumber.length ? {background: "#F8F9FA"}: {cursor: "pointer"}}>
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination;