// components/ServiceUploadForm.js
import SearchInput from "@/components/SearchInput";

/**
 * ServiceUploadForm: Renders the SearchInput component with all its props.
 * This component is a server component and only renders the form.
 * The state and interaction is managed by the client component.
 *
 * @param {object} props - The props passed to the SearchInput component.
 * @returns {JSX.Element} The rendered SearchInput component.
 */
const ServiceUploadForm = (props) => {
    return (
        <SearchInput {...props} />
    );
};

export default ServiceUploadForm;