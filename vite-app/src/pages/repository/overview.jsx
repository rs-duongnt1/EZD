import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import { Typography } from "../../components/Typography";
import { useGetRepositoryQuery } from "../../services/repository";

const Content = styled.div({
  marginTop: "20px",
});

export default function Overview() {
  const params = useParams();
  const { data: repository } = useGetRepositoryQuery({
    org: params.org,
    repo: params.repo,
  });
  return (
    <>
      {repository && (
        <Content>
          <Typography variant="title">{repository.full_name}</Typography>
          <Typography
            variant="link"
            href={repository.clone_url}
            target="_blank"
          >
            {repository.clone_url}
          </Typography>
        </Content>
      )}
    </>
  );
}
