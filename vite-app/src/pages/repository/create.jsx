import Container from "../../components/Container";
import Form, { Field, FormFooter, HelperMessage } from "@atlaskit/form";
import { RadioGroup } from "@atlaskit/radio";
import LoadingButton from "@atlaskit/button/loading-button";

const options = [
  { name: "visibility", value: "public", label: "Public" },
  { name: "visibility", value: "private", label: "Private" },
];

const templates = [
  { name: "teamplate", value: "vue", label: "Vue" },
  { name: "teamplate", value: "react", label: "React" },
];

import Textfield from "@atlaskit/textfield";
import Spacing from "../../components/Spacing";
import { Typography } from "../../components/Typography";
import { useEffect, useState } from "react";
import { useGetListOrganizationsQuery } from "../../services/organization";
import Select from "@atlaskit/select";
import { useGetUserInfoQuery } from "../../services/user";
import { useCreateRepoMutation } from "../../services/repository";
import { useNavigate } from "react-router-dom";

export default function CreateOrg() {
  const [isLoading, setIsLoading] = useState(false);
  const [createOrg] = useCreateRepoMutation();
  const navigate = useNavigate();
  let { data: orgs, isSuccess: isGetListOrgsSuccess } =
    useGetListOrganizationsQuery();
  const { data: user, isSuccess } = useGetUserInfoQuery();
  let orgsList = [];

  if (isSuccess) {
    orgsList = [
      {
        label: user.username,
        value: user.username,
      },
    ];
    if (isGetListOrgsSuccess) {
      orgsList = [
        ...orgsList,
        ...orgs.map((org) => ({
          label: org.username,
          value: org.username,
        })),
      ];
    }
  }

  console.log(orgsList);

  const handleCreateRepo = (formState) => {
    setIsLoading(true);
    createOrg({
      org: formState.org.value,
      repo: formState.name,
      visibility: formState.visibility,
      template: formState.template,
    }).then(() => {
      setIsLoading(false);
      navigate(`/${formState.org.value}/${formState.name}`)
    })
  };
  return (
    <Container fullWidth maxWidth={600}>
      <Typography variant="title">New Repository</Typography>
      <Form onSubmit={handleCreateRepo}>
        {({ formProps }) => (
          <form {...formProps}>
            <Spacing mb={20}>
              <Field
                label="Organization"
                name="org"
                defaultValue={{ label: user?.username, value: user?.username }}
                isRequired
              >
                {({ fieldProps }) => (
                  <Select
                    {...fieldProps}
                    inputId="single-select-example"
                    className="single-select"
                    classNamePrefix="react-select"
                    options={orgsList}
                  />
                )}
              </Field>
            </Spacing>
            <Spacing mb={20}>
              <Field label="Repository Name" name="name" isRequired>
                {({ fieldProps }) => <Textfield {...fieldProps} />}
              </Field>
            </Spacing>
            <Spacing mb={20}>
              <Field
                label="Template"
                name="template"
                defaultValue="vue"
                isRequired
              >
                {({ fieldProps }) => (
                  <RadioGroup {...fieldProps} options={templates} />
                )}
              </Field>
            </Spacing>
            <Spacing>
              <Field
                label="Visibility"
                name="visibility"
                defaultValue="public"
                isRequired
              >
                {({ fieldProps }) => (
                  <RadioGroup {...fieldProps} options={options} />
                )}
              </Field>
            </Spacing>
            <FormFooter>
              <LoadingButton
                isLoading={isLoading}
                type="submit"
                appearance="primary"
              >
                Create
              </LoadingButton>
            </FormFooter>
          </form>
        )}
      </Form>
    </Container>
  );
}
