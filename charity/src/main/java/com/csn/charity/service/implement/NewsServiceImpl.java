package com.csn.charity.service.implement;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.csn.charity.model.New;
import com.csn.charity.model.NewCategory;
import com.csn.charity.repository.NewsCategoryRepository;
import com.csn.charity.repository.NewsRepository;
import com.csn.charity.service.interfaces.NewsService;

@Service
public class NewsServiceImpl implements NewsService {
    @Autowired
    private NewsRepository newsRepository;
    @Autowired
    private Cloudinary cloudinary;
    @Autowired
    private NewsCategoryRepository newsCategoryRepository;

    @Override
    // @Cacheable(value = "news")
    public List<New> getAll() {
        return this.newsRepository.findAll();
    }

    @Override
    // @Cacheable(value = "new", key = "#id")
    public New get(Long id) {
        return this.newsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tin tức với ID: " + id));
    }

    @Override
    public New add(New n) {
        if (!n.getFile().isEmpty()) {
            try {
                Map res = this.cloudinary.uploader().upload(n.getFile().getBytes(),
                        ObjectUtils.asMap("resource_type", "auto"));

                n.setImage(res.get("secure_url").toString());

            } catch (IOException ex) {
                Logger.getLogger(NewsServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        n.setCreateDate(new Date());
        return this.newsRepository.save(n);
    }

    @Override
    public New update(Long id, New n) {
        New news = this.newsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tin tức với ID: " + id));

        news.setCategory(n.getCategory());
        news.setName(n.getName());
        news.setContent(n.getContent());
        news.setCreateDate(new Date());
        if (!n.getFile().isEmpty()) {
            try {
                Map res = this.cloudinary.uploader().upload(n.getFile().getBytes(),
                        ObjectUtils.asMap("resource_type", "auto"));

                news.setImage(res.get("secure_url").toString());

            } catch (IOException ex) {
                Logger.getLogger(NewsServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

        return this.newsRepository.save(news);
    }

    @Override
    public void delete(Long id) {
        New n = this.newsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tin tức với ID: " + id));

        this.newsRepository.delete(n);
    }

    @Override
    public List<New> findByName(String name) {
        return this.newsRepository.findByName(name);
    }

    @Override
    public Long countNewsByCategory(Long categoryId) {
        return this.newsRepository.countNewsByCategoryId(categoryId);
    }

    @Override
    // @Cacheable(value = "newByCategory", key = "#categoryId")
    public List<New> getNewsByCategory(Long categoryId) {
        NewCategory newCategory = this.newsCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tin tức với ID: " + categoryId));

        return this.newsRepository.findByCategory(newCategory);
    }

    @Override
    public List<New> search(String kw) {
        return newsRepository.search(kw);
    }

    @Override
    public List<Map<String, String>> getNewsItems() throws IOException {
        String url = "https://thanhnien.vn/tu-thien.html"; // Thay bằng URL thực tế
        Document document = Jsoup.connect(url).get();
        List<Map<String, String>> newsItems = new ArrayList<>();
        String baseUrl = "https://thanhnien.vn"; // Thêm tiền tố vào các liên kết

        // Tìm các thẻ <div> có class "box-category-item"
        Elements itemElements = document.select("div.box-category-item");
        for (Element itemElement : itemElements) {
            Map<String, String> newsItem = new HashMap<>();

            // Lấy href của div
            String href = itemElement.attr("href");
            if (!href.startsWith("http")) {
                href = baseUrl + href;
            }
            newsItem.put("url", href);

            // Lấy thông tin của thẻ <a> bên trong thẻ <h2> có class "box-title-text"
            Element titleElement = itemElement.selectFirst("h2.box-title-text a");
            if (titleElement != null) {
                String title = titleElement.attr("title");
                if (title != null && !title.isEmpty()) {
                    newsItem.put("title", title);
                } else {
                    newsItem.put("title", "No title available");
                }
                newsItem.put("url", baseUrl + titleElement.attr("href"));
            } else {
                System.out.println("Title element not found or does not have 'title' attribute: " + itemElement);
                newsItem.put("title", "No title available");
            }

            Element contentElement = itemElement.selectFirst("a.box-category-sapo");
            if (contentElement != null) {
                String content = contentElement.attr("title");
                if (content != null && !content.isEmpty()) {
                    newsItem.put("content", content);
                } else {
                    Element relatedLinkTitleElement = itemElement.selectFirst("a.box-category-related-link-title");
                    if (relatedLinkTitleElement != null) {
                        String relatedTitle = relatedLinkTitleElement.attr("title");
                        if (relatedTitle != null && !relatedTitle.isEmpty()) {
                            newsItem.put("content", relatedTitle);
                        } else {
                            newsItem.put("content", "No related title available");
                        }
                    } else {
                        newsItem.put("content", "No related title available");
                    }
                }
            } else {
                System.out.println("Content element not found or does not have 'content' attribute: " + itemElement);
                Element relatedLinkTitleElement = itemElement.selectFirst("a.box-category-related-link-title");
                if (relatedLinkTitleElement != null) {
                    String relatedTitle = relatedLinkTitleElement.attr("title");
                    if (relatedTitle != null && !relatedTitle.isEmpty()) {
                        newsItem.put("content", relatedTitle);
                    } else {
                        newsItem.put("content", "No related title available");
                    }
                } else {
                    newsItem.put("content", "No related title available");
                }
            }

            // Lấy thông tin ảnh từ thẻ <img>
            Element imgElement = itemElement.selectFirst("a.box-category-link-with-avatar img");
            if (imgElement != null) {
                newsItem.put("imageUrl", imgElement.attr("src"));
                newsItem.put("imageAlt", imgElement.attr("alt"));
                newsItem.put("imageTitle", imgElement.attr("title"));
            }

            // Kiểm tra xem có title không để quyết định có add vào danh sách hay không
            if (!"No title available".equals(newsItem.get("title"))) {
                newsItems.add(newsItem);
            }
        }

        return newsItems;
    }

}
