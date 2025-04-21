import { getData } from "@/pages/api/get-files";

export default async function handler(req, res) {
    if (process.env.MOCK) {
        // Return mocked data
        const mockData = {
            logoMap: {
                whiteLogo: "/white.webp",
                favicon32: "/favicon-32x32.png",
                mainLogo: "/images/logo.png"
            },
            topimages: [
                { url: "/images/logo.png", tags: ["top", "image1"] },
                { url: "/images/white.webp", tags: ["top", "image2"] },
                { url: "/images/test1.webp", tags: ["top", "image3"] },
                { url: "/images/test2.webp", tags: ["top", "image4"] },
                { url: "/images/test3.webp", tags: ["top", "image5"] },
            ],
            bottomimages: [
                { url: "/images/logo.png", tags: ["bottom", "image1"] },
                { url: "/images/white.webp", tags: ["bottom", "image2"] },
                { url: "/images/test1.webp", tags: ["bottom", "image3"] },
                { url: "/images/test2.webp", tags: ["bottom", "image4"] },
            ],
            scrollframes: [
                {
                    location: "Location 1",
                    bgLeft: true,
                    title: "Scroll Frame 1",
                    location: "Location 1",
                    bgLeft: true,
                    title: "Scroll Frame 1",
                    description: "Description for scroll frame 1",
                },
                {
                    location: "Location 2",
                    bgLeft: false,
                    title: "Scroll Frame 2",
                    description: "Description for scroll frame 2",
                },
                {
                    location: "Location 3",
                    bgLeft: false,
                    title: "Scroll Frame 3",
                    description: "Description for scroll frame 3",
                },
                {
                    location: "Location 4",
                    bgLeft: false,
                    title: "Scroll Frame 4",
                    description: "Description for scroll frame 4",
                },
            ],
            servicethumbnails: [
                { url: "/images/logo.png", tags: ["service", "thumbnail1"] },
                { url: "/images/white.webp", tags: ["service", "thumbnail2"] },
            ],
            featured: [
                { url: "/images/logo.png", tags: ["featured", "image1"] },
                { url: "/images/white.webp", tags: ["featured", "image2"] },
            ],
            testimonials: [
                {
                    title: "Testimonial 1",
                    content: "This is a great service!",
                    image: "/images/logo.png",
                },
                {
                    title: "Testimonial 2",
                    content: "I highly recommend it.",
                    image: "/images/white.webp",
                },
            ],
            galleryimages: [
                { url: "/images/logo.png", tags: ["gallery", "image1"] },
                { url: "/images/white.webp", tags: ["gallery", "image2"] },
                { url: "/images/test1.webp", tags: ["gallery", "image3"] },
                { url: "/images/test2.webp", tags: ["gallery", "image4"] },
                { url: "/images/test3.webp", tags: ["gallery", "image5"] },
                { url: "/images/test4.webp", tags: ["gallery", "image6"] },
            ],
            rightItems: [
                { url: "/#services", text: "Services" },
                { url: "/#recognition", text: "Recognition" },
                { url: "/#testimonials", text: "Testimonials" },
                { url: "/#contact", text: "Contact" },
            ],
        };
        return res.status(200).json({done: true, data: mockData});
    } else {
        try {
            const data = await getData();

            const homePageData = {
                logoMap: data.logoMap || {},
                topimages: data.topimages || [],
                bottomimages: data.bottomimages || [],
                scrollframes: data.scrollframes || [],
                servicethumbnails: data.servicethumbnails || [],
                featured: data.featured || [],
                testimonials: data.testimonials || [],
                galleryimages: data.galleryimages || [],
                rightItems: [{url: "/#services", text: "Services"}, {url: "/#recognition", text: "Recognition"}, {
                    url: "/#testimonials", text: "Testimonials"
                }, {url: "/#contact", text: "Contact"}],
            };
            res.status(200).json({done: true, data: homePageData});
        } catch (error) {
            res.status(500).json({done: false, error: error.message});
        }
    }
}
