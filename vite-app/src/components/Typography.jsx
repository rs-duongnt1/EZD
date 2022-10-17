import styled from '@emotion/styled';

const TypographyTitle = styled.h4(
  ({ children, style, theme, ...rest }) => ({
    fontSize: 24,
    ...rest,
  }),
);

const TypographyDefault = styled.p(
  ({ children, style, theme, ...rest }) => ({
    fontSize: 14,
    margin: 0,
    ...rest,
  }),
);

const TypographyLink = styled.a(
  ({ children, style, theme, ...rest }) => ({
    ...rest,
  }),
);

export const Typography = ({ children, variant, ...rest }) => {
  switch (variant) {
    case 'title': {
      return <TypographyTitle {...rest}>{children}</TypographyTitle>;
    }
    case 'link': {
      return <TypographyLink {...rest}>{children}</TypographyLink>;
    }
    default:
      return <TypographyDefault {...rest}>{children}</TypographyDefault>;
  }
};
