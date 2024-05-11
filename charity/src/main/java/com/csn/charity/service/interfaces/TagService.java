package com.csn.charity.service.interfaces;

import java.util.List;

import com.csn.charity.model.Post;
import com.csn.charity.model.Tag;

public interface TagService {
    List<Tag> getAll();

    List<Tag> getTagsByPost(Long id);
}
