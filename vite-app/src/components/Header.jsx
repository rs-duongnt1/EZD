import styled from '@emotion/styled';
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import Avatar from '@atlaskit/avatar';
import { useGetUserInfoQuery } from '../services/user';

const HeaderRoot = styled.div({
  height: '54px',
  borderBottom: '1px solid #dedede',
  padding: '0 30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  //   boxShadow: '0 2px 10px rgb(0 0 0 / 25%)',
});

const Username = styled.span({
  fontSize: '14px',
  marginRight: '10px',
});

export default function Header() {
  const { data: user } = useGetUserInfoQuery();
  console.log(user);
  return (
    <HeaderRoot>
      <Username>{user?.email}</Username>

      <DropdownMenu
        trigger={({ triggerRef, isSelected, testId, ...providedProps }) => (
          <Avatar
            {...providedProps}
            ref={triggerRef}
            name={user?.username}
            src={user?.avatar_url}
            size="large"
            label={'xx'}
            appearance="square"
          />
        )}
      >
        <DropdownItemGroup>
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem>Logout</DropdownItem>
        </DropdownItemGroup>
      </DropdownMenu>
    </HeaderRoot>
  );
}
