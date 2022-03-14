import axios from "axios";
import React, { useEffect, useState } from "react";
const SendAPIRequest = (initialState, url, responseData) => {
    const [data, setData] = useState(initialState)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    useEffect(() => {
        setIsLoading(true)
        let didCancel = false
        axios({
            method: 'GET',
            url: url
        }).then(response => {
            if (!didCancel) {
                setData(responseData(response))
                setIsLoading(false)
            }
        }).catch(() => {
            if (!didCancel) {
                setIsLoading(true)
                setError("Something went wrong")
            }
        })
        return () => {
            console.log('clean effect')
            didCancel = true
        }
    }, [])
    return {
        data,
        isLoading,
        error
    }
}
export default SendAPIRequest;