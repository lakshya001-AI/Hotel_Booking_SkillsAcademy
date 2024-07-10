import React, { useState } from 'react';

const PhotoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please upload a file.');
      return;
    }

    // You can handle the file upload here, for example, by sending it to a server
    console.log('File submitted:', selectedFile);
  };

  return (
    <div>
      <h2>Upload a Photo</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {preview && (
          <div>
            <h3>Preview:</h3>
            <img src={preview} alt="Preview" style={{ width: '300px', height: '200px' }} />
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PhotoUpload;
