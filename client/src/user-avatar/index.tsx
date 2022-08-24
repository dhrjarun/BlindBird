import { Avatar, AvatarProps, Menu } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { gqlClient } from 'gql-client';
import { LogoutDocument, LogoutMutation } from 'graphql/generated';
import React from 'react';
import { LogOut } from 'react-feather';
import { userUserCtx } from 'user-ctx';

export interface UserAvatarProps extends AvatarProps {}
export const UserAvatar = React.forwardRef<HTMLDivElement, UserAvatarProps>(
  (props, ref) => {
    const user = userUserCtx();

    const logoutRequest = async () => {
      const { logout } = await gqlClient.request<LogoutMutation>(LogoutDocument);
      return logout;
    };

    const logoutMutation = useMutation(logoutRequest);

    const handleLogout = () => {
      logoutMutation.mutate();
      window.open('/', '_self');
    };

    return (
      <Menu width={160}>
        <Menu.Target>
          <Avatar ref={ref} src={user?.tPfp} radius="xl" {...props}>
            {user?.tName}
          </Avatar>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item onClick={handleLogout} icon={<LogOut size={12} />}>
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  },
);

UserAvatar.displayName = 'UserAvatar';
