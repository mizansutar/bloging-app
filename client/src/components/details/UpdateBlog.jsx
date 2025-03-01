import React, { useContext, useEffect, } from "react";
import {
    Box,
    FormControl,
    TextField,
    Button,
    IconButton,
    InputBase,
    Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TitleIcon from "@mui/icons-material/Title";
import DescriptionIcon from "@mui/icons-material/Description";
import SendIcon from "@mui/icons-material/Send"; // Your banner image
import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import { API } from "../../service/api";

import { DataContext } from "../../context/dataProvider";


const initialPost = {
    title: "",
    Description: "",
    piture: "",
    username: "",
    categcategeries: "",
    createdDate: new Date()
}


// Styled components
const BannerContainer = styled(Box)({
    width: "100%",
    height: "250px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: "15px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
    marginBottom: "20px",
});

const BannerImage = styled("img")({
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
        transform: "scale(1.05)",
    },
});

const Overlay = styled(Box)({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "2rem",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "2px",
});

const FormContainer = styled(Box)({
    maxWidth: "700px",
    margin: "20px auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#ffffff",
});

const StyledFormControl = styled(FormControl)({
    width: "100%",
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
});

const StyledInputBase = styled(InputBase)({
    border: "2px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    fontSize: "16px",
    transition: "0.3s",
    "&:focus": {
        borderColor: "#007BFF",
    },
});

const UploadBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    border: "2px dashed #007BFF",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
    "&:hover": {
        backgroundColor: "#f0f8ff",
    },
});

const StyledButton = styled(Button)({
    background: "#007BFF",
    color: "#fff",
    fontWeight: "bold",
    "&:hover": {
        background: "#0056b3",
    },
});

const UpdateBlog = () => {
    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState(null);
    const Location = useLocation();
    const { account } = useContext(DataContext);
    const { id } = useParams();
    console.log(id);
    const url = post.piture ? post.piture : "http://localhost:3001/file/67bea08b333d71169f4a761c";
    const navigate = useNavigate();

    const updateBlogPost = async () => {
        if (post.Description === null || post.title === null) {
            alert("please fill all fields...!");
            return;
        }
        const response = await API.updateBlogPost(id, post); // Corrected to include id
        if (response.isSuccess) {
            navigate(`/details/${id}`);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await API.getPostbyIdd({ id });
                if (response.isSuccess) {
                    console.log(response.data);
                    setPost(response.data);
                }
            } catch (error) {
                console.log(error);
            }

        }
        fetchData();
    }, []);




    console.log(post.description);


    useEffect(() => {

        const getImage = async () => {
            if (file) {
                const data = new FormData();
                //  const filename=Date.now()+file.name;
                data.append("name", file.name);
                data.append("file", file);
                //    setPost({...post,picture:filename}) 

                // api to call for showing the image for user to see

                try {
                    const response = await API.uploadFile(data);
                    // alert(response);
                    alert("the file uploaded succesfully...!")
                    post.piture = response.data;
                    console.log(post.piture)
                } catch (error) {
                    alert(error);
                }
                //   url =post.piture? post.piture:bannerImg; 
            }
        }
        getImage();
        post.categcategeries = Location.search?.split("=")[1] || "all";
        post.username = account.username;
    }, [file]);


    const handleChange = (e) => {

        setPost({ ...post, [e.target.name]: e.target.value })
    }

    return (
        <>
            {/* Banner Section */}
            <BannerContainer>
                <BannerImage src={url} alt="banner" />
                <Overlay>Welcome to Your Blog</Overlay>
            </BannerContainer>

            {/* Form Section */}
            <FormContainer>
                {/* Upload Cover Image */}
                <StyledFormControl>
                    <label htmlFor="fileInput">
                        <UploadBox>
                            <CloudUploadIcon style={{ fontSize: "30px", color: "#007BFF" }} />
                            <span>Upload Cover Image</span>
                        </UploadBox>
                    </label>
                    <input type="file" id="fileInput" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
                </StyledFormControl>

                {/* Blog Title */}
                <StyledFormControl>
                    <Box display="flex" alignItems="center">
                        <TitleIcon style={{ marginRight: "10px", color: "#007BFF" }} />
                        <StyledInputBase placeholder="Enter Blog Title" fullWidth onChange={(e) => handleChange(e)} name="title" required value={post.title} />
                    </Box>
                </StyledFormControl>

                {/* Blog Content */}
                <StyledFormControl>
                    <Box display="flex" alignItems="center">
                        <DescriptionIcon style={{ marginRight: "10px", color: "#007BFF" }} />
                        <TextField
                            placeholder="Write your blog content here..."
                            multiline
                            rows={6}
                            variant="outlined"
                            fullWidth
                            onChange={(e) => handleChange(e)} name="description"
                            required={true}
                            value={post.description}
                        />
                    </Box>
                </StyledFormControl>

                {/* Publish Button */}
                <StyledButton variant="contained" fullWidth endIcon={<SendIcon />} onClick={updateBlogPost}>
                    Update
                </StyledButton>
            </FormContainer>
        </>
    );
};

export default UpdateBlog;
