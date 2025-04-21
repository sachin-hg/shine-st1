import ImageKit from 'imagekit'
import crypto from 'crypto'
const endpoint = "https://ik.imagekit.io/shinest/"
const privateKey = process.env.TEMP_KEY;
const publicKey = "public_OhjxwkIeAE/RJZt2J3fCav5kl4I=";
import {runBatch} from "@/utils/runBatch";
import {makeChunks} from "@/utils/makeChunks";
const account1 = {
    email: "smilegarg110@gmail.com",
    publicKey: "public_/ByX9Tb7/wjtatzTatuaH9115Zw=",
    privateKey: process.env.ACCOUNT1_KEY,
    urlEndpoint: "https://ik.imagekit.io/shine110/"
}

const account2 = {
    email: "shinegarg111@gmail.com",
    publicKey: "public_C1W/B5zH1/q3WAGB0aZRedTqKxU=",
    privateKey: process.env.ACCOUNT2_KEY,
    urlEndpoint: "https://ik.imagekit.io/shine111/"
}

const account3 = {
    email: "110anilgarg@gmail.com",
    publicKey: "public_LUrXWc5fS0ssZQ5TtB3cXOBzg7k=",
    privateKey: process.env.ACCOUNT3_KEY,
    urlEndpoint: "https://ik.imagekit.io/110anil/"
}

const account4 = {
    email: "shinegarg110@gmail.com",
    publicKey: "public_S0w+m0H8pj2hcT6lp9tP9+8Me78=",
    privateKey: process.env.ACCOUNT4_KEY,
    urlEndpoint: "https://ik.imagekit.io/smile110/"
}

const account5 = {
    email: "smile@shinestudio.in",
    publicKey: "public_rfcRd0HCp2TfvtrNW5EqPkQ23Mg=",
    privateKey: process.env.ACCOUNT5_KEY,
    urlEndpoint: "https://ik.imagekit.io/110smile/"
}

const imageKitMap = [account1, account2, account3, account4, account5]

const temp = {urlEndpoint: endpoint, privateKey, publicKey}
const accounts = [temp, temp, temp, temp, temp]

const getImageKit = (pin) => {
    let index = 0
    if (pin) {
        pin = pin.replace('/', '')
        index = parseInt(pin, 36) % 5
    }
    let obj = imageKitMap[index]
    if (!obj.imageKit) {
        obj.imageKit = new ImageKit({
            publicKey: obj.publicKey,
            privateKey: obj.privateKey,
            urlEndpoint: obj.urlEndpoint
        })
    }
    return obj
}

const initAll = () => {
    imageKitMap.forEach(obj => {
        if (!obj.imageKit) {
            obj.imageKit = new ImageKit({
                publicKey: obj.publicKey,
                privateKey: obj.privateKey,
                urlEndpoint: obj.urlEndpoint
            })
        }
    })
    return imageKitMap
}


export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
    },
}

