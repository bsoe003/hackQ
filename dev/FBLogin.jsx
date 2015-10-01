function attachFBLogin () {
  var FBLoginButton = React.createClass({
    render: function() {
      return (
        <a href="/auth/facebook" id="login_link" >
          <img src="img/login-with-facebook.png" />
        </a>
      );
    }
  });

  React.render(
    <FBLoginButton />,
    document.getElementById('wrapper')
  );
};
