import SearchInput from "@/components/SearchInput";
import styles from "./uploadAlbums.module.css";
import cs from 'classnames'
const ServiceEditForm = ({
  actions,
  onSubmit,
  title,
  initialValue,
  submitText,
  subTitle,
  fields,
  children
}) => {
  return (
    <>
      <SearchInput
        actions={actions}
        onSubmit={onSubmit}
        title={title}
        initialValue={initialValue}
        submitText={submitText}
        subTitle={subTitle}
        fields={fields}
      >
        {children}
      </SearchInput>
    </>
  );
};

export default ServiceEditForm;