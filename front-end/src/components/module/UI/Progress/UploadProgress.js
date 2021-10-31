import React, { useState } from 'react';
import Axios from 'axios';
import { Progress } from 'reactstrap';

export default function UploadProgress() {
  //progress upload
  //reference: https://stackoverflow.com/questions/35288625/tracking-progress-of-file-upload-in-multer-nodejs
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [showProgressBar, setProgressBarVisibility] = useState(false);

  const [uploadedLink, setUploadedLink] = useState();

  //demo get file from storage
  const [linkImage, setLinkImage] = useState();
  const [linkVideo, setLinkVideo] = useState();
  const [linkFile, setLinkFile] = useState();

  const handleUploadFile = async (e) => {
    e.preventDefault();
    setProgressBarVisibility(true);
    const demo = document.getElementById('demo');
    const bodyFormData = new FormData(demo);
    const result = await Axios({
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      method: 'POST',
      data: bodyFormData,
      url: '/test/upload', // route name
      baseURL: 'http://localhost:5000', //local url
      onUploadProgress: (progress) => {
        const { total, loaded } = progress;
        const totalSizeInMB = total / 1000000;
        const loadedSizeInMB = loaded / 1000000;
        const uploadPercentage = (loadedSizeInMB / totalSizeInMB) * 100;
        setUploadPercentage(uploadPercentage.toFixed(2));
        console.log('total size in MB ==> ', totalSizeInMB);
        console.log('uploaded size in MB ==> ', loadedSizeInMB);
      },
      encType: 'multipart/form-data',
    });
    console.log('result', result)

    if (result.status !== 200) {
      setUploadedLink('Fail to upload file!');
    } else {
      setUploadedLink('http://localhost:5000/files/' + result.data.Key);
    }
  };

  const handleFormClick = () => {
    setProgressBarVisibility(false);
    setUploadPercentage(0);
    setUploadedLink('');
  };

  const handleGetFile = async () => {
    window.open(linkFile, '_blank');
  };

  //jsx
  const processBar = (
    <>
      <div className="text-center">
        {parseInt(uploadPercentage) !== 100
          ? `Upload percentage - ${uploadPercentage}`
          : 'File successfully uploaded'}
      </div>
      <Progress
        animated={parseInt(uploadPercentage) !== 100}
        color="success"
        value={uploadPercentage}
      />
    </>
  );

  return (
    <div style={{ width: '50%', margin: '0 auto' }}>
      <form
        onClick={handleFormClick}
        onSubmit={(e) => handleUploadFile(e)}
        id="demo"
      >
        <input type="file" name="upload-file" id="avatar" />
        <input type="submit" value="Submit" />
      </form>
      {showProgressBar && processBar}
      <p>Uploaded link: {uploadedLink}</p>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          onChange={(e) => setLinkImage(e.target.value)}
          value={linkImage}
          placeholder="Image URL..."
        ></input>

        <img src={linkImage} alt="Demo get img" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          onChange={(e) => setLinkVideo(e.target.value)}
          value={linkVideo}
          placeholder="Video URL..."
        ></input>

        <video src={linkVideo} alt="Demo get video" controls />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          onChange={(e) => setLinkFile(e.target.value)}
          value={linkFile}
          placeholder="File URL..."
        ></input>
        <button onClick={handleGetFile}>Get File</button>
      </div>
    </div>
  );
}
