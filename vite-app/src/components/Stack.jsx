import styled from "@emotion/styled";

const Stack = styled.div(
  ({
    justifyContent,
    direction,
    alignItems,
    flex,
    children,
    style,
    theme,
    spacing,
    ...rest
  }) => {
    return {
      display: "flex",
      ...(direction && {
        flexDirection: direction,
      }),
      ...(justifyContent && {
        justifyContent: justifyContent,
      }),
      ...(alignItems && {
        alignItems: alignItems,
      }),
      ...(flex && {
        flex: flex,
      }),
      ...(spacing && {
        gap: spacing,
      }),
      ...rest,
    };
  }
);

export default Stack;
