import { Box, Typography } from "@mui/material";
import ellipses from "../../utils/utils.js";

const PostD = ({ postData }) => {
    return (
        <Box
            sx={{
                display: 'inline-block', // Allows elements to sit next to each other
                width: 280, // Fixed width for each post
                border: '1px solid black',
                borderRadius: 2,
                boxShadow: 3,
                overflow: 'hidden',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.02)',
                },
                margin: 1, // Adds space between posts
            }}
        >
            <Box
                component="img"
                sx={{ height: 180, width: '100%' }}
                src={postData.piture || "https://via.placeholder.com/350"}
                alt="blog"
            />
            <Box sx={{ padding: 2 }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        color: '#333',
                    }}
                >
                    {ellipses(postData.title, 15)}
                </Typography>
                <Typography variant="subtitle2" color="primary">
                    {postData.categcategeries}
                </Typography>
                <Typography variant="subtitle2" color="secondary">
                    By {postData.username}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        fontSize: '0.875rem',
                        color: '#666',
                        wordBreak: "break-word",
                    }}
                >
                    {ellipses(postData.description, 30)}
                </Typography>
            </Box>
        </Box>
    );
};

export default PostD;
