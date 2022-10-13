import styled from "@emotion/styled";
import Stack from "./Stack";
import Spinner from "@atlaskit/spinner";
import TimeAgo from "react-timeago";
import DocumentIcon from "@atlaskit/icon/glyph/document";
import FolderFilledIcon from "@atlaskit/icon/glyph/folder-filled";
import { Typography } from "./Typography";
import { useParams } from "react-router-dom";
import { useGetCommitsQuery } from "../services/repository";
import Spacing from "./Spacing";


const TreeItemIcon = styled.div({});

export const Tree = ({ children }) => {
  return <Stack direction="column">{children}</Stack>;
};

export const TreeItem = ({ name, type, path, ...props }) => {
  const { org, repo } = useParams();
  const { data: commits, isFetching } = useGetCommitsQuery({
    org: org,
    repo: repo,
    path: path,
  });
  return (
    <Stack {...props}>
      <Stack style={{ width: "300px" }} cursor="pointer">
        <TreeItemIcon>
          {type === "dir" && <FolderFilledIcon />}
          {type === "file" && <DocumentIcon />}
        </TreeItemIcon>
        <Spacing ml={5}>
          <Typography>{name}</Typography>
        </Spacing>
      </Stack>

      <Stack flex={1} justifyContent="space-between">
        <Stack>
          {!isFetching && (
            <Typography variant="link" href="#" color="#57606a">
              {commits[0]?.commit.message}
            </Typography>
          )}
          {isFetching && <Spinner size="small" />}
        </Stack>
        <Stack>
          {!isFetching && (
            <TimeAgo
              style={{ color: "#57606a" }}
              date={commits[0]?.commit.committer.date}
            />
          )}

          {isFetching && <Spinner size="small" />}
        </Stack>
      </Stack>
    </Stack>
  );
};
