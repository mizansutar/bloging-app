// src/components/Comments.js
import React, { useState, useContext, useEffect } from 'react';
import { Box, Button, Stack, Avatar, Typography, TextField, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { DataContext } from '../../../context/dataProvider';
import { API } from '../../../service/api';

const Comments = ({ post }) => {
  const initialComment = {
    name: '',
    postId: '',
    comments: '',
    date: new Date(),
  };

  const [comment, setComment] = useState({ ...initialComment, name: '', postId: post._id });
  const [comments, setComments] = useState([]);
  const { account } = useContext(DataContext);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await API.getAllComments(post._id);
      if (response.isSuccess) {
        setComments(response.data);
      }
    };

    fetchComments();
  }, [post._id]);

  const handleChange = (e) => {
    setComment((prevComment) => ({
      ...prevComment,
      name: account.username,
      postId: post._id,
      comments: e.target.value,
      date: new Date(),
    }));
  };

  const addComment = async () => {
    if (!comment.comments.trim()) {
      // Prevent posting empty comments
      return;
    }
    const response = await API.newComment(post._id, comment);
    if (response.isSuccess) {
      setComment((prevComment) => ({
        ...prevComment,
        comments: '',
        postId: post._id,
        date: new Date(),
      }));
      setComments((prevComments) => [...prevComments, response.data]);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: '600px',
        margin: 'auto',
        padding: 3,
        backgroundColor: '#fff',
        borderRadius: 3,
        boxShadow: 4,
      }}
    >
      {/* Comment Input Section */}
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Avatar sx={{ bgcolor: '#1976d2' }}>
          {account.username.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="h6" fontWeight="bold">
          {account.username}
        </Typography>
      </Stack>

      <TextField
        label="Write your comment..."
        multiline
        minRows={3}
        variant="outlined"
        fullWidth
        value={comment.comments}
        onChange={handleChange}
        sx={{
          backgroundColor: '#f5f5f5',
          borderRadius: 2,
        }}
      />

      <Button
        variant="contained"
        color="primary"
        endIcon={<SendIcon />}
        fullWidth
        onClick={addComment}
        sx={{ mt: 2, borderRadius: 2 }}
      >
        Post Comment
      </Button>

      {/* Render Comments Section */}
      <Box sx={{ mt: 4 }}>
        {comments.length === 0 ? (
          <Typography variant="body2" color="text.secondary" align="center">
            No comments yet. Be the first to comment!
          </Typography>
        ) : (
          comments.map((cmt, index) => (
            <Paper
              key={cmt._id}
              sx={{
                p: 2,
                mb: 2,
                borderRadius: 2,
                boxShadow: 2,
                backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#f1f1f1',
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: '#1976d2' }}>
                  {cmt.name?.charAt(0).toUpperCase() ?? '?'}
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {cmt.name}
                  </Typography>
                  <Typography variant="body2">{cmt.comments}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(cmt.date).toLocaleString()}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          ))
        )}
      </Box>
    </Box>
  );
};

export default Comments;
