import React from "react";
import ApiConfig, { endpoints } from "../../configs/ApiConfig";
import { Link, useSearchParams } from "react-router-dom";
import { saveAs } from "file-saver";
import { Button } from "react-bootstrap";
import "./statistic.css";

const Statistic = () => {
  const [q] = useSearchParams();
  const [yearParams, setYearParams] = useSearchParams();
  const exportFinancialReport = async (year) => {
    try {
      let e = endpoints.statistic;
      // const year = q.get("year");
      if (year !== null) e = `${e}?period=yearly&year=${year}`;
      const response = await ApiConfig.get(e, {
        responseType: "arraybuffer",
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "financial_report.xlsx");
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = (year) => {
    setYearParams({ year });
    exportFinancialReport(year);
  };

  const currentYear = new Date().getFullYear();
  const startYear = 2023;

  return (
    <>
      <h1 className="form-heading">BÁO CÁO TÀI CHÍNH NĂM</h1>
      <div className="container-stat">
        <div className="button-container-stat">
          {Array.from({ length: currentYear - startYear + 1 }, (_, index) => {
            const year = startYear + index;
            return (
              <Button
                key={year}
                className="year-stat-button"
                onClick={() => handleButtonClick(year)}
              >
                Năm {year}
              </Button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Statistic;
