function AlbumResults({ results }) {
  return (
    <div className="albumsContainer">
      {results.map((album) => (
        <div key={album.id}>{album.name}</div>
      ))}
    </div>
  );
}

export default AlbumResults;