'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SearchInput from "@/components/SearchInput";
import {useEffect, useState} from 'react'
import styles from './uploadAlbums.module.css'
import styles2 from '@/components/AlbumPageContainer/albums.module.css'
import AlbumsRenderer from '@/components/AlbumRenderer';
import AlbumPage from '@/components/AlbumPage';
import PreviewTemp from '@/components/Preview';
import Login from '@/components/Login';
import Home from '@/components/Home';
import cs from 'classnames'
import logo from '@/images/logo.png'
import white from '@/images/white.webp'
import {upload} from "@/utils/upload";
import { useParams } from 'next/navigation'
const items = [{text: 'Home', url: '/'}, {text: 'Dashboard', url: '/dashboard'}, {text: 'Albums', url: '/albums'}, {text: 'Upload', url: '/upload-albums'}, {text: 'Find', url: '/find-albums'}, {text: 'Edit', url: '/edit-albums'}]
const leftItems = ['Contact', {name: 'Logout', onClick: () => {
        localStorage.removeItem('authToken')
        window.location.reload()
    }}]

// logoMap, topimages, bottomimages, scrollframes, servicethumbnails, featured, testimonials, galleryimages

const AlteredAlbum = (props) => {
    const {onClose} = props
    const right = [{text: 'Close Preview', onClick: onClose}]
    return <AlbumPage {...props} rightItems={right} />
}

const AlteredHome = (props) => {
    const {onClose} = props
    const right = [{text: 'Albums', url: '/albums'}, {text: 'Close Preview', onClick: onClose}]
    return <Home {...props} rightItems={right} />
}

const logoValidator = (existingData, files) => {
    const keys = {}
    const {images = []} = existingData || {}
    images.filter(x => !x.deleted).forEach(({tempTags: {title} = {}}) => {
        title && (keys[title.trim()] = (keys[title.trim()] || 0) + 1)
    })
    files.filter(x => !x.deleted).forEach(({tempTags: {title} = {}}) => {
        title && (keys[title.trim()] = (keys[title.trim()] || 0) + 1)
    })

    const requiredKeys = ['whiteLogo', 'favicon32', 'favicon16', 'android512', 'android192', 'mainLogo', 'apple', 'icon']
    const errors = []
    const notFoundKeys = requiredKeys.filter(x => {
        return keys[x] === undefined
    })
    if (notFoundKeys.length) {
        errors.push(`Following Logos are missing: ${notFoundKeys.join()}.`)
    }
    const duplicateKeys = Object.keys(keys).filter(key => keys[key] !== 1)
    if (duplicateKeys.length) {
        errors.push(`Multiple files found for following logos: ${duplicateKeys.join()}.`)
    }
    if (errors.length) {
        return {valid: false, error: errors.join(' ')}
    }
    return {valid: true}

}

