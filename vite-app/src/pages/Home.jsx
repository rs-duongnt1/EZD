import {
  useGetListOrganizationsQuery,
  useGetListReposMutation,
} from "../services/organization";
import Avatar from "@atlaskit/avatar";

import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from "@atlaskit/dropdown-menu";
import { useGetUserInfoQuery } from "../services/user";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Badge from "@atlaskit/badge";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import Loading from "../components/Loading";
import Stack from "../components/Stack";
import Button from "@atlaskit/button";

const ListItem = styled.div({
  display: "flex",
  alignItems: "center",
  // justifyContent: 'space-between',
  minWidth: "70px",
  cursor: "pointer",
});

const ListItemText = styled.span({
  marginLeft: "8px",
  maxWidth: "200px",
  overflow: "hidden",
});

const RepoItems = styled.div({
  marginTop: "30px",
  display: "flex",
  flexDirection: "column",
});

const RepoItem = styled.div({
  display: "flex",
  borderBottom: "1px solid #d6d6d6",
  padding: "20px 15px",
  alignItems: "center",
});

const RepoItemText = styled.a({
  cursor: "pointer",
  ":hover": {
    textDecoration: "underline",
    textUnderlineOffset: "4px",
  },
  fontSize: "24px",
  fontWeight: "bold",
  userSelect: "none",
});

export default function Home() {
  let { data: orgs } = useGetListOrganizationsQuery();
  const { data: user, isFetching } = useGetUserInfoQuery();
  const [repos, setRepos] = useState([]);
  const [fetchListReposByOrg, {}] = useGetListReposMutation();

  const [orgSelected, setOrgSelected] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setOrgSelected(user);
      setRepos(user.repos);
    }
  }, [user]);

  const selectOrg = (org) => {
    setOrgSelected(org);
    fetchListReposByOrg(org.username).then((result) => {
      setRepos(result.data);
    });
  };

  const selectUser = (user) => {
    setOrgSelected(user);
    setRepos(user.repos);
  };

  const selectRepo = (repo) => {
    navigate("/" + repo.full_name);
  };

  return (
    <Container>
      <Stack>
        <Stack>
          {orgs?.length > 0 && (
            <DropdownMenu
              trigger={({
                triggerRef,
                isSelected,
                testId,
                ...providedProps
              }) => (
                <ListItem {...providedProps} ref={triggerRef}>
                  <Avatar
                    src={orgSelected?.avatar_url}
                    size="medium"
                    label={"xx"}
                    appearance="square"
                  />
                  <ListItemText>{orgSelected?.username}</ListItemText>
                </ListItem>
              )}
            >
              <DropdownItemGroup>
                <DropdownItem
                  description={user?.name}
                  onClick={() => selectUser(user)}
                >
                  <ListItem>
                    <Avatar
                      appearance="square"
                      src={user?.avatar_url}
                      size="small"
                      name="Scott Farquhar"
                    />
                    <ListItemText>{user?.username}</ListItemText>
                  </ListItem>
                </DropdownItem>
                {orgs?.map((org) => (
                  <DropdownItem
                    key={org.id}
                    description={org.description}
                    onClick={() => selectOrg(org)}
                  >
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
        </Stack>
        <Stack flex={1} justifyContent="flex-end" spacing="10px">
          <Button appearance="primary" onClick={() => navigate("/org/create")}>
            New Organization
          </Button>
          <Button appearance="primary" onClick={() => navigate("/repo/create")}>
            New Repository
          </Button>
        </Stack>
      </Stack>

      {isFetching && <Loading />}
      {!isFetching && (
        <RepoItems>
          {repos.map((repo) => (
            <RepoItem key={repo.id}>
              <RepoItemText onClick={() => selectRepo(repo)}>
                {repo.name}
              </RepoItemText>
              <div style={{ marginLeft: "10px" }}>
                {repo?.private && <Badge appearance="default">private</Badge>}
              </div>
            </RepoItem>
          ))}
        </RepoItems>
      )}
    </Container>
  );
}
