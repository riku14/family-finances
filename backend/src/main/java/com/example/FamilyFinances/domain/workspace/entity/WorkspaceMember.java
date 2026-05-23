package com.example.FamilyFinances.domain.workspace.entity;

import com.example.FamilyFinances.domain.common.Constant;
import com.example.FamilyFinances.domain.common.Constant.WorkspaceRoleType;
import com.example.FamilyFinances.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "workspace_members")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkspaceMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workspace_id", nullable = false)
    private Workspace workspace;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    @Column(nullable = false)
    private Constant.WorkspaceStatus status=Constant.WorkspaceStatus.ACTIVE;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    @Column(nullable = false)
    private WorkspaceRoleType role= WorkspaceRoleType.ADMIN;

    @org.hibernate.annotations.CreationTimestamp
    @Column(name="joined_at",nullable = false,updatable = false)
    private LocalDateTime joinedAt;

    @Column(name="left_at",updatable = false)
    private LocalDateTime leftAt;
}