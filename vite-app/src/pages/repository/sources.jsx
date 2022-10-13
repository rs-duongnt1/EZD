import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import { useGetFileContentsQuery } from "../../services/repository";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Loading from "../../components/Loading";
import FileEditor from "../../components/FileEditor";
import { Tree, TreeItem } from "../../components/Tree";
import Spacing from "../../components/Spacing";

const sortTree = (tree) => {
  console.log(tree);
  const newTree = [...tree].sort((a, b) => {
    if (a.type > b.type) {
      return 1;
    } else if (a.type < b.type) {
      return -1;
    } else {
      return 0;
    }
  });

  return newTree;
};

export default function Sources() {
  const { org, repo } = useParams();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const filePath = searchParams.get("filePath");

  const { data: contents, isFetching } = useGetFileContentsQuery({
    org,
    repo,
    filePath: filePath,
  });

  const paths = filePath?.split("/");

  const breadcrumbs = [
    {
      text: repo,
      path: "",
    },
  ];

  if (paths) {
    for (const path of paths) {
      breadcrumbs.push({
        text: path,
        path: filePath.substring(0, filePath.search(path) + path.length),
      });
    }
  }

  const isTree = () => {
    return Array.isArray(contents);
  };

  const isFile = () => {
    return !Array.isArray(contents) && typeof contents === "object";
  };

  const handleClickFolder = (content) => {
    navigate({
      pathname: "",
      search: `?${createSearchParams({
        filePath: content.path,
      })}`,
    });
  };

  return (
    <div>
      <Spacing mt={15} mb={15}>
        <Breadcrumbs>
          {breadcrumbs?.map((breadcrumb) => (
            <BreadcrumbsItem
              key={breadcrumb.path}
              onClick={() => {
                navigate({
                  pathname: "",
                  search: `?${createSearchParams({
                    ...(breadcrumb.path && { filePath: breadcrumb.path }),
                  })}`,
                });
              }}
              text={breadcrumb.text}
            />
          ))}
        </Breadcrumbs>
      </Spacing>
      {isFetching && <Loading />}
      {!isFetching && isTree() && (
        <Tree>
          {sortTree(contents).map((content) => (
            <TreeItem
              onClick={() => handleClickFolder(content)}
              key={content.path}
              path={content.path}
              name={content.name}
              type={content.type}
            />
          ))}
        </Tree>
      )}
      {isFile() && <FileEditor content={contents.content} converted />}
    </div>
  );
}
