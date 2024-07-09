import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import PropTypes from "prop-types";

const node = document.getElementById("root");
const root = createRoot(node);

//通过继承`React`中提供的`Component`的API来自定义一个组件
class Post extends Component {
  //通过实现`render`接口实现视图生成逻辑
  render() {
    return React.createElement(
      "div",
      {
        className: "post",
      },
      React.createElement(
        "h2",
        {
          className: "postAuthor",
          id: this.props.id,
        },
        this.props.user,
        React.createElement(
          "span",
          {
            className: "postBody",
          },
          this.props.content
        )
      ),
      this.props.children
    );
  }
}
//通过指定propTypes属性，指定组件内部数据的校验和规范
Post.propTypes = {
  user: PropTypes.string.isRequired,
  content: PropTypes.string,
  id: PropTypes.number.isRequired,
};

class Comment extends Component {
  render() {
    console.log("yo");
    return React.createElement(
      "div",
      {
        className: "comment",
      },
      React.createElement(
        "h2",
        {
          className: "commentAuthor",
        },
        this.props.user,
        React.createElement(
          "span",
          {
            className: "commentContent",
          },
          this.props.content
        )
      )
    );
  }
}

Comment.propTypes = {
  id: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

class CreateComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      user: "",
    };
    this.handleUserChange = this.handleUserChange.bind(this); //react不会自动绑定，需要手动绑定方法到实例
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //定义处理对应事件的状态更新方法
  handleUserChange(event) {
    const val = event.target.value;
    this.setState(()=>({
      user:val
    }));
    console.log("user: ", this.state.user)
  }
  handleTextChange(event) {
    const val = event.target.value;
    this.setState(() => ({
      content: val
    }
    ));
    console.log("content: ", this.state.content)
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.onCommentSubmit(
      {
        user: this.state.user.trim(),
        content: this.state.content.trim(),

      }
    )
    this.setState(() => ({
      user: "",
      content: ""
    }));
  }
  render() {
    return React.createElement(
      "form",
      {
        className: "createComment",
        onSubmit: this.handleSubmit //将状态更新函数绑定到对应的事件
      },
      React.createElement("input", {
        type: "text",
        placeholder: "Your name",
        value: this.state.user,
        onChange: this.handleUserChange
      }),
      React.createElement("input", {
        type: "text",
        placeholder: "Thoughts?",
        onChange: this.handleTextChange
      }),
      React.createElement("input", {
        type: "submit",
        value: "Post",
      })
    );
  }
}
CreateComment.propTypes = {
  content: PropTypes.string,
};
const App = React.createElement(
  Post,
  {
    id: 1,
    content: " said: This is a post!",
    user: "mark",
  },
  React.createElement(Comment, {
    id: 2,
    user: "bob",
    content: " commented: wow! how cool!",
  }),
  React.createElement(CreateComment)
);
root.render(App);
