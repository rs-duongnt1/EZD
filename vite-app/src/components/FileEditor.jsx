export default function FileEditor({ content, editable, converted }) {
  let _content = "";
  if (converted && typeof content !== "undefined") {
    _content = atob(content);
  }
  return <pre>{_content}</pre>;
}