const handle = (pin, meta) => {
    return new Promise((r, j) => {
        if (process.env.MOCK) {
            // Mock data for handle function
            const mockedImages = Array.from({ length: 5 }, (_, i) => ({
                url: `/images/test${i + 1}.webp`,
                fileId: `mockedFileId${i + 1}`,
                tags: ['mockedTag'],
            }));
            const mockedTags = ['mockedTag1', 'mockedTag2'];

            // If meta is true, return objects with url, id, and tags; otherwise, return URLs
            const images = mockedImages.map(x => meta ? ({ url: x.url, id: x.fileId, tags: x.tags }) : x.url);
            const song = meta ? { url: '/mocked/song.mp3', id: 'mockedSongId', tags: ['mockedSongTag'] } : '/mocked/song.mp3';

            // Resolve with mocked data
            r({
                song: song,
                done: true,
                width: 500,
                height: 300,
                images: images,
                tags: mockedTags,
            });
        } else {
            return getImageKit(pin).imageKit.listFiles({
                path: `data1/${pin}`
            }, function (error, result) {
                if (error) {
                    j({ done: false, error })
                return
            }
            let imgs = []
            let song = result.find(x => x.url.includes('song'))
            if (song) {
                song = meta ? {url: song.url, id: song.fileId, tags: song.tags ? song.tags : []} : song.url
            }
                let normalFiles = result.filter(x => !(x.tags || []).includes('front') && !(x.tags || []).includes('back') && !x.url.includes('song'))
            const front = result.find(x => (x.tags || []).includes('front'))
            const back = result.find(x => (x.tags || []).includes('back'))

            normalFiles = normalFiles.sort((x, y) => {
                try {
                    let {groups: {key: xIndex}} = x.url.match(/(?<key>(\d+))(\.(?<hash>[a-zA-Z0-9]+)){0,1}\.(?<ext>[a-zA-Z0-9]+)/) || {}
                    let {groups: {key: yIndex}} = y.url.match(/(?<key>(\d+))(\.(?<hash>[a-zA-Z0-9]+)){0,1}\.(?<ext>[a-zA-Z0-9]+)/) || {}
                    xIndex = parseInt(xIndex)
                    yIndex = parseInt(yIndex)

                    return xIndex < yIndex ? -1 : 1
                } catch (e) {
                    return -1
                }
            })
            if (front) {
                imgs.push(front)
            }
            imgs = [...imgs, ...normalFiles]
            if (back) {
                imgs.push(back)
            }
            const {width, height, tags} = imgs[1] || imgs[0] || {}
                const t = (tags || []).filter(tag => !['front', 'back'].includes(tag));
                r({ song, done: true, width: (width || 0) / 2, height, images: imgs.map(x => meta ? ({ url: x.url, id: x.fileId, tags: x.tags ? x.tags : [] }) : x.url), tags: t })
            })
        }
    })
}

export async function getData() {
    if (process.env.MOCK) {
        return {
            logoMap: {
                whiteLogo: "/images/logo.png",
                favicon32: "/images/logo.png",
                mainLogo: "/images/logo.png",
            },
            topimages: Array.from({ length: 5 }, (_, i) => ({
                url: `/images/test${i + 1}.webp`,
                tags: ["top", `image${i + 1}`],
            })),
            bottomimages: Array.from({ length: 4 }, (_, i) => ({
                url: `/images/test${i + 1}.webp`,
                tags: ["bottom", `image${i + 1}`],
            })),
            scrollframes: Array.from({ length: 4 }, (_, i) => ({
                location: `Location ${i + 1}`,
                bgLeft: i % 2 === 0,
                title: `Scroll Frame ${i + 1}`,
                description: `Description for scroll frame ${i + 1}`,
            })),
            servicethumbnails: Array.from({ length: 2 }, (_, i) => ({
                url: `/images/test${i + 1}.webp`,
                tags: ["service", `thumbnail${i + 1}`],
            })),
            featured: Array.from({ length: 2 }, (_, i) => ({
                url: `/images/test${i + 1}.webp`,
                tags: ["featured", `image${i + 1}`],
            })),
            testimonials: Array.from({ length: 2 }, (_, i) => ({
                title: `Testimonial ${i + 1}`,
                content: `This is a great service! ${i + 1}`,
                image: `/images/test${i + 1}.webp`,
            })),
            galleryimages: Array.from({ length: 2 }, (_, i) => ({
                url: `/images/test${i + 1}.webp`,
                tags: ["gallery", `image${i + 1}`],
            })),
        };
    } else {
        const keys = ['topimages', 'servicethumbnails', 'scrollframes', 'featured', 'galleryimages', 'testimonials', 'bottomimages', 'logos']
        const data = await Promise.all(keys.map(key => handleData(key)))
        const finalData = data.reduce((res, item, index) => {
            res[keys[index]] = item
            return res
        }, {})
        finalData.logoMap = (finalData.logos || []).reduce((res, { url, tags = [] }) => (tags.reduce((res, tag) => (res[tag] = url, res), res)), {})
        return finalData
    }
}

