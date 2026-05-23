package com.example.FamilyFinances.domain.workspace.entity;

import com.example.FamilyFinances.domain.common.Constant;
import com.example.FamilyFinances.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "workspaces")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Workspace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Constant.WorkspaceType type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_user_id", nullable = false)
    private User owner;

    @org.hibernate.annotations.CreationTimestamp
    @Column(nullable = false,updatable = false)
    private LocalDateTime createdAt;

    @org.hibernate.annotations.CreationTimestamp
    @Column(nullable = false,updatable = true)
    private LocalDateTime updatedAt;

    @Column(updatable = false,insertable = false)
    private LocalDateTime deletedAt;


}
