import React, { useState, useEffect, useRef } from 'react';
import { Paper, Typography, TextField, Button, Container, Grid, Box, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
// Ensure these functions are correctly implemented
import { getComments, postComment } from '../api';

const ChatBox = ({ projectId, userRole, proj_title }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [attachmentPreview, setAttachmentPreview] = useState(null);
  const chatContainerRef = useRef();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await getComments(projectId);
        commentsData.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        setComments(commentsData);
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [projectId]);

  const handlePostComment = async () => {
    const newCommentData = {
      // Mock structure of a new comment, adjust based on your actual comment structure
      proj_id: projectId,
      proj_title: proj_title,
      content: {
        text: newComment,
        media: attachment ? [attachment] : [],
      },
      sender: userRole,
      user_id: 'userId', // Replace with actual user ID
      // created_at: new Date().toISOString(), // Add created_at if needed
    };
  
    // Optimistically update the UI
    setComments([...comments, newCommentData].sort((a, b) => new Date(a.created_at) - new Date(b.created_at)));
  
    try {
      const newCommentObj = await postComment(newCommentData);
      // Optionally, update the comment with data from server
      // setComments(currentComments => currentComments.map(comment => comment.id === newCommentObj.id ? newCommentObj : comment));
    } catch (error) {
      console.error('Error posting comment:', error);
      // Optionally, revert the optimistic update here
      // setComments(currentComments => currentComments.filter(comment => comment.id !== newCommentData.id));
    }
  
    setNewComment('');
    setAttachment(null);
    setAttachmentPreview(null);
  };
  
  const handleUploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 's7cf8bgq');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dhcc6kt1u/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading file to Cloudinary:', error);
    }
  };

  const handleAttachmentChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const uploadedUrl = await handleUploadToCloudinary(file);
      setAttachment(uploadedUrl);
      setAttachmentPreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  const handleRemoveAttachment = () => {
    setAttachment(null);
    setAttachmentPreview(null);
    URL.revokeObjectURL(attachmentPreview); // Clean up
  };

  return (
    <Container component="main" maxWidth="lg">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 2, height: 400, overflowY: 'auto' }} ref={chatContainerRef}>
        <Typography variant="h5" align="center" gutterBottom>
          Property Updates
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          {comments.map((comment, index) => (
             comment && (<Box key={index} display="flex" justifyContent={comment.sender === userRole ? 'flex-end' : 'flex-start'}>
              <Box
                bgcolor={comment.sender === userRole ? 'primary.main' : 'background.paper'}
                color={comment.sender === userRole ? 'white' : 'black'}
                p={2}
                borderRadius={2}
                display="flex"
                flexDirection="column"
                alignItems={comment.sender === userRole ? 'flex-end' : 'flex-start'}
              >
                {comment.content.media && comment.content.media.map((mediaUrl, idx) => (
                  <img key={idx} src={mediaUrl} alt="Attachment" style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '8px', margin: '8px 0' }} />
                ))}
                <Typography variant="body1">{comment.content.text}</Typography>
              </Box>
            </Box>)
          ))}
        </Box>

        {/* Image Preview and Remove Button */}
        {attachmentPreview && (
          <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ marginTop: 2 }}>
            <img src={attachmentPreview} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />
            <IconButton onClick={handleRemoveAttachment}>
              <CloseIcon />
            </IconButton>
          </Box>
        )}

        <Grid container spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
          <Grid item xs={9}>
            <TextField
              fullWidth
              label="Your Comment"
              variant="outlined"
              multiline
              rows={2}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id="attachment"
              onChange={handleAttachmentChange}
            />
            <label htmlFor="attachment">
              <Button variant="contained" component="span">
                Attach
              </Button>
            </label>
          </Grid>
          <Grid item xs={1}>
            <Button variant="contained" color="primary" endIcon={<SendIcon />} onClick={handlePostComment}>
              Send
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ChatBox;
