package com.example.FamilyFinances.domain.user.controller;

import com.example.FamilyFinances.domain.user.entity.User;
import com.example.FamilyFinances.domain.user.service.UserService;
import com.example.api.UsersApi;
import com.example.api.model.ApiUsersPostRequest;
import com.example.api.model.AuthResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController  //コントローラクラスであることの宣言＋JSONデータだけを返すクラスとして扱う。
@CrossOrigin(origins = "*") 
@RequiredArgsConstructor  //宣言が必要な変数を引数に取るコンストラクタを自動で生成する
public class UserController implements UsersApi {

    private final UserService userService;

//    RequiredArgsConstructorでここにこのコンストラクタが足される。
//    /**
//     * public UserController(UserService userService){
//     *     this.userService=userService;
//     * }
//     */

    @Override //オーバライドしてる宣言。整合性が取れなくなるとエラーを出してくれる
    public ResponseEntity<AuthResponse> apiUsersPost(@Valid ApiUsersPostRequest request){

        String email = request.getEmail();
        String password = request.getPassword();
        String name = request.getName();

        //フロントから受け取った情報をDB用に詰め替える
        User savedUser = userService.registerUser(email,password,name);

        //フロントに返すデータの入れ物を作る
        AuthResponse response = new AuthResponse();

        response.setAccessToken("dummy_token");
        response.setUserId((int) savedUser.getId());
        response.setEmail(savedUser.getEmail());
        response.setName(savedUser.getName());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


}