const handleData = (pin) => {
    if (process.env.MOCK) {
        const mockedData = Array.from({ length: 3 }, (_, i) => ({
            url: `/images/mocked${i + 1}.jpg`,
            tags: ['mockedTag1', 'mockedTag2'],
        }));

        // Resolve with mocked data
        return Promise.resolve(mockedData);
    } else {
        // Original logic for non-mock mode
        return new Promise((r, j) => { // Line 194
            getImageKit(pin).imageKit.listFiles({
            path: `data1/${pin}`
        }, function(error, normalFiles) {
            if(error) {
                j({done: false, error})
                return
            }

            normalFiles = normalFiles.sort((x, y) => {
                try {
                    let {groups: {key: xIndex}} = x.url.match(/(?<key>(\d+))(\.(?<hash>[a-zA-Z0-9]+)){0,1}\.(?<ext>[a-zA-Z0-9]+)/) || {}
                    let {groups: {key: yIndex}} = y.url.match(/(?<key>(\d+))(\.(?<hash>[a-zA-Z0-9]+)){0,1}\.(?<ext>[a-zA-Z0-9]+)/) || {}
                    xIndex = parseInt(xIndex)
                    yIndex = parseInt(yIndex)

                    return xIndex < yIndex ? -1 : 1
                } catch (e) {
                    return -1
                }
            })
                r(normalFiles.map(x => ({ url: x.url, tags: x.tags })))
            })
        })
    }
}

export default function handler (req, res) {
    if (process.env.MOCK) {
         const mockData = Array.from({ length: 10 }, (_, i) => ({
             pin: `test${i + 1}`,
             tags: [],
         }));

         // Add specific tags for test2 and test5
         mockData[1].tags = ['red']; // test2
         mockData[4].tags = ['blue', 'small']; // test5

         return res.status(200).json(mockData);
     }
     return initAll().reduce((res, {imageKit}) => {
         return imageKit.listFiles({
             path : `data1`
         }).then(r => {
                 const t = r.map(({ filePath }) => filePath.replace(/\/data1\//, '').split('/')[0]).filter(Boolean).reduce((res, pin) => {
                 res[pin] = []
                 return res
             }, {})
             return {...res, ...t}
         })
     }, Promise.resolve({})).then(x => res.status(200).json(Object.keys(x).map(pin => ({pin, tags: []})))).catch(x => res.status(500).json(x))
}

export function deleteFiles (req, res) {
    if (process.env.MOCK) {
        // Mock response for successful deletion
        return res.status(200).json({ done: true });
    } else {
        // Original logic for deleting files
        const { files, pin } = req.body;
        const imageKit = getImageKit(pin.toLowerCase()).imageKit;
        Promise.all(makeChunks(files.map(x => x.fileId), 50).map(x => imageKit.bulkDeleteFiles(x)))
            .then(response => {
                 res.status(200).json({ done: true, response });
            })
            .catch(error => {
                res.status(500).json({ done: false, error });
            });
    }
}
export function changeTitle (req, res) {
    const {fileIds, tags = [], oldTags = [], pin} = req.body
    let promise = Promise.resolve()
    const imageKit = getImageKit(pin.toLowerCase()).imageKit
    const files = makeChunks(fileIds, 50)
    if (oldTags.length) {
        promise = Promise.all(files.map(x => imageKit.bulkRemoveTags(x, oldTags)))
    }

    promise.then(() => Promise.all(files.map(x => imageKit.bulkAddTags(x, tags)))).then(result => res.status(200).json({ done: true, result })).catch(error => res.status(500).json({ done: false, error }))
}
export function changeTags (req, res) {
    const {files, pin} = req.body
    if (process.env.MOCK) {
        return res.status(200).json({ done: true });
    } else {
        const imageKit = getImageKit(pin.toLowerCase()).imageKit;
        return runBatch(files.map(f => {
            return () => imageKit.updateFileDetails(f.fileId, { tags: f.newTags.length ? f.newTags : null });
        })).then(result => res.status(200).json({ done: true, result })).catch(error => res.status(500).json({ done: false, error }));
    }
}
export function getCreds (req, res) {
    res.status(200).json(getImageKit(decodeURIComponent(req.query.pin).toLowerCase()).imageKit.getAuthenticationParameters())
}

