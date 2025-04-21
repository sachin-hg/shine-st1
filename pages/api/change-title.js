import {changeTitle as cTitle} from "@/pages/api/get-files";

export default function handler (req, res) {
    if (process.env.MOCK) {
        return res.status(200).json({done: true, result: []})
    } else {
        return cTitle(req, res)
    }
}
