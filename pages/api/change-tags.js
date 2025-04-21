import {initAll, getImageKit, changeTags as cTags} from "@/pages/api/get-files";

export default function handler (req, res) {
    if (process.env.MOCK) {
        return res.status(200).json({done: true, result: []})
    } else {
        return cTags(req, res)
    }
}
