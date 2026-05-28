package com.example.FamilyFinances.domain.user.controller;

import com.example.FamilyFinances.domain.user.entity.User;
import com.example.FamilyFinances.domain.user.service.JwtService;
import com.example.FamilyFinances.domain.user.service.UserService;
import com.example.api.AuthApi;
import com.example.api.model.ApiAuthLoginPostRequest;
import com.example.api.model.AuthResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AuthController implements AuthApi {

    private final UserService userService;
    private final JwtService jwtService; // 🌟 トークンの専門家を呼ぶ

    @Override
    public ResponseEntity<AuthResponse> apiAuthLoginPost(ApiAuthLoginPostRequest request) {

        // 1. UserServiceに「このメアドとパスワードでログインできる？」と聞く
        // ※失敗した場合はService側でエラーが投げられるので、ここは成功した前提で進む
        User loginUser = userService.login(request.getEmail(), request.getPassword());

        // 2. 本物だと証明されたので、JwtServiceにトークンを作ってもらう
        String token = jwtService.generateToken(loginUser);

        // 3. フロントに返すお返事箱を作る
        AuthResponse response = new AuthResponse();
        response.setAccessToken(token); // 🌟 完成した本物のトークンをセット！
        response.setUserId((int) loginUser.getId());
        response.setEmail(loginUser.getEmail());
        response.setName(loginUser.getName());

        // ※ワークスペースの情報（workspaces）のセットは、一旦後回しでOKです！

        // 200 OK でお返事を返す
        return ResponseEntity.ok(response);
    }
}