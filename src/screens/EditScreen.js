import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Context as Context } from "../context/BlogContext";
import BlogPostForm from "../components/BlogPostForm";

const EditScreen = ({ navigation }) => {
  const id = navigation.getParam("id");

  const { state, editBlogPost } = useContext(Context); //I can call editBlogPost here because we've exported it from Context and we import Context as Context here
  const blogPost = state.find((blogPost) => blogPost.id === id);

  return (
    <BlogPostForm
      initialValues={{ title: blogPost.title, content: blogPost.content }}
      onSubmit={(title, content) => {
        editBlogPost(id, title, content, () => navigation.pop()); //navigation.pop sends user back to previous screen
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default EditScreen;
