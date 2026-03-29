package com.indianbank.camportal;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

@WebMvcTest(LoginController.class)
class LoginControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldRenderLandingAtRoot() throws Exception {
        mockMvc.perform(get("/"))
                .andExpect(status().isOk())
                .andExpect(view().name("landing"));
    }

    @Test
    void shouldRenderLandingAtLoginRoute() throws Exception {
        mockMvc.perform(get("/login"))
                .andExpect(status().isOk())
                .andExpect(view().name("landing"));
    }

    @Test
    void shouldRenderLandingForSsoRoute() throws Exception {
        mockMvc.perform(get("/sso/login"))
                .andExpect(status().isOk())
                .andExpect(view().name("landing"));
    }

    @Test
    void shouldRenderLandingForWelcomeRoute() throws Exception {
        mockMvc.perform(get("/welcome"))
                .andExpect(status().isOk())
                .andExpect(view().name("landing"));
    }

    @Test
    void shouldRenderLandingForDashboardRoute() throws Exception {
        mockMvc.perform(get("/dashboard"))
                .andExpect(status().isOk())
                .andExpect(view().name("landing"));
    }

    @Test
    void shouldRenderLandingForCreateCamRoute() throws Exception {
        mockMvc.perform(get("/create-cam"))
                .andExpect(status().isOk())
                .andExpect(view().name("landing"));
    }

    @Test
    void shouldRenderLandingForNewToBankRoute() throws Exception {
        mockMvc.perform(get("/new-to-bank"))
                .andExpect(status().isOk())
                .andExpect(view().name("landing"));
    }
}
