import styled from "@emotion/styled";

const SpacingRoot = styled.div((props) => ({
  ...(props.mt && {
    marginTop: props.mt,
  }),
  ...(props.mb && {
    marginBottom: props.mb,
  }),
  ...(props.ml && {
    marginLeft: props.ml,
  }),
  ...(props.mr && {
    marginRight: props.mr,
  }),
}));
export default function Spacing({ children, ...props }) {
  return <SpacingRoot {...props}>{children}</SpacingRoot>;
}
