package com.example.FamilyFinances.domain.common;

public class EnumUtils {

    public static <E extends Enum<E> & CodedEnum> E fromCode(Class<E> enumClass,String code){
        for(E e : enumClass.getEnumConstants()){
            if(e.getCode().equals(code)){

                return e;
            }
        }
        throw new IllegalArgumentException(enumClass.getSimpleName() + "存在しないコードです："+code);
    }
}
