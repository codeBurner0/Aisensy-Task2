import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
const FileUpload = () => {
  const navigate = useNavigate()
  const onDrop = useCallback(async (acceptedFiles) => {
    
    const file = acceptedFiles[0];

    if (file) {
      // Validate file format (CSV or Excel)
      if (file.type === 'text/csv' || file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        // File is in valid format, send it to the server
        const formData = new FormData();
        formData.append('file', file);
        console.log(formData)
       
        try {
          if(file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')   {
            const response = await axios.post('http://localhost:5000/v1/contactsxlsx', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          }else{                                                                                                  
          const response = await axios.post('http://localhost:5000/v1/contacts', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log('File uploaded successfully:', response.data.msg);
          navigate(0)
        }
          
          
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      } else {
        console.error('Invalid file format. Please upload a CSV or Excel file.');
      }
    }
  }, []);

    

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: '.csv, .xls, .xlsx' });

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        <p>Drag & drop a CSV or Excel file here, or click to select one</p>
      </div>
      
    </div>
  );
};

const dropzoneStyle = {
  border: '2px dashed #eeeeee',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default FileUpload;
