import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import PropTypes from "prop-types";

const data = {
  post: {
    id: 123,
    content:
      "What we hope ever to do with ease, we must first learn to do with diligence. — Samuel Johnson",
    user: "Mark Thomas"
  },
  comments: [
    {
      id: 0,
      user: "David",
      content: "such. win."
    },
    {
      id: 1,
      user: "Haley",
      content: "Love it."
    },
    {
      id: 2,
      user: "Peter",
      content: "Who was Samuel Johnson?"
    },
    {
      id: 3,
      user: "Mitchell",
      content: "@Peter get off Letters and do your homework"
    },
    {
      id: 4,
      user: "Peter",
      content: "@mitchell ok :P"
    }
  ]
};
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

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.comments
    };
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
  }

  handleCommentSubmit(comment) {
    const comments = this.state.comments;
    comment.id = Date.now();
    const newComments = comments.concat([comment])
    this.setState({
      comments: newComments
    })
  }

  render() {
    return React.createElement(
      "div",
      {
        className: "commentBox"
      },
      React.createElement(Post, {
        id: this.props.post.id,
        content: this.props.post.content,
        user: this.props.post.user
      }),
      this.state.comments.map(function(comment) {
        return React.createElement(Comment, {
          key: comment.id,
          id: comment.id,
          content: ": "+comment.content,
          user: comment.user
        });
      }),
      React.createElement(CreateComment, {
         onCommentSubmit: this.handleCommentSubmit
      })
    )
  }
}

CommentBox.propTypes = {
  post: PropTypes.object,
  comments: PropTypes.arrayOf(PropTypes.object)
}
const App = 
  React.createElement(CommentBox, {
    comments: data.comments,
    post: data.post
  });
root.render(App);
