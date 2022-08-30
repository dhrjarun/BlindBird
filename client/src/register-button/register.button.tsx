import { Button, ButtonProps } from '@mantine/core';
import { TWT_REGISTER } from 'constants/api';
import { BASE } from 'constants/routes';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useUserCtx } from 'user';

export interface RegisterButtonProps extends ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const RegisterButton = React.forwardRef<HTMLButtonElement, RegisterButtonProps>(
  (props, ref) => {
    const location = useLocation();
    const { user } = useUserCtx();

    if (user) return null;

    const handleRegister = () => {
      window.open(
        TWT_REGISTER + `?continueUrl=${BASE}${location.pathname}${location.search}`,
        '_self',
      );
    };

    const { onClick, ...rest } = props;

    return (
      <Button
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          handleRegister();
          if (onClick) onClick(event);
        }}
        {...rest}
        ref={ref}
      ></Button>
    );
  },
);

RegisterButton.displayName = 'RegisterButon';
