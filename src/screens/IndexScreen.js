import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { Context as Context } from "../context/BlogContext";
//you could say like Context as BlogContext if you had to import two contexts
import { Feather } from "@expo/vector-icons";

const IndexScreen = ({ navigation }) => {
  //it comes with the navigation prop because we're using react navigation
  console.log("hello");
  const { state, deleteBlogPost, getBlogPosts } = useContext(Context);
  //useContext says "look at this context object and give us access to its value prop." So, value will be equal to the value prop of BlogContext.Provider

  useEffect(() => {
    getBlogPosts(); //says first time we run Index screen, run this
    navigation.addListener("didFocus", () => {
      //AND anytime we return to Index Screen, run getBlogPosts() again
      getBlogPosts();
    });
    return () => {
      listener.remove(); //this turns off the listener as soon as the listener is no longer being shown ... as soon as its completely off
    };
  }, []); //empty array means run this only one time when component first shows up on the screen

  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={(blogPost) => blogPost.title}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Show", { id: item.id })}
              //show for ShowScreen
            >
              <View style={styles.row}>
                <Text style={styles.title}>
                  {item.title} - {item.id}
                </Text>
                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                  <Feather style={styles.icon} name="trash" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }} //renderItem basically is a render map, rendering each item in data
      />
    </View>
  );
};

IndexScreen.navigationOptions = ({ navigation }) => {
  //whenever our IndexScreen is about to be displayed, react navigation will call this function that we assign to navigation options
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("Create")}>
        <Feather name="plus" size={30} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: "gray",
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
});

export default IndexScreen;
