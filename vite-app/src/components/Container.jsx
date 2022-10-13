import styled from "@emotion/styled";

const Container = styled.div(({ maxWidth, fullWidth }) => ({
  maxWidth: "1200px",
  ...(maxWidth && { maxWidth }),
  margin: "0 auto",
  padding: "0 15px",
  ...(fullWidth && { width: "100%" }),
}));

export default Container;
