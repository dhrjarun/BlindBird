import { Avatar, AvatarProps, Menu } from '@mantine/core';
import { LOGOUT_URL } from 'constants/api';
import React from 'react';
import { LogOut } from 'react-feather';
import { useUserCtx } from 'user';

export interface UserAvatarProps extends AvatarProps {}
export const UserAvatar = React.forwardRef<HTMLDivElement, UserAvatarProps>(
  (props, ref) => {
    const { user } = useUserCtx();
    if (!user) return null;

    const handleLogout = () => {
      fetch(LOGOUT_URL, { method: 'POST', credentials: 'include' }).finally(() => {
        window.open('/', '_self');
      });
    };

    return (
      <Menu width={160}>
        <Menu.Target>
          <Avatar ref={ref} src={user?.tPfp} radius="xl" {...props}>
            {user?.tName}
          </Avatar>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>@{user.tUsername}</Menu.Label>
          <Menu.Item onClick={handleLogout} icon={<LogOut size={12} />}>
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  },
);

UserAvatar.displayName = 'UserAvatar';
