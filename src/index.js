import React, { Component } from 'react';
import {createRoot} from 'react-dom/client';
import PropTypes from "prop-types";

const node = document.getElementById('root')
const root = createRoot(node)

//通过继承`React`中提供的`Component`的API来自定义一个组件
class Post extends Component {

    //通过实现`render`接口实现视图生成逻辑
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
//通过指定propTypes属性，指定组件内部数据的校验和规范
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