const serviceValidator = (existingData, files) => {
    const found = {}
    const {images = []} = existingData || {}
    images.filter(x => !x.deleted).forEach(({tempTags: {pin} = {}}) => {
        if (pin) {
            pin = pin.trim().toLowerCase()
            pin && (found[pin] = (found[pin] || 0) + 1)
        }
    })
    files.filter(x => !x.deleted).forEach(({tempTags: {pin} = {}}) => {
        if (pin) {
            pin = pin.trim().toLowerCase()
            pin && (found[pin] = (found[pin] || 0) + 1)
        }
    })
    const duplicateKeys = Object.keys(found).filter(key => found[key] !== 1)
    if (duplicateKeys.length) {
        return {valid: false, error: `Multiple files found for following pins: ${duplicateKeys.join()}`}
    }
    return {valid: true}
}
const userValidator = (existingData, files) => {
    const {images = []} = existingData || {}
    const usernames = {}
    let regexFail = false
    let roleFail = false
    let duplicateUserName = false
    let sameUP = false

    const val = ({tempTags: {username, password, role} = {}}) => {
        [username, password, role].find(x => /[ \n\t\r]/.test(x)) && (regexFail = true)
        !['admin', 'user'].includes(role) && (roleFail = true)

        if (usernames[username]) {
            duplicateUserName = true
        } else {
            usernames[username] = true
        }
        if (username === password) {
            sameUP = true
        }
    }
    images.filter(x => !x.deleted).forEach(val)
    files.filter(x => !x.deleted).forEach(val)

    const errors = []

    if (regexFail) {
        errors.push('Whitespaces not allowed.')
    }

    if (roleFail) {
        errors.push('Role must be user or admin.')
    }

    if (duplicateUserName) {
        errors.push('username must be unique.')
    }

    if (roleFail) {
        errors.push('username and password must not be same.')
    }

    if (errors.length) {
        return {valid: false, error: errors.join(' ')}
    }
    return {valid: true}
}
const specialItems = {
    featured: {title: 'Edit Featured Section', subtitle: 'Edit Featured Section', submitText: 'Update'}, // nothing required
    galleryimages: {title: 'Edit Gallery Images', subtitle: 'Edit Gallery Images', submitText: 'Update'}, // nothing required
    testimonials: {title: 'Edit Testimonials', subtitle: 'Edit Testimonials', submitText: 'Update', tags: [{key: 'name', required: true, maxLength: 30}, {key: 'description', required: true}]}, // required 2 tags: name, description. parser and deParser required
    servicethumbnails: {validator: serviceValidator, title: 'Edit Services Offered', subtitle: 'Edit Services Offered', submitText: 'Update', tags: [{key: 'serviceName', required: true}, {key: 'pin', required: true}]}, // required 1 tag
    scrollframes: {title: 'Edit Scroll Controlled Video', subtitle: 'Edit Scroll Controlled Video', submitText: 'Update'}, // nothing required
    albumthumbnail: {dataKeys: ['logos'], preview: AlteredAlbum, title: 'Edit Album Page Thumbnail', subtitle: 'Edit Album Page Thumbnail Image', submitText: 'Update'}, // nothing required
    bottomimages: {title: 'Edit Images in bottom section', subtitle: 'Edit Images in bottom section', submitText: 'Update', tags: [{key: 'title', required: false}]}, // optional tag
    topimages: {title: 'Edit Images in top section', subtitle: 'Edit Images in top section', submitText: 'Update', tags: [{key: 'title', required: false}]}, // optional tag
    logos: {validator: logoValidator, title: 'Edit Website Logos', subtitle: 'Edit Website logos', submitText: 'Update', tags: [{key: 'title', required: true, disabled: true}]}, // required 1 tag,
    usermanagement: {validator: userValidator, preview: false, roles: ['admin'], title: 'Edit Users', subtitle: 'Add / Remove users', submitText: 'Update', tags: [{key: 'username', required: true}, {key: 'password', required: true, type: 'password'}, {key: 'role', required: true}]}
}

const unParse = (item, pin) => {
    let {tags = []} = specialItems[pin] || {}
    return {
        ...item,
        newTags: tags.reduce((res, {key}) => {
            if (item.tempTags && item.tempTags[key] !== undefined) {
                res.push(item.tempTags[key].trim())
            }
            return res
        }, [])
    }
}

const getFiles = async (pin) => {
        let {done, images = [], ...dta} = await fetch('/api/get-files', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({pin, meta: true})}).then(res => res.json())
        if (!done) {
            return Promise.reject('Something went wrong')
        }
    let specialItem = false
    if (pin && specialItems[pin]) {
        specialItem = specialItems[pin]
    }
    const {tags: specialTags = [], parse = (tags = []) => {
        return specialTags.reduce((res, item, index) => {
            if (tags[index]) {
                res[item.key] = tags[index]
            }
            return res
        }, {})
    }} = specialItem || {}

    images = images.map(x => {
        const name = x.url.match(/\/[\w\s\.\-]+\.[a-zA-Z0-9]+$/)[0].replace('/', '')
        const splits = name.split('.')
        const ext = `.${splits.slice(-1)[0]}`
        const key = parseInt(splits.slice(0, splits.length - 1).join('.'))

        return {url:x.url, fileId: x.id, originalKey: key.toString(), key, ext, deleted: false, tempTags: parse(x.tags)}
    })
        return Promise.resolve({pin, images, ...dta})
}