export function renameFiles (req, res) {
    // Mock response for successful renaming
    return res.status(200).json({ done: true });
}
export const changePin  = async (req, res) => {
    if (process.env.MOCK) {
        return res.status(200).json({done: true})
    } else {
        try {
            let { newPin, pin } = req.body
            newPin = newPin.trim().toLowerCase()
            pin = pin.trim().toLowerCase()
            if (!pin || !newPin) {
                throw new Error('Pin/New Pin Missing')
            }

            const folder = `/data1/${newPin}`
            const originalImageKit = getImageKit(pin)
            const newImageKit = getImageKit(newPin)
                const timestamp = '.' + (new Date()).getTime()

            const data = await handle(pin, true)
            const data1 = await handle(newPin, true)
            if (data1 && data1.images && data1.images.length) {
                throw new Error('Pin exists')
            }

            let files = data.images || []
            if (data.song) {
                files = [...files, data.song]
            }
            files = files.map(file => {
                    const { url } = file
                    let { groups: { key, ext } } = url.match(/(?<key>(\d+|song))(\.(?<hash>[a-zA-Z0-9_\-]+)){0,1}\.(?<ext>[a-zA-Z0-9]+)/) || {}
                    return { ...file, key, ext }
            })

            const result = await runBatch(files.map(f => {
                return () => newImageKit.imageKit.upload({ useUniqueFileName: false, fileName: `${f.key}${timestamp}.${f.ext}`, folder, file: f.url, tags: f.tags.length ? f.tags : null })
            }))

            const res2 = await Promise.all(makeChunks(files.map(f => f.id), 50).map(x => originalImageKit.imageKit.bulkDeleteFiles(x)))
                res.status(200).json({ done: true, result })
        } catch (e) {
            res.status(500).json({done: false, error: e.message})
        }
    }
}

export const getUsage = (req, res) => {
    if (process.env.MOCK) {
        const mockData = {
            result: [{}, {}, {}],
        };
        return res.status(200).json({ done: true, result: mockData.result });
    } else {
        const a = new Date()
        const year = a.getFullYear()
        let endDate = a.getDate().toString().padStart(2, '0')
        let startDate = '01'
        const month = (a.getMonth() + 1).toString().padStart(2, '0')

        startDate = [year, month, startDate].join('-')
        endDate = [year, month, endDate].join('-')

        Promise.all(initAll().map(({privateKey}) => {
            let headers = new Headers();

            headers.set('Content-Type', 'application/json')
            headers.set('Authorization', 'Basic ' + Buffer.from(privateKey + ":" + "").toString('base64'))

                return fetch('https://api.imagekit.io/v1/accounts/usage?' + new URLSearchParams({
                startDate,
                endDate,
            }), {
                headers: headers,
                    method: 'GET'
            }).then(res => res.json())
        })).then(r => {
            res.status(200).json({done: true, result: r})
        }).catch(e => {
            res.status(500).json({done: false, error: e.message})
        })
    }
}

