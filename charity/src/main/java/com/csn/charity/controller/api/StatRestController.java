package com.csn.charity.controller.api;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.sql.Date;
import java.time.ZoneId;
import java.util.List;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.apache.poi.ss.usermodel.*;
import com.csn.charity.model.UserContributeProject;
import com.csn.charity.service.interfaces.DonateService;
import com.csn.charity.service.interfaces.StatService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api")
public class StatRestController {

    @Autowired
    private DonateService donateService;
    @Autowired
    private StatService statService;

    // @GetMapping("/export/")
    // @CrossOrigin
    // public void exportContributionsToExcel(HttpServletResponse response) throws
    // IOException {
    // response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    // List<UserContributeProject> contributions = donateService.getAllContribute();

    // Workbook workbook = new XSSFWorkbook();
    // Sheet sheet = workbook.createSheet("Contributions");

    // // Tạo hàng tiêu đề
    // Row headerRow = sheet.createRow(0);
    // headerRow.createCell(0).setCellValue("DỰ ÁN");
    // headerRow.createCell(1).setCellValue("TÀI KHOẢN QUYÊN GÓP");
    // headerRow.createCell(2).setCellValue("SỐ TIỀN QUYÊN GÓP");
    // headerRow.createCell(3).setCellValue("NGÀY QUYÊN GÓP");

    // // Thêm dữ liệu từ contributions vào Excel
    // int rowNum = 1;
    // for (UserContributeProject contribution : contributions) {
    // Row row = sheet.createRow(rowNum++);
    // row.createCell(0).setCellValue(contribution.getProject().getTitle());
    // row.createCell(1).setCellValue(contribution.getUser().getUsername());
    // row.createCell(2).setCellValue(contribution.getDonateAmount().doubleValue());
    // row.createCell(3).setCellValue(contribution.getDonateDate().toString());
    // }

    // // Ghi workbook vào HttpServletResponse
    // ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    // workbook.write(outputStream);
    // workbook.close();

    // // Ghi workbook từ ByteArrayOutputStream vào HttpServletResponse
    // response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    // response.setHeader("Content-Disposition", "attachment;
    // filename=contributions.xlsx");
    // response.getOutputStream().write(outputStream.toByteArray());
    // response.getOutputStream().flush();
    // }

    // @GetMapping("/export/")
    // @CrossOrigin
    // public void exportStatsToExcel(
    // @RequestParam(name = "period") String period,
    // @RequestParam(name = "year", required = false) Integer year,
    // HttpServletResponse response) throws IOException {

    // response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    // List<StatDTO> stats;

    // if ("monthly".equals(period) && year != null) {
    // stats = statService.getTotalDonationByMonth(year);
    // } else if ("quarterly".equals(period) && year != null) {
    // stats = statService.getTotalDonationByQuarter(year);
    // } else if ("yearly".equals(period)) {
    // stats = statService.getTotalDonationByYear();
    // } else {
    // throw new IllegalArgumentException("Invalid period specified");
    // }

    // Workbook workbook = new XSSFWorkbook();
    // Sheet sheet = workbook.createSheet("Statistics");

    // // Create header row
    // Row headerRow = sheet.createRow(0);
    // headerRow.createCell(0).setCellValue("YEAR");
    // if ("monthly".equals(period)) {
    // headerRow.createCell(1).setCellValue("MONTH");
    // } else if ("quarterly".equals(period)) {
    // headerRow.createCell(1).setCellValue("QUARTER");
    // }
    // headerRow.createCell(2).setCellValue("TOTAL DONATION");

    // // Add data rows
    // int rowNum = 1;
    // for (StatDTO stat : stats) {
    // Row row = sheet.createRow(rowNum++);
    // row.createCell(0).setCellValue(stat.getYear());
    // if ("monthly".equals(period)) {
    // row.createCell(1).setCellValue(stat.getMonth());
    // } else if ("quarterly".equals(period)) {
    // row.createCell(1).setCellValue(stat.getQuarter());
    // }
    // row.createCell(2).setCellValue(stat.getTotalDonation().doubleValue());
    // }

