package com.indianbank.camportal;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

    @GetMapping({"/", "/login", "/sso/login", "/welcome"})
    public String experiencePage() {
        return "landing";
    }
}