export function findAlbum (req, res) {
    if (process.env.MOCK) {
        // Mock data for findAlbum function
        const mockedAlbums = Array.from({ length: 3 }, (_, i) => ({
            pin: `album${i + 1}`,
            title: `Mocked Album ${i + 1}`,
            url: `/albums/album${i + 1}`,
        }));
        return res.status(200).json({ done: true, result: mockedAlbums });
    } else {
        // Original logic for non-mock mode
        let title = req.body.title;
        title = title.split(/( & | and | )/i);
        title = title.filter(x => x.length && !/(&|and| )/i.test(x)).map(x => x.charAt(0).toUpperCase() + x.slice(1));
        if (title.length > 1) {
            title = [title.join(' & '), title.reverse().join(' & ')];
        } else {
            title = [title.join(' & ')];
        }
            title = [...new Set([...title, ...title.map(x => x.toLowerCase()), ...title.map(x => x.toUpperCase())]
            .reduce((res, item) => {
                res = [...res, item, item.replace('&', 'and'), item.replace('&', 'And')];
                return res;
            }, []))];
        const obj = {};
        return Promise.all(initAll().map(({ imageKit }) => imageKit.listFiles({
            tags: [...title, req.body.title]
        }).then(result => {
            result.forEach((file) => {
                let { tags, filePath } = file;
                const pin = filePath.replace(/\/data1\//, '').split('/')[0];
                if (!obj[pin]) {
                    obj[pin] = tags[0];
                }
            });
        }))).then(() => {
            res.status(200).json({ done: true, result: Object.keys(obj).map(pin => ({ pin, title: obj[pin], url: `/albums/${pin}` })) });
        }).catch((error) => res.status(500).json({ done: false, error }));
    }
}

export function findServices (req, res) {
    if (process.env.MOCK) {
        // Mock data for findServices function
        const mockedServices = Array.from({ length: 2 }, (_, i) => ({
            key: `service${i + 1}`,
            text: `Mocked Service ${i + 1}`,
            url: `/edit-services/service${i + 1}`,
        }));
        return res.status(200).json({ done: true, result: mockedServices });
    } else {
        // Original logic for non-mock mode
        const obj = {};
        return Promise.all(initAll().map(({ imageKit }) => imageKit.listFiles({
            tags: ['service_tag']
        }).then(result => {
            result.forEach((file) => {
                let { tags, filePath } = file;
                const { groups: { pin } = {} } = filePath.match(/\/data1\/services\/(?<pin>(.)+)\/.+\..+$/) || {};
                if (!obj[pin]) {
                    obj[pin] = tags[1];
                }
            });
        }))).then(() => {
            res.status(200).json({ done: true, result: Object.keys(obj).map(pin => ({ key: pin, text: obj[pin], url: `/edit-services/${pin}` })) });
        }).catch((error) => res.status(500).json({ done: false, error }));
    }
}

export function login (req, res) {
    if (process.env.MOCK) {
        // Mock a successful login response
        return res.status(200).json({ done: true, token: 'mockedToken', role: 'admin', username: 'testuser' });
    } else {
        // RSA keys and crypto functions (as before)
        const keys = {
            publicKey: '-----BEGIN PUBLIC KEY-----\n' +
                'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCuWRg7+PmOgA2BrqODmM48MGh+\n' +
                'yqdvKCp7+jPR6TuFuE/OnF72dd+Zt8cOoOsNuX0zwptC/fJjIpajg6HO06LnweQ9\n' +
                'gKAl+oAjTKt3/dgrVEpie7QGrAK24H6aKS9jB9Cjf3w/uGBLWg7YmUw/ti0+pAws\n' +
                'aZhZQn+l9CyOzNXsHwIDAQAB\n' +
                '-----END PUBLIC KEY-----\n',
            privateKey: process.env.RSA_KEY
        };

        const createToken = ({username, password}) => {
            const signerObject = crypto.createSign("RSA-SHA256");
            signerObject.update(`${username}-${password}`);
            return signerObject.sign({ key: keys.privateKey, padding: crypto.constants.RSA_PKCS1_PSS_PADDING }, "base64");
        };

        const verifyToken = ({ username, password, token }) => {
            const verifierObject = crypto.createVerify("RSA-SHA256");
            verifierObject.update(`${username}-${password}`);
                return verifierObject.verify({ key: keys.publicKey, padding: crypto.constants.RSA_PKCS1_PSS_PADDING }, token, "base64");
        };
        const { username: uname, password, token: t } = req.body;
        const { username = uname, token } = t ? JSON.parse(Buffer.from(t, 'base64').toString('ascii')) : {};
        getImageKit('usermanagement').imageKit.listFiles({
            path: `data1/usermanagement`,
                tags: [username]
        }, function(error, result) {
            if (error) {
                res.status(500).json({ done: false, error });
                return;
            }
            const user = result.filter(({ tags }) => {
                const [uName, pWord] = tags || [];
                if (username === uName) {
                    if (token) {
                        return verifyToken({ username, password: pWord, token });
                    }
                    if (password === pWord) {
                        return true;
                    }
                }
                return false;
            }).map(({ tags: [username, password, role] = [] }) => ({ username, password, role }))[0];
                if (!user) {
                res.status(200).json({ done: false, error: new Error('User Not Found') });
                return;
            }
            const newToken = t || Buffer.from(JSON.stringify({ username, token: createToken(user) })).toString('base64');
            res.status(200).json({ done: true, token: newToken, role: user.role, username: user.username });
        });
    }
}