const PreviewComp = ({specialItem, togglePreview, data, existingData, files}) => {
    const {preview: Preview = AlteredHome} = specialItem
    if (specialItem) {
        files = files.filter(f => !f.deleted).map(x => unParse(x, existingData.pin)).map(x => ({...x, tags: x.newTags, url: x.objectUrl}))
        existingData = {...existingData, images: existingData.images.filter(x => !x.deleted).map(x => unParse(x, existingData.pin)).map(x => ({...x, tags: x.newTags}))}
        const f = [...files, ...existingData.images].sort((x, y) => x.key > y.key ? 1 : -1)
        let dta = {[existingData.pin]: f}
        if (existingData.pin === 'logos') {
            dta = {logoMap: f.reduce((res, item) => {
                res[item.tags[0]] = item.url
                    return res
                }, {})}
        }
        return <PreviewTemp onClose={() => togglePreview()} component={Preview} modifiedData={dta} keys={specialItem.dataKeys} />
    } else if (!specialItem) {
        return <AlbumsRenderer onClose={() => togglePreview()} logoMap={{whiteLogo: white.src}} title={data.title} images={[...((existingData || {}).images || []), ...files].map(({url, objectUrl, key, deleted}) => ({url: url || objectUrl, key, deleted})).filter(x => !x.deleted).sort((x, y) => x.key > y.key ? 1 : -1).map(x => x.url)} />
    }
    return null
}

