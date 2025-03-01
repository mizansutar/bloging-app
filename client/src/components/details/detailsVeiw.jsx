import { Box, styled, Typography, IconButton, Tooltip } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Edit, Delete } from "@mui/icons-material";
import { API } from "../../service/api";
import { DataContext } from "../../context/dataProvider";
import Comments from "./comments/comments";


// Styled components
const Container = styled(Box)(({ theme }) => ({
  margin: "30px 70px",
  padding: "20px",
  background: "wheat",
    borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.down("sm")]: {
    margin: "20px 10px",
    padding: "10px",
  },
}));

const Image = styled("img")({
  width: "100%",
  height: "60vh",
  objectFit: "cover",
  borderRadius: "8px",
  marginBottom: "20px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
});

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: "bold",
  marginBottom: "10px",
  color: "#333",
  wordBreak: "break-word",
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
}));

const AuthorBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  color: "#878787",
  marginBottom: "20px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

const Author = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9rem",
  },
}));

const DateText = styled(Typography)(({ theme }) => ({
  color: "#787878",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
    marginTop: "5px",
  },
}));

const Description = styled(Typography)(({ theme }) => ({
  lineHeight: 1.6,
  color: "#444",
  wordBreak: "break-word",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

const DetailView = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const { account } = useContext(DataContext);
const navigate=useNavigate();
  const url = post.piture
    ? post.piture
    : "http://localhost:3001/file/67be8e31333d71169f4a75bb";

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostbyIdd({ id });
      if (response.isSuccess) {
        setPost(response.data);
      }
    };
    fetchData();
  }, [id]);
const deleteBlogf=async ()=>{
  
  let response =await API.deleteBlog(post._id);
  if(response.isSuccess){
    navigate("/");
  }
}




  return (
    <>
    <Container>
      <Image src={url} alt="blog" />
      {account.username === post.username && (
        <Box style={{ float: "right" }}>
          <Tooltip title="Edit">
            <Link to={`/update/${post._id}`} color="primary">
            <IconButton color="primary">
              <Edit />
            </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Delete">
            
            <IconButton color="error">
              <Delete onClick={()=>{deleteBlogf()}}/>
            </IconButton>
          </Tooltip>
        </Box>
      )}
      <Heading variant="h2">{post.title}</Heading>
      <AuthorBox>
        <Author variant="subtitle1">By {post.username}</Author>
        <DateText variant="subtitle2">
          {new Date(post.createdAt).toDateString()}
        </DateText>
      </AuthorBox>
      <Description variant="body1">{post.description}</Description>
    </Container>
    <Comments post={post}/>
    </>
  );
};

export default DetailView;
