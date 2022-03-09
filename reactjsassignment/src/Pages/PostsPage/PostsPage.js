import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

            setSortByTitle('DSC');
            return;
        }
        if (sortByTitle === 'DSC') {
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
        if (sortByTitle === 'DSC') return TitleFilter.sort((post1, post2) => {
            if (post1.title.toLowerCase() > post2.title.toLowerCase()) return -1;
            if (post1.title.toLowerCase() < post2.title.toLowerCase()) return 1;
            return 0;
        });
    };

    const listSorted = GetPostSorted();
    const [deleteItem,setDeleteItem]= useState([]);
    const handleRemoveItem = (e)=> {
        const id = e.target.getAttribute("id")
       setDeleteItem( listSorted.filter(item => item.id !== id));
        console.log('del:',deleteItem);
    };
    return (
        <div>
            <input
                value={searchTitle}
                placeholder="Search by post title"
                onChange={(evt) => setSearchTitle(evt.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th onClick={HandleSortByTitle}>Title--Sort {sortByTitle} </th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listSorted.map(postz => (
                        <tr>
                            <td>{postz.id}</td>
                            <td>{postz.title}</td>
                            <td>
                               <Link to={`/Posts/${postz.id}`}>Detail</Link>
                                <Link onClick={handleRemoveItem} name={postz.id} to="/posts">Remove</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};
export default PostsPage;