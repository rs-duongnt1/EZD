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
    ...rest
  }) => {
    console.log(rest);
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
      ...rest,
    };
  }
);

export default Stack;
