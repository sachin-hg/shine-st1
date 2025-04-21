import SearchInput from "@/components/SearchInput";
import styles from "./uploadAlbums.module.css";
import cs from 'classnames'

/**
 * @param props - all the props that SearchInput recieves
 * @returns {JSX.Element} - a searchInput component with all the fields and also a file list
 */
export default function AlbumEditForm(props) {
    const {files, names, numeric, duplicateNewNameFound, numFiles, lastIndex} = props

    const invalid = numFiles > 150 || duplicateNewNameFound || !numeric
    const children = <>
        {files.length > 0 && (
            <div>
                <div className={styles.title}>New Files</div>
                {files.map(file => {
                    let localNumeric = true
                    let localDuplicate = false
                    if (!/^\d+$/.test(file.key.toString())) {
                        numeric = false
                        localNumeric = false
                    }
                    if (names.has(file.key.toString())) {
                        duplicateNewNameFound = true
                        localDuplicate = true
                    }
                    const k = parseInt(file.key)
                    if (k > lastIndex) {
                        lastIndex = k
                    }
                    return (
                        <div className={cs((!localNumeric || localDuplicate) && styles.duplicateNameFile, styles.fileContainer, file.deleted && styles.deleted)} key={file.objectUrl}>
                            <div className={styles.file} style={{'--bg': `url('${file.objectUrl}')`}} />
                            <input className={styles.input} value={file.key} readOnly />
                            <div className={styles.delete}>{file.deleted ? 'Restore' : 'Delete'}</div>
                        </div>
                    )
                })}
                {duplicateNewNameFound && <div className={styles.duplicateName}>Duplicate names found. Names must be unique</div>}
                {!numeric && <div className={styles.duplicateName}>Names of the files must be numeric</div>}
                {numFiles > 150 && <div className={styles.duplicateName}>Maximum 150 files are allowed</div>}
            </div>
        )}
    </>
    return <SearchInput
        {...props}
        actions={invalid || !files.length ? undefined : props.actions}
        onSubmit={invalid ? undefined : props.onSubmit}
    >
        {children}
    </SearchInput>
}