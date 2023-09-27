import React from 'react'
import reactIcon from "../assets/usecase.png";
import { Button } from 'react-bootstrap';

const Post = () => {
  return (
    <div>
        <img src={reactIcon} />
        <div>
            <p>abc</p>
            <p>def</p>
            <p>abc</p>
            <p>def</p>
            ...
            <Button className='text-danger'>Đóng góp</Button>
        </div>
    </div>
  )
}

export default Post