import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import Dropzone from "react-dropzone";

import { api } from './services/axios';
import "./styles.css";

function App() {
  const [files, setFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);

  const handleDrop = acceptedFiles => {
    setFileNames(acceptedFiles.map(file => file.name));
    setFiles(acceptedFiles);
  }

  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    console.log(data);
    console.log(files);
    let bodyFormData = new FormData();

    files.map(file => bodyFormData.append('file', file));
    
    bodyFormData.append('name', data.name)
    bodyFormData.append('email', data.email)

    api.post('upload', bodyFormData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <input type='file' {...register('file')} /> */}
      <Dropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p>Drag'n'drop files, or click to select files</p>
          </div>
          )}
      </Dropzone>
      <div>
          <strong>Files:</strong>
          <ul>
          {fileNames.map(fileName => (
              <li key={fileName}>{fileName}</li>
          ))}
          </ul>
      </div>
      <br />
      
      <input {...register('name')} />
      <br />

      <input {...register('email')} />
      <br />

      <input type='submit' />
    </form>
  );
}

export default App;
