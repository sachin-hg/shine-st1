// components/AlbumUploadForm.js
import SearchInput from "@/components/SearchInput";
import styles from '../upload-albums/uploadAlbums.module.css'
import cs from 'classnames'

/**
 * This component is a server component that renders the form for uploading albums.
 * It receives all the necessary props to render the SearchInput component.
 * It does not manage any state, since it is handled by the client component.
 */
export default function AlbumUploadForm({
                                          actions,
                                          onSubmit,
                                          title,
                                          initialValue,
                                          submitText,
                                          subTitle,
                                          fields,
                                          children,
                                          files,
                                          duplicateNewNameFound,
                                          numeric,
                                          numFiles
                                      }) {

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
                {/*this are the children that contain the list of files */}
                {children}
            </SearchInput>
            {duplicateNewNameFound && <div className={styles.duplicateName}>Duplicate names found. Names must be unique</div>}
            {!numeric && <div className={styles.duplicateName}>Names of the files must be numeric</div>}
            {numFiles > 150 && <div className={styles.duplicateName}>Maximum 150 files are allowed</div>}
        </>
    );
}