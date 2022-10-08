import styled from '@emotion/styled';
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import Avatar from '@atlaskit/avatar';

const HeaderRoot = styled.div({
  height: '54px',
  borderBottom: '1px solid #dedede',
  padding: '0 30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  //   boxShadow: '0 2px 10px rgb(0 0 0 / 25%)',
});

export default function Header() {
  return (
    <HeaderRoot>
      <DropdownMenu
        trigger={({ triggerRef, isSelected, testId, ...providedProps }) => (
          <Avatar
            {...providedProps}
            ref={triggerRef}
            name={'xxxx'}
            src="https://pbs.twimg.com/profile_images/568401563538841600/2eTVtXXO_400x400.jpeg"
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
