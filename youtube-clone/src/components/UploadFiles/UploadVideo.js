import React, { useState } from 'react'
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import './Upload.css';

function UploadVideo({ thumbnail, setThumbnail, duration, setDuration, filePath, setFilePath }) {

    const [fileName, setFileName] = useState('');


    const handleDrop = (files) => {
        let formData = new FormData();

        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        console.log(files);
        formData.append('file', files[0]);

        axios.post('/api/video/upload', formData, config)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
                    setFilePath(response.data.filePath);
                    setFileName(response.data.fileName);
                    let variable = {
                        filePath: response.data.filePath,
                    }

                    axios.post('/api/video/thumbnail', variable)
                        .then(response => {
                            if (response.data.success) {
                                setThumbnail(response.data.thumbsFilePath)
                                setDuration(response.data.thumbsFileDuration)
                            }
                        })

                } else {
                    alert('Failed to save the video in server!');
                }
            })
    }

    return (
        <div className='upload__arena'>
            <div className='upload__area'>
                <Dropzone onDrop={handleDrop}
                    multiple={false}
                    maxSize={80000000000}
                    >
                    {({ getRootProps, getInputProps }) => (
                        <div className="container">
                            <div
                                {...getRootProps({
                                    className: 'dropzone',
                                    onDrop: event => event.stopPropagation()
                                })}
                            >
                                <input name='file' {...getInputProps()} />
                                <AddIcon className='upload__areaBtn' />
                            </div>
                        </div>
                    )}
                </Dropzone>

            </div>
            {thumbnail !== "" &&
                <div className='upload__thumbnail'>
                    <img src={`http://localhost:5000/${thumbnail}`} alt='thumbs' />
                </div>
            }
        </div>
    )
}

export default UploadVideo
