import { initAll, getImageKit, makeChunks } from "@/pages/api/get-files";

export default function handler (req, res) {
    if (process.env.MOCK) {
        return res.status(200).json({done: true, result: []})
    }
    const {files, pin} = req.body
    const imageKit = getImageKit(pin.toLowerCase()).imageKit
    Promise.all(makeChunks(files.map(x => x.fileId), 50).map(x => imageKit.bulkDeleteFiles(x)))
        .then((response) => {
            res.status(200).json({done: true, response})
        })
        .catch(error => {
            res.status(500).json({done: false, error})
        });
}
