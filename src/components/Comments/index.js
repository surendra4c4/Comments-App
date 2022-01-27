import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {commentsList: [], input: '', comments: ''}

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = id => {
    const {commentsList} = this.state

    this.setState({
      commentsList: commentsList.filter(eachComment => eachComment.id !== id),
    })
  }

  renderCommentsList = () => {
    const {commentsList} = this.state

    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ))
  }

  addComment = event => {
    event.preventDefault()
    const {input, comments} = this.state

    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: uuidv4(),
      name: input,
      comment: comments,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      input: '',
      comments: '',
    }))
  }

  changeComments = event => {
    this.setState({comments: event.target.value})
  }

  changeInput = event => {
    this.setState({input: event.target.value})
  }

  render() {
    const {input, comments, commentsList} = this.state
    return (
      <div className="bg-container">
        <h1 className="heading">Comments</h1>
        <div className="top-container">
          <form className="form" onSubmit={this.addComment}>
            <p className="paragraph">Say something about 4.0 Technologies</p>
            <input
              type="text"
              placeholder="Your Name"
              className="input-class"
              value={input}
              onChange={this.changeInput}
            />
            <br />
            <textarea
              rows="5"
              placeholder="Your Comment"
              className="input-class"
              value={comments}
              onChange={this.changeComments}
            />
            <br />
            <button type="submit" className="btn">
              Add Comment
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="image"
          />
        </div>
        <hr />
        <p className="comments-para">
          <span className="span-class">{commentsList.length}</span> Comments
        </p>
        <ul className="list-container">{this.renderCommentsList()}</ul>
      </div>
    )
  }
}

export default Comments
