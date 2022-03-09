import { buildTimeValue } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";

const PostPage = ()=> {
    const [post,setPost] = useState({
        id:null,
        title:null,
        body:null
    });
const readParams = useParams(()=>{
    return readParams.id;
});
    useEffect(()=>{
        axios({
            method: 'GET',
            url: `https://jsonplaceholder.typicode.com/posts/${readParams.id}`,
        }).then(response=>{
            setPost({
                id: response.data.id,
                title:response.data.title,
                body:response.data.body
            })
        })
    },[]);
    return(
        <div>
            <p>Id: {post.id}</p>
            <p>Title: {post.title}</p>
            <p>Body: {post.body}</p>
        </div>
    )
};
export default PostPage;