// package com.csn.charity.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Controller;
// import org.springframework.ui.Model;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.ModelAttribute;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;

// import com.csn.charity.model.Skill;
// import com.csn.charity.model.UserReactPost;
// import com.csn.charity.service.interfaces.ReactionService;

// @Controller
// public class ReactionController {
//     @Autowired
//     private ReactionService reactionService;

//     @GetMapping("/admin/reactions")
//     public String getAllReaction(Model model) {
//         model.addAttribute("reactions", this.reactionService.getAll());
//         return "pages/reactions";
//     }
// }
