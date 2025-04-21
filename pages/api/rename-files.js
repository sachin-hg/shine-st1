import {renameFiles as rFiles} from "@/pages/api/get-files";

export default function handler (req, res) {
    if (process.env.MOCK) {
        return res.status(200).json({done: true, response: []})
    } else {
        return rFiles(req, res)
    }
}
