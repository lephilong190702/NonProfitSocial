package com.csn.charity.service.interfaces;

import java.util.List;

import com.csn.charity.dto.ReportDTO;
import com.csn.charity.model.UserReportPost;

public interface ReportService {
    List<UserReportPost> getReportPost();

    void resolvedReport(Long reportId);

    void skipReport(Long reportId);

    UserReportPost getById(Long id);

    UserReportPost report(ReportDTO reportDTO);
}
