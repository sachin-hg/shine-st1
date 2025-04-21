import { login as lgn } from "@/pages/api/get-files";

export default function handler (req, res) {
    if (process.env.MOCK) {
        return res.status(200).json({ done: true, token: 'mock_token', role: 'admin', username: 'mockuser' })
    } else {
        return lgn(req, res)
    }
}
