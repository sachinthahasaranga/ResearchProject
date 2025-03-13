import React from "react";


const Pagination = ({ lecturesPerPage, totalLectures, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalLectures / lecturesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className="default-pagination lab-ul">
            <li onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={currentPage === 1 ? "disabled" : ""}>
                <a href="#"><i className="icofont-rounded-left"></i></a>
            </li>

            {pageNumbers.map((number) => (
                <li key={number} onClick={() => paginate(number)}
                className={currentPage === number ? "active" : ""}>
                    <a href="#">{number}</a>
                </li>
            ))}
            
            <li onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === pageNumbers.length}
                    className={currentPage === pageNumbers.length ? "disabled" : ""}>
                <a href="#"><i className="icofont-rounded-right"></i></a>
            </li>
        </ul>
    );
}
 
export default Pagination;