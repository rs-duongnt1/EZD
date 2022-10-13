import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import Container from "./Container";

const TabContainer = styled.div({
  width: "100%",
  borderBottom: "1px solid #d6d6d6",
});

const TabList = styled(Container)({
  display: "flex",
});

export const TabItem = styled.div(({ active }) => ({
  cursor: "pointer",
  userSelect: "none",
  padding: "11px 12px",
  color: "#808080",
  marginBottom: "-1px",
  border: "1px solid transparent",
  fontSize: "16px",
  ":hover": {
    color: "#212121",
  },
  ...(active && {
    border: "1px solid #d6d6d6",
    borderBottom: "none",
    backgroundColor: "#fff",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    color: "#212121",
  }),
}));

export const Tabs = ({ children, value, onChange }) => {
  const childrenClone = [];
  console.log(value, children);
  let no = 0;

  for (const child of children) {
    const component = React.cloneElement(child, {
      active: value === child.props.value,
      key: "tab-item-" + no,
      onClick: () => {
        if (typeof onChange === "function") {
          onChange(child.props.value);
        }
      },
    });

    no++;

    childrenClone.push(component);
  }

  return (
    <TabContainer>
      <TabList>{childrenClone}</TabList>
    </TabContainer>
  );
};
