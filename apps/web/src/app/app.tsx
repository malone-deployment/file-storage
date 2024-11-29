import React, { useState, useEffect } from 'react';
import axios from 'axios';
const BASE_URL =
  'https://file-storage-backend-service-422041495987.asia-southeast1.run.app';

function App() {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [uploadedFileId, setUploadedFileId] = useState<string | undefined>(
    undefined
  );
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [images, setImages] = useState<{ id: string; url: string }[]>([]);
  const [error, setError] = useState<Error | undefined>(undefined);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/images`) // backend
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching images: ', error);
      });
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!file) {
      setError(new Error('No file selected'));
      return;
    }

    const url = `${BASE_URL}/uploadFile`; // backend
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    axios
      .post(url, formData, config)
      .then((response) => {
        console.log(response.data);
        const fileId = response.data.id;
        setUploadedFileId(fileId);

        const imageUrl = `${BASE_URL}/image/${fileId}`; // backend
        setImageUrl(imageUrl);

        setImages([...images, { id: fileId, url: imageUrl }]);
      })
      .catch((error) => {
        console.error('Error uploading file: ', error);
        setError(error);
      });
  }

  function handleDeleteAll() {
    axios
      .delete(`${BASE_URL}/deleteAllImages`) // backend
      .then((response) => {
        console.log(response.data.message);

        setImages([]);
      })
      .catch((error) => {
        console.error('Error deleting all images: ', error);
        setError(error);
      });
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>React File Upload</h1>
        <input type="file" onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>

      {imageUrl && (
        <img
          src={imageUrl}
          style={{ width: 100, height: 100 }}
          alt="Uploaded content"
        />
      )}

      <div>
        <h2>All Uploaded Images</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {images.map((image) => (
            <img
              key={image.id}
              src={image.url}
              style={{ width: 100, height: 100, margin: 10 }}
              alt="Uploaded content"
            />
          ))}
        </div>
      </div>

      <button onClick={handleDeleteAll}>Delete All Images</button>

      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default App;
