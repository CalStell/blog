import React, { useReducer } from "react";

export default (reducer, actions, initialState) => {
  //these three things will be custom for each piece of context we create
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    //actions === {addBlogPost: (dispthc) => {return () => {}}}
    const boundActions = {};

    for (let key in actions) {
      //action[key] would be === to something like addBlogPost
      boundActions[key] = actions[key](dispatch);
    }

    //...boundActions is "a ton of different function to modify state" and it is "availible to all of our child components cause it is the value of the Provider"
    return (
      <Context.Provider value={{ state: state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
