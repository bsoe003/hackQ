$("#request").on('click', function() {
    var name = $("#requester_name").val();
    var location = $("#requester_location").val();
    if(name === "" || location === "") return false;
    var key = "{name:\""+name.toLowerCase()+"\",location:\""+location.toLowerCase()+"\"}"
    key = btoa(key);
    var time = new Date().getTime()
    firebase.child(time.toString()).set({
        id: key,
        name: name,
        location: location,
        time: time
    });
});

var Tag = React.createClass({
    render: function() {
        return (
            <div className="tagOnInput">
                {this.props.tag}
            </div>
        );
    }
});

var TagList = React.createClass({
    render: function() {
        var tags = [];
        this.props.tags.forEach(function(tag) {
            tags.push(<Tag tag={tag} />);
        });
        return (
            <div>{tags}</div>
        );
    }
});

var TagInputField = React.createClass({
    handleEnter: function(e) {
        if(e.which == 13) {
            this.props.onUserInput(this.refs.tif.getDOMNode().value)
        }
    },
    render: function() {
        return (
            <div>
                <TagList tags={this.props.tags} />
                <input type="text" id="tag_input" placeholder="What do you need help on?" ref="tif" onKeyPress={this.handleEnter} />
            </div>
        );
    }
});

var TagInputContainer = React.createClass({
    getInitialState: function() {
        return {
            tags: []
        };
    },
    tagHandler: function(value) {
        var tags = this.state.tags;
        tags.push(value);
        this.setState({tags: tags});
    },
    render: function() {
        return (
            <TagInputField tags={this.state.tags} onUserInput={this.tagHandler} />
        );
    }
});

React.render(<TagInputContainer />, document.getElementById("tagWrapperInput"));
