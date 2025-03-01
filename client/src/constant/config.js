// API notification messages
export const API_NOTIFICATION_MESSAGE = {
    loader: {
      title: "loading...!",
      Message: "data is loading please wait",
    },
    success: {
      title: "success",
      Message: "data is successfully loaded",
    },
    responseFailure: {
      title: "error",
      Message: "An error occurred while fetching response from server. please try again",
    },
    requestFailure: {
      title: "error",
      Message: "An error occurred while parsing response from data. please try again",
    },
    networkerror: {
      title: "error",
      Message: "unable to connect with server please check internet connectivity",
    },
  };
  
  // Service URLs
  /*export const Service_Url = {
    userSign: { url: "/signup", method: "POST" },
    userLogin: { url: "/login", method: "POST" },
    uploadfile:{url:"file/upload",method:"POST"},
    savePost:{url:"/create",method:"POST"},
    getALLPosts:{url:"/all/posts",method:"GET",params:true},
  };
*/

  // config.js

export const Service_Url = {
  userSign: { url: "/signup", method: "POST" },
  userLogin: { url: "/login", method: "POST" },
  uploadFile: { url: "/file/upload", method: "POST" },
  savePost: { url: "/create", method: "POST" },
  getAllPosts: { url: "/all/posts", method: "GET" },
  getPostbyIdd:{url:"/all/post",method:"GET",params:true},
  updateBlogPost: { url: "/update", method: "PUT", params: true },
  deleteBlog: { url: "/delete", method: "DELETE", params: true },
  newComment:{url:"/new/comment",method:"POST",params:true},
  GetAllComments:{url:"/new/allcomments",method:"GET"}
  // Add other service URLs as needed
};
