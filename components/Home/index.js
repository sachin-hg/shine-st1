"use client";
import Carousel from '@/components/Carousel'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Reviews from '@/components/Reviews'
import Featured from '@/components/Featured'
import Gallery from '@/components/Gallery'
import About from '@/components/About'
import ScrollSeek from "@/components/ScrollSeek"
import {useOnScreen} from "@/utils/useOnScreen";
import {useRef, useState} from "react";
import CarouselImage from "@/components/Carouselmage";

let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.7
}

const tagParser = ([location, bgLeft, title, description] = []) => {
    return {title, bgLeft, description, location}
}

// Home Component:
// This component renders the main landing page of the website.
// It displays various sections like the header, carousel, about section,
// scroll-triggered content, featured items, gallery, testimonials, and footer.
//
// Props:
//   - preview: A boolean indicating whether the component is in preview mode.
//   - logoMap: An object containing logo image URLs.
//   - topimages: An array of images for the top carousel.
//   - bottomimages: An array of images for the bottom carousel.
//   - scrollframes: Data for scroll-triggered animations.
//   - servicethumbnails: Thumbnails for services offered.
//   - featured: Images for the featured section.
//   - testimonials: Customer testimonials.
//   - galleryimages: Images for the gallery section.
//   - rightItems: Navigation items for the header.
export default function Home({preview = false, logoMap, topimages, bottomimages, scrollframes, servicethumbnails, featured, testimonials, galleryimages, rightItems}) {
    const [active, setActive] = useState('')
    const refAbout = useRef(null)
    const featuredRef = useRef(null)
    const reviewsRef = useRef(null)
    const contactRef = useRef(null)

    // cb: A function that returns a function to set the active tab in the header.
    const cb = (key) => () => setActive(key)
    // useOnScreen: A custom hook that detects when an element is visible on the screen.
    // When each section (About, Recognition, Testimonials, Contact) becomes visible,
    // it updates the `active` state, which is used to highlight the corresponding tab in the header.
    useOnScreen(refAbout, options, cb('Services'))
    useOnScreen(featuredRef, options, cb('Recognition'))
    useOnScreen(reviewsRef, options, cb('Testimonials'))
    useOnScreen(contactRef, options, cb('Contact'))


    // The component's JSX structure.
    return (
        <>
            {/* Header with navigation and logo. */}
            <Header rightItems={rightItems} activeTab={active} logoMap={logoMap} />
            <Carousel id={'banner'} showControls showBullets>
                {...[
                    //         <video className="bg-video" preload="auto" autoPlay playsInline muted={true} loop
                    //                  src="https://www.kia.com/content/dam/kia2/in/en/our-vehicles/showroom/selto-teaser/seltos-xline/Desktop_1_new.mp4">
                    //     {/*</video>, ...types.map(id => <img alt={id} src={`http://fakeimg.pl/2000x800/0079D8/fff/?text=${id}}`} key={id} />)]}*/}
                    // </video>,
                    ...topimages.map(x => {
                        return <CarouselImage key={x.url} data={x} tagParser={tagParser} />
                        // return <div className={styles.test} style={{
                        //     '--background': `url('${x.url}')`
                        // }}  key={x.url} />
                    })]}
            </Carousel>

            {/* About section. */}
            <div id='Services' ref={refAbout}>
                <About servicethumbnails={servicethumbnails} />
            </div>

            {/* Scroll-triggered animation section. */}
            <ScrollSeek scrollframes={scrollframes} />

            {/* Featured items section. */}
            <div id='Recognition' ref={featuredRef}><Featured featuredImages={featured} /></div>

            {/* Gallery section. */}
            <Gallery preview={preview} images={galleryimages} />

            {/* Testimonials section. */}
            <div id='Testimonials' ref={reviewsRef}><Reviews testimonials={testimonials} /></div>

            {/* Bottom carousel section. */}
            <Carousel id={'banner'} showControls>
                {...[
                    ...bottomimages.map(x => {
                        return <CarouselImage key={x.url} firstFold={false} data={x} tagParser={tagParser} />
                    })]}
            </Carousel>

            {/* Contact/Footer section. */}
            <div id='Contact' ref={contactRef}><Footer /></div>
        </>
    )
}

