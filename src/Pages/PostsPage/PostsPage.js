import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './PostPage.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
const PostsPage = () => {
    const [posts, setPosts] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [sortByTitle, setSortByTitle] = useState("(NONE)");
    let cancel = false;
    useEffect(() => {
        axios({
            method: 'GET',
            url: `https://jsonplaceholder.typicode.com/posts`,
        })
            .then(response => {
                if (!cancel) {
                    setPosts(response.data);
                }
            })
            .catch(() => {
                if (!cancel) {
                    return 'Something went wrong';
                }
            })
        return () => {
            cancel = true;
        }
    }, []);
    const TitleFilter = posts.filter(post => post.title.toLowerCase().includes(searchTitle.toLowerCase()));
    const HandleSortByTitle = () => {
        if (sortByTitle === "(NONE)") {
            setSortByTitle('ASC');
            return;
        }
        if (sortByTitle === 'ASC') {

            setSortByTitle('DESC');
            return;
        }
        if (sortByTitle === 'DESC') {
            setSortByTitle("(NONE)");
            return;
        }
    }
    const GetPostSorted = () => {
        if (sortByTitle === "(NONE)") return TitleFilter;
        if (sortByTitle === 'ASC') return TitleFilter.sort((post1, post2) => {
            if (post1.title.toLowerCase() < post2.title.toLowerCase()) return -1;
            if (post1.title.toLowerCase() > post2.title.toLowerCase()) return 1;
            return 0;

        });
        if (sortByTitle === 'DESC') return TitleFilter.sort((post1, post2) => {
            if (post1.title.toLowerCase() > post2.title.toLowerCase()) return -1;
            if (post1.title.toLowerCase() < post2.title.toLowerCase()) return 1;
            return 0;
        });
    };

    const listSorted = GetPostSorted();
  
    const handleRemoveItem = (e) => {
    const id  = e.target.getAttribute("name")
    setPosts(posts.filter(m=>m.id !=id))
    console.log(listSorted)
}

    return (
        <div>
            <Box>
            <TextField
          type="search"
          variant="standard"
          placeholder="Search by post title"
          onChange={(evt) => setSearchTitle(evt.target.value)}
        />
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell onClick={HandleSortByTitle} align="left">Title -- Sort {sortByTitle} </TableCell>
                            <TableCell align="left">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listSorted.map((post) => (
                            <TableRow
                                key={post.id}
                            >
                                <TableCell component="th" scope="row">{post.id}</TableCell>
                                <TableCell align="left">{post.title}</TableCell>
                                <TableCell align="left">
                                    <Link className="link-button" style={{backgroundColor: '#6633FF'}} to={`/Posts/${post.id}`}>Detail</Link>
                                    <Link className="link-button" name={post.id} onClick={handleRemoveItem} style={{backgroundColor: '#FF0000'}}to={'/Posts'}>Remove</Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
};
export default PostsPage;