package com.indianbank.camportal;

import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class LoginController {

    @GetMapping({"/", "/login"})
    public String loginPage(Model model) {
        if (!model.containsAttribute("loginForm")) {
            model.addAttribute("loginForm", new LoginForm());
        }
        return "login";
    }

    @PostMapping("/login")
    public String handleLogin(@Valid @ModelAttribute("loginForm") LoginForm loginForm,
                              BindingResult bindingResult,
                              Model model) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("errorMessage", "Please provide both User ID and Password.");
            return "login";
        }

        model.addAttribute("userId", loginForm.getUserId());
        return "home";
    }

    @GetMapping("/sso/login")
    public String ssoLogin(Model model) {
        model.addAttribute("successMessage", "SSO redirect initiated. Integrate with bank IdP in next phase.");
        model.addAttribute("loginForm", new LoginForm());
        return "login";
    }
}
