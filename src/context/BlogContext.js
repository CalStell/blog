import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

//all of the state is contained in here

// const BlogContext = React.createContext(); //this shepards info from provider to children. createContext gives a Provider method that makes what info you provide it availible to all child components

const blogReducer = (state, action) => {
  switch (action.type) {
    case "delete_blogpost":
      return state.filter((blogPost) => blogPost.id !== action.payload);
    case "edit_blogpost":
      return state.map((blogPost) => {
        if (blogPost.id === action.payload.id) {
          return action.payload; //cause action.payload is basically a blogpost object
        } else {
          return blogPost;
        }
      });
    case "get_blogposts":
      return action.payload; //we're replacing all our existing state with this
    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => {
  return async () => {
    try {
      const response = await jsonServer.get("/blogposts");
      //response.data === [{BLOGPOST}, {BLOGPOSTS}, {BLOGPOST} ...]
      console.log(response.data);
      dispatch({ type: "get_blogposts", payload: response.data }); //this object is gonna be second argument in blogReducer (so 'action')
    } catch (err) {
      console.log(err);
      setErrorMessage("Something went wrong");
    }
  };
};

const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    await jsonServer.post("/blogposts", { title: title, content: content }); //post request (2nd argurment is data to send to server)
    if (callback) {
      callback();
    }
  };
};

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/blogposts/${id}`);
    dispatch({ type: "delete_blogpost", payload: id }); //payload is the id of post to delete
  };
};

const editBlogPost = (dispatch) => {
  return async (id, title, content, callback) => {
    //id is id of blogPost we want to edit
    await jsonServer.put(`/blogposts/${id}`, {
      title: title,
      content: content,
    });
    dispatch({
      type: "edit_blogpost",
      payload: { id: id, title: title, content: content },
    });
    if (callback) {
      callback();
    }
  };
};

// export const BlogProvider = ({ children }) => {
//   const [blogPosts, dispatch] = useReducer(blogReducer, []); //dispatch runs blogReducer. type is the case. dispatch takes an action object

//   return (
//     <BlogContext.Provider value={{ data: blogPosts, addBlogPost }}>
//       {children}
//     </BlogContext.Provider>
//   ); //children is essentially an arguemnt that you are accepting (look at video 130 3:00). Essentially, we're creating a component that can accept another component. So on the App screen's export default, {children} here, is <App />
//   //Could say Value = friends list or past swipes list
// };

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []

  //To add a new "resource" like list of comments, photos, etc inside of your app, you'd make a new Reducer, make a couple a functions that will take the dispatch function and dispatch and action to update our data. Then we'll pass all that into "createDataContext" line above, which gives us back our Context obejct and our provider. Provider is used in our App.js file in the JSX. it wraps the <App />. Context is used in any component that somehow needs to get access to the Context information
);
