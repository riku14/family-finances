package com.example.FamilyFinances.domain.user.service;

import com.example.FamilyFinances.domain.user.entity.User;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@Transactional
class UserServiceTest {

    // テストしたい対象のクラスを呼び出す
    @Autowired
    private UserService userService;

    @Test
    @DisplayName("新しいユーザーが正常に登録できるかテスト")
    void registerUser_success() {
        // 1. 準備（登録するデータ）
        String email = "test@example.com";
        String password = "password123";
        String name = "テスト太郎";

        // 2. 実行（実際にServiceのメソッドを動かす）
        User savedUser = userService.registerUser(email, password, name);

        // 3. 確認（期待通りの結果になったか？）
        assertNotNull(savedUser.getId()); // IDが自動で発行されているはず！
        assertEquals(email, savedUser.getEmail()); // メールアドレスが一致しているはず！
        assertEquals("USER", savedUser.getSystemRole().name()); // 権限がデフォルトの "USER" になっているはず！

        System.out.println("✅ テスト成功！登録されたユーザーのID: " + savedUser.getId());
    }
}