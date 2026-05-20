package com.example.FamilyFinances.domain.user.entity;

import com.example.FamilyFinances.domain.user.enums.SystemRoleType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity //Entityクラスであるという宣言
@Table(name="users")  //リンク先はusersテーブル
@Setter
@Getter
@NoArgsConstructor //引数なしのコンストラクタを生成する
@AllArgsConstructor  //全ての引数を持つコンストラクタを生成する
@Builder  //Entityを生成するときのミスを減らす。項目の順番を間違えるなど
public class User {
    
    @Id  //この項目が主キーであることを表す
    @GeneratedValue(strategy = GenerationType.IDENTITY)  //自動連番を振る
    private long id;

    @Column(nullable = false,unique = true)  //NOT NULL、重複禁止
    private String email;
    
    @Column(nullable = false)  //NOT NULL
    private String password;

    @Column(nullable = true)  //NOT NULL
    private String name = this.email;

    @Enumerated(EnumType.STRING)  //EnumをStringとして扱う。インデックスが変わっても扱うものを間違えない
    @Builder.Default  //Builderにデフォルトを設定してることを示す。
    @Column(nullable = false)  //NOT NULL
    private SystemRoleType systemRole = SystemRoleType.USER;  //DefaultをUSERにする

    //DB側ではcreated_at、NOTNULL、javaからの新規作成・更新を禁止する。
    @org.hibernate.annotations.CreationTimestamp
    @Column(name = "created_at",nullable = false,updatable = false,insertable = false)
    private LocalDateTime createdAt;
}
