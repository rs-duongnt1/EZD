import styled from "@emotion/styled";

const TypographyTitle = styled.h4({
  fontSize: "24px",
});

const TypographyDefault = styled.p({
  margin: 0,
  fontSize: "14px",
});

const TypographyLink = styled.a((props) => ({
  ...(props.color && {
    color: props.color,
  }),
}));

export const Typography = ({ children, variant, ...rest }) => {
  switch (variant) {
    case "title": {
      return <TypographyTitle {...rest}>{children}</TypographyTitle>;
    }
    case "link": {
      return <TypographyLink {...rest}>{children}</TypographyLink>;
    }
    default:
      return <TypographyDefault {...rest}>{children}</TypographyDefault>;
  }
};
