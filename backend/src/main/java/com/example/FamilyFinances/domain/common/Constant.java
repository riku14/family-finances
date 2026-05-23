package com.example.FamilyFinances.domain.common;

import lombok.Getter;
import lombok.RequiredArgsConstructor;


public final class Constant {

    @Getter
    @RequiredArgsConstructor
    public enum SystemRoleType implements CodedEnum{
        ADMIN("ADMIN","管理者"),
        USER("USER","一般ユーザー");

        private final String code;
        private final String label;
    }

    @Getter
    @RequiredArgsConstructor
    public enum TransactionType implements CodedEnum{
        EXPENSE("EXPENSE","支出"),
        INCOME("INCOME","収入");

        private final String code;
        private final String label;
    }

    @Getter
    @RequiredArgsConstructor
    public enum WorkspaceRoleType implements CodedEnum{
        ADMIN("ADMIN","管理者"),
        MEMBER("MEMBER","メンバー");

        private final String code;
        private final String label;
    }
}

