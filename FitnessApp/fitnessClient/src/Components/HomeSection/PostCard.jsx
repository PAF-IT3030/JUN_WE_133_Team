import React, { useState, useEffect } from "react";
import RepeatIcon from "@mui/icons-material/Repeat";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import BarChartIcon from "@mui/icons-material/BarChart";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const PostCard = ({ post, onEdit }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isPostVisible, setIsPostVisible] = useState(true); // State to manage post visibility
  const [showComments, setShowComments] = useState(false); // State to manage comments visibility
  const [comments, setComments] = useState([]); // State to store comments
  const [text, setText] = useState(""); // State to store comment text
  const [loadingComments, setLoadingComments] = useState(false); // State to manage loading state of comments
  const [editingCommentId, setEditingCommentId] = useState(null); // State to track which comment is being edited
  const [likeState, setLikeState] = useState(0); // State to manage like state, 0 means not liked, 1 means liked

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePost = async () => {
    try {
      // Send a DELETE request to your backend
      const response = await fetch(
        `http://localhost:8081/api/v1/post/${post.id}`,
        {
          method: "DELETE",
        }
      );

      // Check if the request was successful
      if (response.ok) {
        console.log("Post deleted successfully!");
        setIsPostVisible(false); // Hide the post from view
      } else {
        console.error("Failed to delete post:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }

    handleClose();
  };

  const handleEdit = () => {
    onEdit(post);
    handleClose(); // Close the menu after clicking Edit
  };

  const handleOpenReplyModel = () => {
    console.log("open model");
  };

  const handleCreateRePost = () => {
    console.log("handle create re post");
  };

  const handleComments = async () => {
    if (showComments) {
      setShowComments(false);
    } else {
      try {
        setLoadingComments(true);
        const response = await fetch(
          `http://localhost:8081/api/v1/comment/${post.id}`
        );
        if (response.ok) {
          const data = await response.json();
          setComments(data);
          setShowComments(true);
        } else {
          console.error("Failed to fetch comments:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoadingComments(false);
      }
    }
    console.log("handle comments on post", showComments, post.id);
  };

  const handleLikePost = () => {
    setLikeState((prevState) => (prevState === 0 ? 1 : 0));
  };

  if (!isPostVisible) {
    return null;
  }

  const imageUrlsArray = post.imageUrls
    ? post.imageUrls.match(/https?:\/\/[^\s\]]+/g)
    : [];

  // Initialize variables for first three URLs
  let firstUrl = null;
  let secondUrl = null;
  let thirdUrl = null;

  // Extract the first three URLs
  if (imageUrlsArray) {
    for (let i = 0; i < imageUrlsArray.length; i++) {
      let url = imageUrlsArray[i];
      // Remove trailing comma if it exists
      url = url.replace(/,+$/, "");

      // Assign URLs to respective variables
      if (i === 0) {
        firstUrl = url;
      } else if (i === 1) {
        secondUrl = url;
      } else if (i === 2) {
        thirdUrl = url;
        break; // Stop loop after assigning third URL
      }
    }
  }

  const addComment = async (event) => {
    event.preventDefault();

    try {
      const postData = {
        postId: post.id,
        text: text,
      };

      const response = await fetch("http://localhost:8081/api/v1/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        console.log("comment submitted successfully!");
        // Update comments state immediately after successful submission
        const newComment = await response.json();
        setComments([...comments, newComment]);
        setText("");
        setEditingCommentId(null); // Reset editingCommentId when adding new comment
      } else {
        console.error("Failed to submit comment:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      // Send a DELETE request to your backend
      const response = await fetch(
        `http://localhost:8081/api/v1/comment/${post.id}/${commentId}`,
        {
          method: "DELETE",
        }
      );

      // Check if the request was successful
      if (response.ok) {
        console.log("Comment deleted successfully!");
        // Remove the deleted comment from the comments state
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
      } else {
        console.error("Failed to delete comment:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEditComment = async (commentId, newText) => {
    try {
      const postData = {
        text: newText,
      };

      const response = await fetch(
        `http://localhost:8081/api/v1/comment/${post.id}/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      if (response.ok) {
        console.log("Comment edited successfully!");
        // Update the comment text in the comments state
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId ? { ...comment, text: newText } : comment
          )
        );
      } else {
        console.error("Failed to edit comment:", response.statusText);
      }
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const saveEditedComment = async (commentId, newText) => {
    await handleEditComment(commentId, newText);
    setEditingCommentId(null); // Exit edit mode
  };

  const cancelEditComment = () => {
    setEditingCommentId(null); // Exit edit mode
  };

  const startEditComment = (commentId) => {
    const commentToEdit = comments.find((comment) => comment.id === commentId);
    setText(commentToEdit.text); // Set the text to edit
    setEditingCommentId(commentId); // Enter edit mode
  };

  console.log("comments>>>>>>>", comments);

  return (
    <div>
      <div className="flex space-x-5">
        <Avatar
          className="cursor-pointer"
          alt="username"
          src=""
          onClick={() => navigate(`/profiles/${6}`)}
        />
        <div className="w-full">
          <div className="flex justify-between items-center">
            <div className="flex cursor-pointer items-center space-x-2">
              <span className="font-semibold">Bruce</span>
              <span className="text-gray-600">@bruce . 2m</span>
            </div>

            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreHorizIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{ "aria-labelledby": "basic-button" }}
              >
                <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
              </Menu>
            </div>
          </div>

          <div className="mt-2">
            <div className="cursor-pointer">
              <p className="post_title">{post.title}</p>
              <img
                className="w-[28rem] border border-grey-400 p-5 rounded-md"
                src={firstUrl}
                alt={post.title}
              />

              {secondUrl && (
                <img
                  className="w-[28rem] border border-grey-400 p-5 rounded-md"
                  src={secondUrl}
                  alt={post.title}
                />
              )}

              {thirdUrl && (
                <img
                  className="w-[28rem] border border-grey-400 p-5 rounded-md"
                  src={thirdUrl}
                  alt={post.title}
                />
              )}

              <p className="post_caption">{post.caption}</p>
            </div>

            <div className="py-5 flex flex-wrap justify-between items-center">
              <div className={`space-x-3 flex items-center text-gray-600`}>
                <ChatBubbleOutlineIcon
                  className="cursor-pointer"
                  onClick={handleComments}
                />
                <p>{comments.length}</p>
              </div>

              <div
                className={`${
                  true ? "text-pink-600" : "text-grey-600"
                } space-x-3 flex items-center`}
              >
                <RepeatIcon
                  className="cursor-pointer"
                  onClick={handleCreateRePost}
                />
                <p>54</p>
              </div>

              <div
                className={`${
                  true ? "text-pink-600" : "text-grey-600"
                } space-x-3 flex items-center`}
              >
                {likeState === 1 ? (
                  <FavoriteIcon
                    className="cursor-pointer"
                    onClick={handleLikePost}
                  />
                ) : (
                  <FavoriteBorderIcon
                    className="cursor-pointer"
                    onClick={handleLikePost}
                  />
                )}

                <p>{likeState}</p>
              </div>

              <div className="space-x-3 flex items-center text-gray-600">
                <BarChartIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModel}
                />
                <p>430</p>
              </div>

              <div className="space-x-3 flex items-center text-gray-600">
                <FileUploadIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModel}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="comment_class">
      {showComments && (
        <div className="comments-box">
          <h3>Comments</h3>
          <input
            type="text"
            name="text"
            placeholder="Add a Comment"
            // value={text}
            onChange={handleTextChange}
            onFocus={() => setEditingCommentId(null)} // Reset editingCommentId when input is focused
            style={{
              border: "2px solid #1e88e5",
              borderRadius: "5px",
              padding: "10px",
              fontSize: "1rem",
              width: "100%",
            }}
          />
          <Button onClick={addComment}>Add Comment</Button>

          <div className="comment_box">
            <ul style={{ listStyle: "none", padding: 0 }}>
              {comments.map((comment) => (
                <li
                  key={comment.id}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Avatar alt="username" src="" />
                  <div style={{ flex: 1 }}>
                    {editingCommentId === comment.id ? (
                      // Edit mode
                      <div>
                        <input
                          type="text"
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                        /> &nbsp;&nbsp; &nbsp;
                        <Button variant="primary" style={{backgroundColor: "#1e88e5"}}
                          onClick={() => saveEditedComment(comment.id, text)}
                        >
                          Save
                        </Button> &nbsp;&nbsp;
                        <Button onClick={cancelEditComment}>Cancel</Button>
                      </div>
                    ) : (
                      // View mode
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span
                          className="comment_text"
                          style={{ marginRight: "10px" }}
                        >
                          {comment.text}
                        </span>
                        <div>
                          <span style={{ marginRight: "10px" }}>
                            <EditIcon
                              className="cursor-pointer edit_icon"
                              fontSize="small"
                              onClick={() => startEditComment(comment.id)}
                            />
                          </span>
                          <span>
                            <DeleteIcon
                              className="cursor-pointer delete_icon"
                              fontSize="small"
                              onClick={() => handleDeleteComment(comment.id)}
                            />
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
