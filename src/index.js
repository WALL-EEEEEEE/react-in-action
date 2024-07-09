import React, { Component } from 'react';
import {createRoot} from 'react-dom/client';
import PropTypes from "prop-types";

const node = document.getElementById('root')
const root = createRoot(node)

class Post extends Component {
    render() {
      return React.createElement(
        "div", 
        {
          className: "post"
        },
        React.createElement(
          "h2",
          {
            className: "postAuthor",
            id: this.props.id
          },
          this.props.user,
          React.createElement(
            "span",
            {
              className: "postBody"
            },
            this.props.content
          )
        )
      )
    }
}
Post.propTypes = {
  user: PropTypes.string.isRequired,
  content: PropTypes.string,
  id: PropTypes.number.isRequired
};
const App = React.createElement(Post, {
  id: 1, 
  content: " said: This is a post!",
  user: "mark"
});
root.render(App)