function Edit({role = 'user', username}) {
    const [files, setFiles] = useState([])
    const [existingData, setExistingData] = useState(null)
    const [showPreview, setPreview] = useState(false)
    let {pin: urlPin} = useParams()
    if (urlPin) {
        urlPin = urlPin.toLowerCase()
    }
    let specialItem = false
    let requiredRoles = ['user', 'admin']
    if (existingData && existingData.pin && specialItems[existingData.pin]) {
        specialItem = specialItems[existingData.pin]
        requiredRoles = specialItem.roles || requiredRoles
    }

    const roleMatch = requiredRoles.includes(role)

    const {tags: specialTags = [], title = 'Edit Album', subtitle = 'Edit Album', submitText = 'Update Album', preview: showSpecialView = true} = specialItem || {}

    const togglePreview = (formData) => {
        if (showPreview) {
            setPreview(false)
            return
        }
        setPreview(formData)
    }
    const findAlbum = async (formData) => {
        console.log(formData)
        let {pin} = formData
        pin = pin.toLowerCase()
        setExistingData(null)
        setFiles([])
        const exData = await getFiles(pin)
        if (!exData.images || !exData.images.length) {
            alert('Album Not Found')
            return
        }
        setExistingData(exData)
    }

    useEffect(() => {
        if (urlPin) {
            findAlbum({pin: urlPin})
        }
    }, [urlPin])

    const deleteFiles = (files, pin, purge = true) => {
        return fetch('/api/delete-files', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({files, purge, pin})}).then(res => res.json())
    }

    const renameFilesAndPurgeCache = (files, existingKeys, pin) => {
        return fetch('/api/rename-files', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({files, existingKeys, pin})}).then(res => res.json())
    }

    const uploadFilesAndUpdateTags = async (files, {title, pin}) => {
        return upload(files, {title, pin})
    }



    const updateTitleOnOldFiles = (fileIds, {pin, title, oldTitle}) => {
        return fetch('/api/change-title', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({pin, fileIds, title, oldTitle})}).then(res => res.json())
    }

    const updateTags = (files, pin) => {
        return fetch('/api/change-tags', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({pin, files})}).then(res => res.json())
    }

    const onSubmit = async (formData) => {
        console.log(formData)
        let {title} = formData
        let {images, pin} = existingData
        pin = pin.toLowerCase()
        let imagesToDelete = images.filter(x => x.deleted)
        if (imagesToDelete.length) {
            await deleteFiles(imagesToDelete, pin)
        }

        const existingKeys = images.reduce((res, item) => {
            res[item.originalKey] = true
            return res
        }, {})
        let imagesToRename = images.filter(x => x.originalKey.toString() !== x.key.toString())
        if (imagesToRename.length) {
            await renameFilesAndPurgeCache(imagesToRename, existingKeys, existingData.pin)
        }

        let f = files.filter(x => !x.deleted)

        if (f.length) {
            await uploadFilesAndUpdateTags(f.filter(x => !x.deleted).map(x => unParse(x, pin)), {title, pin})
        }

        const unchangedFiles = images.filter(x => !x.deleted)

        if (!specialItem && unchangedFiles.length && title !== existingData.title) {
                await updateTitleOnOldFiles(unchangedFiles.map(x => x.fileId), {pin: existingData.pin, title, oldTitle: existingData.title})
        } else if (specialItem) {
            const f = unchangedFiles.map(x => unParse(x, pin)).filter(x => (x.newTags || []).length > 0)
            if (f.length) {
                await updateTags(f, existingData.pin)
            }
        }

        setFiles([])
        await findAlbum({pin})
        alert('Album Updated')
    }
    let names = new Set()
    let numeric = true
    let duplicateNewNameFound = false
    let lastIndex = -1

    let res = {valid: true}
    if (specialItem.validator) {
        res = specialItem.validator(existingData, files)
    }
    const {valid: resValid, error} = res
    const children = <>
        {existingData && (
            <div>
                <div className={styles.title}>Existing Files</div>
                {existingData.images.map(({url, key, deleted, tempTags = {}}) => {
                    let localNumeric = true
                    let localDuplicate = false
                    if (!deleted) {

                        if (!/^\d+$/.test(key.toString())) {
                            numeric = false
                            localNumeric = false
                        }
                        if (names.has(key.toString())) {
                            duplicateNewNameFound = true
                            localDuplicate = true
                        } else {
                            names.add(key.toString())
                        }
                        const k = parseInt(key)
                        if (k > lastIndex) {
                            lastIndex = k
                        }
                    }
                    return (
                        <div className={cs((!localNumeric || localDuplicate) && styles.duplicateNameFile, styles.fileContainer, deleted && styles.deleted)} key={url}>
                            <div className={styles.file} style={{'--bg': `url('${url}')`}} />
                            <input className={styles.input} value={key} onChange={
                                (e) => {
                                    setExistingData({
                                        ...existingData,
                                        images: existingData.images.map((f) => {
                                            return {
                                                ...f,
                                                key: url === f.url ? e.target.value : f.key
                                            }
                                        })
                                    })
                                }
                            } />
                            {specialTags.map(({key, maxLength = 470, type = 'text', disabled = false}) => <input disabled={disabled} type={type} maxLength={maxLength} placeholder={key} key={key} className={styles.input} value={tempTags[key] || ''} onChange={e => {
                                setExistingData({
                                    ...existingData,
                                    images: existingData.images.map((f) => {
                                        return {
                                            ...f,
                                            tempTags: url === f.url ? {
                                                ...(f.tempTags || {}),
                                                [key]: e.target.value
                                            } : f.tempTags
                                        }
                                    })
                                })
                            }} />)}
                            <div className={styles.delete} onClick={() => {
                                setExistingData({...existingData, images: existingData.images.map(f => ({...f, deleted: url === f.url ? !f.deleted : f.deleted}))})
                            }}>{deleted ? 'Restore' : 'Delete'}</div>
                        </div>
                    )
                })}
            </div>
        )}
        {files.length > 0 && (
            <div>
                <div className={styles.title}>New Files</div>
                {files.map(file => {
                    let localNumeric = true
                    let localDuplicate = false
                    const tempTags = file.tempTags || {}
                    if (!/^\d+$/.test(file.key.toString())) {
                        numeric = false
                        localNumeric = false
                    }
                    if (names.has(file.key.toString())) {
                        duplicateNewNameFound = true
                        localDuplicate = true
                    } else {
                        names.add(file.key.toString())
                    }
                    const k = parseInt(file.key)
                    if (k > lastIndex) {
                        lastIndex = k
                    }
                    return (
                        <div className={cs((!localNumeric || localDuplicate) && styles.duplicateNameFile, styles.fileContainer, file.deleted && styles.deleted)} key={file.objectUrl}>
                            <div className={styles.file} style={{'--bg': `url('${file.objectUrl}')`}} />
                            <input className={styles.input} value={file.key} onChange={
                                (e) => setFiles(files.map((f, i) => ({
                                    ...f,
                                    key: f.objectUrl === file.objectUrl ? e.target.value : f.key
                                })))
                            } />
                            {specialTags.map(({key, maxLength = 470, type = 'text'}) => <input type={type} maxLength={maxLength} key={key} placeholder={key} className={styles.input} value={tempTags[key] || ''} onChange={e => {
                                setFiles(files.map((f) => {
                                    return {
                                        ...f,
                                        tempTags: file.objectUrl === f.objectUrl ? {
                                            ...(f.tempTags || {}),
                                            [key]: e.target.value
                                        } : f.tempTags
                                    }
                                })
                                )
                            }} />)}
                            <div className={styles.delete} onClick={() => {
                                setFiles(files.map(f => ({
                                    ...f,
                                    deleted: file.objectUrl === f.objectUrl ? !f.deleted : f.deleted
                                })))
                            }}>{file.deleted ? 'Restore' : 'Delete'}</div>
                        </div>
                    )
                })}
            </div>
        )}
        {duplicateNewNameFound && <div className={styles.duplicateName}>Duplicate names found. Names must be unique</div>}
        {!numeric && <div className={styles.duplicateName}>Names of the files must be numeric</div>}
        {!resValid && error && <div className={styles.duplicateName}>{error}</div>}
    </>
    const invalid = !resValid || duplicateNewNameFound || !numeric
    return (
        <>
            <Header logoMap={{mainLogo: logo.src}} leftItems={leftItems} rightItems={items} showLeft={false} />
            {urlPin && !existingData && <div className={styles2.loaderContainer}><div className={styles2.loader} /></div>}
            {roleMatch && <>
                {!urlPin && <SearchInput
                    onSubmit={findAlbum}
                    title={title} subTitle={subtitle} fields={[{key: 'pin', type: 'text', placeholder: 'Enter PIN'}]} />}
                {existingData && (
                    <SearchInput actions={invalid || !showSpecialView ? undefined : [{label: 'Preview', action: togglePreview}]}
                                 onSubmit={invalid ? undefined : onSubmit}
                                 submitText={submitText}
                                 initialValue={{title: existingData.title}}
                                 title={urlPin ? title : ''} subTitle={subtitle} fields={[...(!specialItem ? [{key: 'title', type: 'text', placeholder: 'Enter Album Title / Couple Name'}] : []), {key: 'files', type: 'file', placeholder: 'Select Files', validator: () => true, onChange: (e) => {
                            const f = [...e.target.files].map((file, index) => {
                                let [ext] = file.name.match(/\.[a-zA-Z0-9]+$/)
                                let name = file.name.replace(/\.[a-zA-Z0-9]+$/, '')
                                name = name.replace(/\D/g, '')
                                name = name.length > 0 ? name : index
                                return {ext, file, objectUrl: URL.createObjectURL(file), key: parseInt(name)}
                            }).sort((x, y) => x.key > y.key ? 1 : -1).map((file, index) => ({...file, key: index + 1 + lastIndex}))
                            setFiles([...files, ...f])
                            return f
                        }}]}>{children}</SearchInput>
                )}
            </>}
            {!roleMatch && <div className={styles.roleError}>You are not authorised for this action. Users with following roles can view this content: `{requiredRoles.join(', ')}`</div>}
            <div id='Contact'><Footer /></div>
            {showPreview && <PreviewComp specialItem={specialItem} togglePreview={togglePreview} data={showPreview} existingData={existingData} files={files} />}
        </>
    )
}

export default function EditPage () {
    return <Login component={Edit} />
}