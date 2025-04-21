export default function handler(req, res) {
    if (process.env.MOCK) {
        // Return mocked data
        const mockData = [
            { pin: 'test1', title: 'title1', url: '/albums/test1' },
            { pin: 'test2', title: 'title2', url: '/albums/test2' },
            { pin: 'test3', title: 'title3', url: '/albums/test3' },
        ];
        return res.status(200).json({ done: true, result: mockData });
    } else {
        // TODO: Implement real data fetching logic here
        return res.status(500).json({ done: false, error: "Real data fetching not implemented yet" });
    }
}
