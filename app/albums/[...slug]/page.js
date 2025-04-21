import AlbumPageContainer from "@/components/AlbumPageContainer";

export default function AlbumPage({ params }) {
  const { slug } = params;  
  const albumId = String(slug[slug.length - 1]);

  return (
    <div>
      {/* <h1>Album Page</h1> */}
      <p>Album ID: {albumId}</p>
      <AlbumPageContainer albumId={albumId}/>
    </div>
  );
}

export async function generateStaticParams() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-files`);

        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data')
        }

        const files = await res.json()
        const staticParams = files.map(file => {
            const seoText = generateSeoText(); // Generate random SEO text
            return {
                slug: [...seoText, 'album', String(file.pin)],
            };
        })
        return staticParams
    } catch (e) {
        console.log(e)
        return []
    }
}

function generateSeoText() {
  const options = [['wedding'], ['engagement'], ['pre-wedding'], ['wedding', 'photography'], ['wedding', 'cinematography'], ['best', 'wedding']];
  return options[Math.floor(Math.random() * options.length)];
}