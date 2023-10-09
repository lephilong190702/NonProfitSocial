package com.csn.charity.model;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDoc {
    private Long id;
    private String displayName;
    private Boolean active;
    private Date updateAt;
    
    @Override
    public String toString() {
        return "UserDoc [id=" + id + ", displayName=" + displayName + ", active=" + active + ", updateAt=" + updateAt
                + "]";
    }

    
}
