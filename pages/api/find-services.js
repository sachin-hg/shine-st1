export default function handler(req, res) {
    if (process.env.MOCK) {
        // Return mocked data
        const mockData = [
            { key: 'test1', text: 'text1', url: '/edit-services/test1' },
            { key: 'test2', text: 'text2', url: '/edit-services/test2' },
            { key: 'test3', text: 'text3', url: '/edit-services/test3' },
        ];
        return res.status(200).json({ done: true, result: mockData });
    } else {
        // TODO: Implement real data fetching logic here
        return res.status(500).json({ done: false, error: "Real data fetching not implemented yet" });
    }
}
