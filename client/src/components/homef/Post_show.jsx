import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { API } from "../../service/api";
import PostD from "./postD";
import { useSearchParams,Link } from "react-router-dom";

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [searchParams] = useSearchParams();
    const [category, setCategory] = useState(searchParams.get('category') || '');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.getAllPosts({ category });
                if (response.isSuccess) {
                    setPosts(response.data);
                } else {
                    console.error('Error fetching posts:', response.message);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchData();
    }, [category]);

    useEffect(() => {
        const currentCategory = searchParams.get('category') || '';
        if (currentCategory !== category) {
            setCategory(currentCategory);
        }
    }, [searchParams, category]);

    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 2,
            padding: 2,
        }}>
            {posts.length > 0 ? posts.map(post => (
            <Link to={`details/${post._id}`}>
            <PostD key={post.id} postData={post} />
            </Link>
            )) : <div>No posts available</div>}
        </Box>
    );
};

export default Post;
