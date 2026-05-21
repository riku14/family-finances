package com.example.FamilyFinances.domain.user.service;

import com.example.FamilyFinances.domain.user.entity.User;
import com.example.FamilyFinances.domain.user.repository.UserRepository;
import com.example.FamilyFinances.domain.workspace.entity.Workspace;
import com.example.FamilyFinances.domain.workspace.repository.WorkspaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service //Serviceクラスであることを示す。SpringBootに対して。
@RequiredArgsConstructor  //コンストラクタ・インジェクションを自動で準備する
public class UserService {

    // データベースと通信するRepositoryを呼び出す
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final WorkspaceRepository workspaceRepository;

    /**
     * 新しいユーザーを登録する（ビジネスロジック）
     */
    @Transactional  //このメソッドをトランザクションとして扱うとDBに指示を出す役割。
    public User registerUser(String email, String password, String name) {
        // 1. メールアドレスの重複チェック
        if (userRepository.findByEmail(email).isPresent()) {  //isPresentはそれが存在するかを調べるメソッド
            throw new IllegalArgumentException("このメールアドレスは既に登録されています。");
        }

        // 2. 新しいユーザーのデータを組み立てる
        //DBに渡すためのデータをセットする
        User newUser = User.builder()
                .email(email)
                .passwordHush(passwordEncoder.encode(password)) // ※パスワードハッシュ化は、開通テストの後にセキュリティ設定と合わせて実装します
                .name(name)
                .build();
        User savedUser = userRepository.save(newUser);

        Workspace personalWorkspace = Workspace.builder()
                .name(savedUser.getName() + "のワークスペース")
                .type("PERSONAL")
                .build();
        workspaceRepository.save(personalWorkspace);

        // 3. データベースに保存して、結果を返す
        return savedUser;
    }
}