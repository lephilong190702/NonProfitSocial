package com.csn.charity.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserReactPostDTO {
    private Long userId;
    private Long postId;
    private String reaction;
}
