var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, World! I am Brian Soe.
      </div>
    );
  }
});
React.render(
  <CommentBox />,
  document.getElementById('content')
);