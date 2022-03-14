
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SendAPIRequest from "../../CustomHook/SendAPIRequest"
const responseData = response => ({
    id: response.data.id,
    title: response.data.title,
    body: response.data.body
})
const initialState = {
    id: null,
    title: null,
    body: null
}
const PostPage = () => {
    const readParams = useParams(() => {
        return readParams.id;
    });

    const {data:post, isLoading, error} = SendAPIRequest(initialState, `https://jsonplaceholder.typicode.com/posts/${readParams.id}`, responseData)
    return (
        <div>
            <p>Id: {post.id}</p>
            <p>Title: {post.title}</p>
            <p>Body: {post.body}</p>
        </div>
    )
};
export default PostPage;