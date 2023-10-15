package com.csn.charity.controller.api;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import java.util.List;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.csn.charity.model.UserContributeProject;
import com.csn.charity.service.interfaces.DonateService;

import jakarta.servlet.http.HttpServletResponse;

@RestController 
@RequestMapping("/api")
public class StatRestController {

    @Autowired
    private DonateService donateService;

    @GetMapping("/export/")
    @CrossOrigin
    public void exportContributionsToExcel(HttpServletResponse response) throws IOException {
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        List<UserContributeProject> contributions = donateService.getAllContribute();

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Contributions");

        // Tạo hàng tiêu đề
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("DỰ ÁN");
        headerRow.createCell(1).setCellValue("TÀI KHOẢN QUYÊN GÓP");
        headerRow.createCell(2).setCellValue("SỐ TIỀN QUYÊN GÓP");
        headerRow.createCell(3).setCellValue("NGÀY QUYÊN GÓP");

        // Thêm dữ liệu từ contributions vào Excel
        int rowNum = 1;
        for (UserContributeProject contribution : contributions) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(contribution.getProject().getTitle());
            row.createCell(1).setCellValue(contribution.getUser().getUsername());
            row.createCell(2).setCellValue(contribution.getDonateAmount().doubleValue());
            row.createCell(3).setCellValue(contribution.getDonateDate().toString());
        }

        // Ghi workbook vào HttpServletResponse
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();

        // Ghi workbook từ ByteArrayOutputStream vào HttpServletResponse
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=contributions.xlsx");
        response.getOutputStream().write(outputStream.toByteArray());
        response.getOutputStream().flush();
    }
}
