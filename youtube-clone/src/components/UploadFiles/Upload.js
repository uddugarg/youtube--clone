import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import UploadVideo from './UploadVideo';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './Upload.css';

function Upload(props) {

    const user = useSelector(state => state.user);


    const [title, setTitle] = useState('');
    const [descp, setDescp] = useState('');
    const [privacy, setPrivacy] = useState(0);
    const [categories, setCategories] = useState('Film & Animation');
    const [thumbnail, setThumbnail] = useState('');
    const [duration, setDuration] = useState('');
    const [filePath, setFilePath] = useState('');


    const Private = [
        {
            value: 0,
            label: 'Private'
        },
        {
            value: 1,
            label: 'Public'
        }
    ];

    const Categories = [
        {
            value: 'Film & Animation',
            label: 'Film & Animation'
        },
        {
            value: 'Auto & Vehicles',
            label: 'Auto & Vehicles'
        },
        {
            value: 'Music',
            label: 'Music'
        },
        {
            value: 'Pets & Animals',
            label: 'Pets & Animals'
        },
        {
            value: 'Sports',
            label: 'Sports'
        },
    ];


    const handleSubmit = (e) => {
        e.preventDefault();

        if (user.userData && !user.userData.isAuth) {
            return alert('Please Login first');
        }

        if (filePath === '' || duration === '' || thumbnail === '' || title === '' || descp === '' || privacy === '' || categories === '') {
            return alert('Fields are empty');
        }

        const variable = {
            writer: user.userData._id,
            title: title,
            description: descp,
            privacy: privacy,
            filePath: filePath,
            category: categories,
            duration: duration,
            thumbnail: thumbnail
        }

        axios.post('/api/video/uploadVideo', variable)
            .then(response => {
                if (response.data.success) {
                    alert('Video Uploaded Successfully');
                    props.history.push('/');
                } else {
                    alert('Failed to upload video');
                }
            })
    }


    return (
        <div className='upload'>
            <h2>Upload Video</h2>
            <center>
                <form onSubmit={handleSubmit} className='upload__form'>
                    <UploadVideo
                        thumbnail={thumbnail}
                        setThumbnail={setThumbnail}
                        duration={duration}
                        setDuration={setDuration}
                        filePath={filePath}
                        setFilePath={setFilePath}
                    />

                    <TextField className='upload__details' label='Title' type='text' variant='filled' value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <TextField className='upload__descp' label='Description' type='text' variant='filled' value={descp} onChange={(e) => setDescp(e.target.value)} required />

                    <FormControl className='upload__select'>
                        <InputLabel id="demo-simple-select-filled-label">Set Privacy</InputLabel>
                        <Select labelId="demo-simple-select-filled-label" id="demo-simple-select-filled" onChange={(e) => setPrivacy(e.target.value)} required>
                            {Private.map((item, index) => (
                                <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <br />

                    <FormControl className='upload__select'>
                        <InputLabel id="demo-simple-select-filled-label">Select Category</InputLabel>
                        <Select labelId="demo-simple-select-filled-label" id="demo-simple-select-filled" onChange={(e) => setCategories(e.target.value)} required>
                            {Categories.map((item, index) => (
                                <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <br />

                    <Button className='upload__btn' variant='contained' type='submit' onClick={handleSubmit}>Upload</Button>
                </form>
            </center>
        </div>
    )
}

export default Upload;
