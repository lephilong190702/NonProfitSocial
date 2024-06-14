import React from "react";
import ApiConfig, { endpoints } from "../../configs/ApiConfig";
import { Link } from "react-router-dom";
import { saveAs } from "file-saver";

const Statistic = () => {
  const exportFinancialReport = async () => {
    try {
        let e = endpoints.statistic;
        e = `${e}?period=yearly&year=2023`
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
  return (
    <div>
      <Link href="#financial_report" onClick={exportFinancialReport}>
        BÁO CÁO TÀI CHÍNH
      </Link>
    </div>
  );
};

export default Statistic;
