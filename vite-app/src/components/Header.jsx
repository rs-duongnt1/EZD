import styled from "@emotion/styled";
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from "@atlaskit/dropdown-menu";
import Avatar from "@atlaskit/avatar";
import { useGetUserInfoQuery } from "../services/user";
import Stack from "./Stack";
import { useNavigate } from "react-router-dom";
const Username = styled.span({
  fontSize: "14px",
  marginRight: "10px",
});

export default function Header() {
  const { data: user } = useGetUserInfoQuery();
  const navigate = useNavigate();
  return (
    <Stack
      justifyContent="space-between"
      height="54px"
      borderBottom="1px solid #dedede"
      padding="0 30px"
    >
      <Stack cursor="pointer" onClick={() => navigate("/")}>
        <Avatar
          src="http://localhost:4444/assets/img/logo.svg"
          size="large"
          appearance="square"
        />
      </Stack>
      <Stack alignItems="center">
        <Username>{user?.email}</Username>

        <DropdownMenu
          trigger={({ triggerRef, isSelected, testId, ...providedProps }) => (
            <Avatar
              {...providedProps}
              ref={triggerRef}
              name={user?.username}
              src={user?.avatar_url}
              size="large"
              label={"xx"}
              appearance="square"
            />
          )}
        >
          <DropdownItemGroup>
            <DropdownItem>Profile</DropdownItem>
            <DropdownItem>Logout</DropdownItem>
          </DropdownItemGroup>
        </DropdownMenu>
      </Stack>
    </Stack>
  );
}
