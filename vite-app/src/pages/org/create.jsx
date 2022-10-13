import Container from "../../components/Container";
import Form, { Field, FormFooter, HelperMessage } from "@atlaskit/form";
import { RadioGroup } from "@atlaskit/radio";
import LoadingButton from "@atlaskit/button/loading-button";

const options = [
  { name: "visibility", value: "public", label: "Public" },
  { name: "visibility", value: "private", label: "Private" },
];

import Textfield from "@atlaskit/textfield";
import Spacing from "../../components/Spacing";
import { Typography } from "../../components/Typography";
import { useState } from "react";
import { useCreateOrgMutation } from "../../services/organization";
export default function CreateOrg() {
  const [isLoading, setIsLoading] = useState(false);
  const [createOrg] = useCreateOrgMutation();
  const handleCreateOrg = (formState) => {
    console.log("form submitted", formState);
    createOrg(formState);
    setIsLoading(true);
  };
  return (
    <Container fullWidth maxWidth={600}>
      <Typography variant="title">New Organization</Typography>
      <Form onSubmit={handleCreateOrg}>
        {({ formProps }) => (
          <form {...formProps}>
            <Spacing mb={20}>
              <Field label="Organization Name" name="name" isRequired>
                {({ fieldProps }) => <Textfield {...fieldProps} />}
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
