package com.example.FamilyFinances.domain.user.service;

import com.example.FamilyFinances.domain.common.Constant;
import com.example.FamilyFinances.domain.user.entity.User;
import com.example.FamilyFinances.domain.user.repository.UserRepository;
import com.example.FamilyFinances.domain.workspace.entity.Workspace;
import com.example.FamilyFinances.domain.workspace.entity.WorkspaceMember;
import com.example.FamilyFinances.domain.workspace.repository.WorkspaceMemberRepository;
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
    private final WorkspaceMemberRepository workspaceMemberRepository;

    /**
     * 新規登録
     */
    @Transactional  //このメソッドをトランザクションとして扱うとDBに指示を出す役割。
    public User registerUser(String email, String password, String name) {
        // 1. メールアドレスの重複チェック
        if (userRepository.findByEmail(email).isPresent()) {  //isPresentはそれが存在するかを調べるメソッド
            throw new IllegalArgumentException("このメールアドレスは既に登録されています。");
        }

        User newUser = User.builder()
                .email(email)
                .passwordHash(passwordEncoder.encode(password))
                .name(name)
                .build();
        User savedUser = userRepository.save(newUser);

        Workspace personalWorkspace = Workspace.builder()
                .name(savedUser.getName() + "のワークスペース")
                .type(Constant.WorkspaceType.PERSONAL)
                .owner(savedUser)
                .build();
        Workspace savedWorkspace = workspaceRepository.save(personalWorkspace);

        WorkspaceMember member = WorkspaceMember.builder()
                .workspace(savedWorkspace)
                .user(savedUser)
                .role(Constant.WorkspaceRoleType.ADMIN)
                .build();
        workspaceMemberRepository.save(member);


        return savedUser;
    }

    /**
     * ログイン
     */
    @Transactional(readOnly = true) // 読み取り専用の処理なので、これをつけるとDBの動きが少し速くなります！
    public User login(String email, String password) {

        // 1. メールアドレスでDBから「本物のユーザー」を検索する
        // orElseThrow を使うと、「見つからなかったらエラーを投げる、見つかったら中身を取り出す」が1行で書けます！
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("入力されたメールアドレスは登録されていません。"));

        // 2. パスワードの答え合わせ（超重要！）
        // passwordEncoder.matches(画面から来た生のパスワード, DBの暗号化されたパスワード) で比較します
        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new IllegalArgumentException("パスワードが間違っています。");
        }

        // 3. 本物であることが証明されたユーザーデータを返す
        return user;
    }
}