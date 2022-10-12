import styled from "@emotion/styled";

const TypographyTitle = styled.h4({
  fontSize: "18px",
});

const TypographyDefault = styled.p({});

const TypographyLink = styled.a({});

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
