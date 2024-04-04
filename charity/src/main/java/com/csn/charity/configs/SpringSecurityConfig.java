package com.csn.charity.configs;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.csn.charity.filters.CustomAccessDeniedHandler;
import com.csn.charity.filters.JwtAuthenticationFilter;
import com.csn.charity.filters.RestAuthenticationEntryPoint;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig {
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private CorsConfigurationSource corsConfigurationSource;

    @Autowired
    private CustomOAuth2UserService oauth2UserService;

    @Autowired
    private OAuthLoginSuccessHandler oauthLoginSuccessHandler;

    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Order(2)
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .authenticationProvider(authenticationProvider())
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers("/register", "/css/**", "/images/**", "/js/**",
                                "/error", "/login", "/oauth2/**", "/showMap")
                        .permitAll()
                        .requestMatchers("/", "/admin/**").hasRole("ADMIN")
                        .anyRequest()
                        .authenticated())
                .formLogin(
                        form -> form
                                .loginPage("/login")
                                .usernameParameter("username")
                                .passwordParameter("password")
                                .loginProcessingUrl("/login")
                                .defaultSuccessUrl("/")
                                .failureUrl("/login?error")
                                .permitAll())
                .oauth2Login(
                        login -> login
                                .loginPage("/login")
                                .userInfoEndpoint(userInfo -> userInfo
                                        .userService(oauth2UserService) 
                                )
                                .defaultSuccessUrl("/")
                                .successHandler(oauthLoginSuccessHandler))
                .logout(logout -> logout.logoutSuccessUrl("/"))
                .exceptionHandling(handling -> handling.accessDeniedPage("/login?accessDenied"))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    @Order(1)
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.ignoringRequestMatchers("/api/**").disable())
                .securityMatcher("/api/**")
                .httpBasic(basic -> basic.authenticationEntryPoint(restServicesEntryPoint()))
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers("/api/register/", "/api/login/").permitAll()
                        .requestMatchers("/api/news/", "/api/ncategories/", "/api/projects/", "/api/projects/{id}", "/api/pcategories/",
                                "/api/posts/","/api/posts/{postId}", "/api/post/{postId}/comments/",
                                "/api/post-comment/{parentId}/replies/",
                                "/api/news-comment/{parentId}/replies/",
                                "/api/news/{newsId}", "/api/skills/",
                                "/api/news/{newsId}/comments/", "/api/firebase/", "/api/reaction/{postId}",
                                "/api/firebase/{username}", "/api/facebook/", "/api/google/",
                                "/api/firebase/{userId}", "/api/users/", "/api/users/{id}",
                                "/api/user-docs/{id}", "/api/projects/{id}", "/api/projects/pcategories/{id}",
                                "/api/news/ncategories/{id}/", "/api/export/", "/api/contributions/",
                                "/api/contributions/{projectId}", "/api/forgot-password/", "/api/set-password/",
                                "/api/{projectId}/addresses/", "/api/addresses/")
                        .permitAll()
                        .requestMatchers("/api/admin/adminProfile").hasRole("ADMIN")
                        .requestMatchers("/api/user/userProfile").hasRole("USER")
                        .anyRequest()
                        .authenticated())
                .authenticationProvider(authenticationProvider())
                .exceptionHandling(handling -> handling.accessDeniedHandler(customAccessDeniedHandler()))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    // Password Encoding
    @Bean
    public RestAuthenticationEntryPoint restServicesEntryPoint() {
        return new RestAuthenticationEntryPoint();
    }

    @Bean
    public CustomAccessDeniedHandler customAccessDeniedHandler() {
        return new CustomAccessDeniedHandler();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
