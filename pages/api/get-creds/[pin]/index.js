import {getCreds} from "@/pages/api/get-files";

export default function handler (req, res) {
    if (process.env.MOCK) {
        return res.status(200).json({ timestamp: '123', signature: 'mock_signature' })
    } else {
        return getCreds(req, res)
    }
}
