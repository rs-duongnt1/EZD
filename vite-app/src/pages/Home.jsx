import { useGetListOrganizationsQuery } from '../services/organization';
// import DropdownMenu, {
//   DropdownItem,
//   DropdownItemGroup,
// } from '@atlaskit/dropdown-menu';
import Avatar from '@atlaskit/avatar';

import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import { useGetUserInfoQuery } from '../services/user';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const ListItem = styled.div({
  display: 'flex',
  alignItems: 'center',
  // justifyContent: 'space-between',
  minWidth: '70px',
});

const ListItemText = styled.span({
  marginLeft: '8px',
  maxWidth: '200px',
  overflow: 'hidden',
});

export default function Home() {
  let { data: orgs } = useGetListOrganizationsQuery();
  const { data: user } = useGetUserInfoQuery();

  console.log(orgs, user);

  const [orgSelected, setOrgSelected] = useState(null);

  useEffect(() => {
    if (orgs?.length > 0) {
      setOrgSelected(orgs[0]);
    }
  }, [orgs]);

  return (
    <>
      {orgs?.length > 0 && (
        <DropdownMenu
          trigger={({ triggerRef, isSelected, testId, ...providedProps }) => (
            <ListItem>
              <Avatar
                {...providedProps}
                ref={triggerRef}
                name={'xxxx'}
                src={orgSelected?.avatar_url}
                size="medium"
                label={'xx'}
                appearance="square"
              />
              <ListItemText>{orgSelected?.username}</ListItemText>
            </ListItem>
          )}
        >
          <DropdownItemGroup>
            {orgs?.map((org) => (
              <DropdownItem key={org.id} description={org.description}>
                <ListItem>
                  <Avatar
                    appearance="square"
                    src={org.avatar_url}
                    size="small"
                    name="Scott Farquhar"
                  />
                  <ListItemText>{org.username}</ListItemText>
                </ListItem>
              </DropdownItem>
            ))}
          </DropdownItemGroup>
        </DropdownMenu>
      )}
    </>
  );
}
