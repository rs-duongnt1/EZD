import Spinner from "@atlaskit/spinner";
import styled from "@emotion/styled";

const LoadingRoot = styled.div({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "400px",
});

export default function Loading() {
  return (
    <LoadingRoot>
      <Spinner size="large" />
    </LoadingRoot>
  );
}
