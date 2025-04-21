function PreviewImages({ images, tags }) {
  return (
    <div>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image.url} alt={`Preview Image ${index}`} />
        </div>
      ))}
    </div>
  );
}

export default PreviewImages;