    // // Write workbook to response
    // ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    // workbook.write(outputStream);
    // workbook.close();

    // // Set response headers
    // response.setHeader("Content-Disposition", "attachment;
    // filename=donation_stats.xlsx");
    // response.getOutputStream().write(outputStream.toByteArray());
    // response.getOutputStream().flush();
    // }

    @GetMapping("/export/")
    @CrossOrigin
    public void exportContributionsToExcel(
            @RequestParam(name = "period", required = false) String period,
            @RequestParam(name = "year", required = false) Integer year,
            @RequestParam(name = "month", required = false) Integer month,
            @RequestParam(name = "quarter", required = false) Integer quarter,
            HttpServletResponse response) throws IOException {

        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        List<UserContributeProject> contributions;

        if ("monthly".equals(period) && year != null && month != null) {
            contributions = statService.getMonthlyContributions(month, year);
        } else if ("quarterly".equals(period) && year != null && quarter != null) {
            contributions = statService.getQuarterlyContributions(quarter, year);
        } else if ("yearly".equals(period) && year != null) {
            contributions = statService.getYearlyContributions(year);
        } else {
            contributions = donateService.getAllContribute();
        }

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Contributions");

        CellStyle currencyStyle = workbook.createCellStyle();
        DataFormat dataFormat = workbook.createDataFormat();
        currencyStyle.setDataFormat(dataFormat.getFormat("#,##0"));

        CellStyle dateStyle = workbook.createCellStyle();
        CreationHelper createHelper = workbook.getCreationHelper();
        dateStyle.setDataFormat(createHelper.createDataFormat().getFormat("dd/MM/yyyy"));

        // Create header row
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("DỰ ÁN");
        headerRow.createCell(1).setCellValue("TÀI KHOẢN QUYÊN GÓP");
        headerRow.createCell(2).setCellValue("SỐ TIỀN QUYÊN GÓP");
        headerRow.createCell(3).setCellValue("HIỆN VẬT QUYÊN GÓP");
        headerRow.createCell(4).setCellValue("NGÀY QUYÊN GÓP");

        headerRow.getCell(2).setCellStyle(currencyStyle);
        // Add data rows
        int rowNum = 1;
        for (UserContributeProject contribution : contributions) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(contribution.getProject().getTitle());
            row.createCell(1).setCellValue(contribution.getUser().getUsername());
            Cell amountCell = row.createCell(2);
            amountCell.setCellValue(contribution.getDonateAmount().doubleValue());
            amountCell.setCellStyle(currencyStyle);
            row.createCell(3).setCellValue(contribution.getDonateItem());
            row.createCell(4).setCellValue(
                    Date.from(contribution.getDonateDate().atStartOfDay(ZoneId.systemDefault()).toInstant()));
            row.getCell(4).setCellStyle(dateStyle);
        }

        // Write workbook to response
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();

        // Set response headers
        response.setHeader("Content-Disposition", "attachment; filename=contributions.xlsx");
        response.getOutputStream().write(outputStream.toByteArray());
        response.getOutputStream().flush();
    }

    @GetMapping("/monthly/")
    public ResponseEntity<List<Integer>> getMonthlyReports() {
        List<Integer> monthlyData = statService.getMonthlyWithData();
        return ResponseEntity.ok().body(monthlyData);
    }

    @GetMapping("/quarterly/")
    public ResponseEntity<List<Integer>> getQuarterlyReports() {
        List<Integer> quarterlyData = statService.getQuarterlyWithData();
        return ResponseEntity.ok().body(quarterlyData);
    }

    @GetMapping("/yearly/")
    public ResponseEntity<List<Integer>> getYearlyReports() {
        List<Integer> yearlyData = statService.getYearlyWithData();
        return ResponseEntity.ok().body(yearlyData);
    }

}
