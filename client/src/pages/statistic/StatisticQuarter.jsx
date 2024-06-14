import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ApiConfig, { endpoints } from '../../configs/ApiConfig';
import { saveAs } from 'file-saver';
import { Button, Pagination } from 'react-bootstrap';

const StatisticQuarter = () => {
  const [q] = useSearchParams();
  const [yearParams, setYearParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const exportFinancialReport = async (year, quarter) => {
    try {
      let e = endpoints.statistic;
      if (year !== null && quarter !== null) {
        e = `${e}?period=quarterly&year=${year}&quarter=${quarter}`;
      }
      const response = await ApiConfig.get(e, {
        responseType: 'arraybuffer',
      });

      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, `financial_report_${year}_Q${quarter}.xlsx`);
    } catch (error) {
      console.error(error);
    }
  };

  const currentYear = new Date().getFullYear();
  const startYear = 2021;
  const quarters = [];

  // Tạo danh sách các quý từ năm 2021 đến năm hiện tại
  for (let year = startYear; year <= currentYear; year++) {
    for (let quarter = 1; quarter <= 4; quarter++) {
      quarters.push({ year, quarter });
    }
  }

  // Tính toán phân trang
  const indexOfLastQuarter = currentPage * itemsPerPage;
  const indexOfFirstQuarter = indexOfLastQuarter - itemsPerPage;
  const displayedQuarters = quarters.reverse().slice(indexOfFirstQuarter, indexOfLastQuarter);

  // Hàm xử lý chuyển trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Tính số lượng trang
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(quarters.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container-stat">
      <h2>Statistic by Quarter</h2>
      <div className="button-container-stat">
        {displayedQuarters.map(({ year, quarter }) => (
          <Button key={`${year}-${quarter}`} onClick={() => exportFinancialReport(year, quarter)}>
            {`Quý ${quarter} năm ${year}`}
          </Button>
        ))}
      </div>
      <Pagination>
        {pageNumbers.map((number) => (
          <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
            {number}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default StatisticQuarter;
