import styled from "@emotion/styled";
import { Typography } from "../../components/Typography";
import DocumentIcon from "@atlaskit/icon/glyph/document";
import FolderFilledIcon from "@atlaskit/icon/glyph/folder-filled";
import {
  useGetContentsByFilePathQuery,
  useGetFileContentsQuery,
} from "../../services/repository";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useEffect, useState } from "react";

const Content = styled.div({
  marginTop: "20px",
});

const TreeRoot = styled.div({
  display: "flex",
  flexDirection: "column",
});

const TreeItem = styled.div({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  userSelect: "none",
});

const TreeItemText = styled.div({
  fontSize: "14px",
  marginLeft: "5px",
});

const TreeItemIcon = styled.div({});

const sortByType = (sources) => {
  return [...sources].sort((a, b) => {
    if (a.type > b.type) {
      return 1;
    } else if (a.type < b.type) {
      return -1;
    } else {
      return 0;
    }
  });
};

const Tree = ({ sources, selectFileOrFolder }) => {
  return (
    <Content>
      <TreeRoot>
        {sources.map((source) => (
          <TreeItem key={source.sha} onClick={() => selectFileOrFolder(source)}>
            <TreeItemIcon>
              {source.type === "dir" && <FolderFilledIcon />}
              {source.type === "file" && <DocumentIcon />}
            </TreeItemIcon>
            <TreeItemText>{source.name}</TreeItemText>
          </TreeItem>
        ))}
      </TreeRoot>
    </Content>
  );
};

const FileContent = ({ file }) => {
  if (typeof file?.content === "string") {
    const content = atob(file?.content);

    return <pre>{content}</pre>;
  } else {
    return <div>Loading</div>;
  }
};

const RenderTree = ({ org, repo, selectFileOrFolder }) => {
  const { data } = useGetFileContentsQuery({
    org,
    repo,
  });

  if (Array.isArray(data)) {
    const sources = sortByType(data || []);

    return <Tree sources={sources} selectFileOrFolder={selectFileOrFolder} />;
  } else {
    return <FileContent file={data} />;
  }
};

const RenderTreeWithFilePath = ({
  org,
  repo,
  filePath,
  selectFileOrFolder,
}) => {
  const { data, refetch } = useGetContentsByFilePathQuery({
    org,
    repo,
    filePath,
  });

  if (Array.isArray(data)) {
    const sources = sortByType(data || []);

    return <Tree sources={sources} selectFileOrFolder={selectFileOrFolder} />;
  } else {
    return <FileContent file={data} />;
  }
};

export default function Sources() {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const filePath = searchParams.get("filePath");

  useEffect(() => {
    if (filePath) {
    }
  }, [filePath]);

  const selectFileOrFolder = (source) => {
    navigate({
      pathname: "",
      search: `?${createSearchParams({
        filePath: source.path,
      })}`,
    });
  };

  return (
    <div>
      <Typography>{filePath}</Typography>
      {filePath && (
        <RenderTreeWithFilePath
          org={params.org}
          repo={params.repo}
          filePath={filePath}
          selectFileOrFolder={selectFileOrFolder}
        />
      )}
      {!filePath && (
        <RenderTree
          org={params.org}
          repo={params.repo}
          selectFileOrFolder={selectFileOrFolder}
        />
      )}
    </div>
  );
}
