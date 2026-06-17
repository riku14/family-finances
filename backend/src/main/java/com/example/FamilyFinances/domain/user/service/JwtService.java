package com.example.FamilyFinances.domain.user.service;

import com.example.FamilyFinances.domain.user.entity.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    private final String SECRET_KEY = "FamilyFinancesSecretKeyForJwtAuthenticationSuperSecure";

    // トークンの有効期限（今回は24時間に設定：1000ミリ秒 × 60秒 × 60分 × 24時間）
    private final long EXPIRATION_TIME = 1000 * 60 * 60 * 24;

    /**
     * ユーザー情報からJWTトークンを生成する
     */
    public String generateToken(User user) {
        SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));

        return Jwts.builder()
                .subject(user.getEmail())
                .claim("userId", user.getId())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }
}