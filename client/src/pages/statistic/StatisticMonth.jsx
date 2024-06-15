import React, { useState } from "react";
import ApiConfig, { endpoints } from "../../configs/ApiConfig";
import { Link, useSearchParams } from "react-router-dom";
import { saveAs } from "file-saver";
import { Button, Pagination } from "react-bootstrap";
import "./statistic.css";

const StatisticMonth = () => {
  const [q] = useSearchParams();
  const [yearParams, setYearParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const exportFinancialReport = async (year, month) => {
    try {
      let e = endpoints.statistic;
      if (year !== null && month !== null) {
        e = `${e}?period=monthly&year=${year}&month=${month}`;
      }
      const response = await ApiConfig.get(e, {
        responseType: "arraybuffer",
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, `financial_report_${year}_${month}.xlsx`);
    } catch (error) {
      console.error(error);
    }
  };

  const currentYear = new Date().getFullYear();
  const startYear = 2021;
  const months = [];

  for (let year = startYear; year <= currentYear; year++) {
    const endMonth = year === currentYear ? new Date().getMonth() + 1 : 12;
    for (let month = 1; month <= endMonth; month++) {
      months.push({ year, month });
    }
  }

  const indexOfLastMonth = currentPage * itemsPerPage;
  const indexOfFirstMonth = indexOfLastMonth - itemsPerPage;
  const displayedMonths = months.reverse().slice(indexOfFirstMonth, indexOfLastMonth);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(months.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
    <h1 className="form-heading">BÁO CÁO TÀI CHÍNH THÁNG</h1>
    <div className="container-stat">
      <div className="button-container-stat">
      {displayedMonths.map((item, index) => (
          <Button key={index} className="month-button" onClick={() => exportFinancialReport(item.year, item.month)}>
            Tháng {item.month}, Năm {item.year}
          </Button>
        ))}
      </div>
      {/* <div className="pagination-stat">
      {Array.from({ length: Math.ceil(months.length / itemsPerPage) }, (_, index) => (
          <Button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Button>
        ))}
      </div> */}
      <Pagination>
          <Pagination.First onClick={() => paginate(1)} />
          <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
          {pageNumbers.map((number) => {
            if (number === 1 || number === currentPage || number === Math.ceil(months.length / itemsPerPage)) {
              return (
                <Pagination.Item
                  key={number}
                  active={number === currentPage}
                  onClick={() => paginate(number)}
                >
                  {number}
                </Pagination.Item>
              );
            } else if (number === currentPage - 1 || number === currentPage + 1) {
              return (
                <Pagination.Ellipsis key={number} disabled />
              );
            }
            return null;
          })}
          <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(months.length / itemsPerPage)} />
          <Pagination.Last onClick={() => paginate(Math.ceil(months.length / itemsPerPage))} />
        </Pagination>
    </div>
    </>
  );
};

export default StatisticMonth;
