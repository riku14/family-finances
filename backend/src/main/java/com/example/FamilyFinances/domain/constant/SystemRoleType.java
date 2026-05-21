package com.example.FamilyFinances.domain.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SystemRoleType {
    ADMIN("ADMIN","管理者"),
    USER("USER","一般ユーザー");

    private final String code;
    private final String name;

    public static SystemRoleType fromCode(String code){
        for(SystemRoleType role : SystemRoleType.values()){
            if(role.getCode().equals(code)){
                return role;
            }
        }
        throw new IllegalArgumentException("存在しない権限コードです："+code);
    }
}
