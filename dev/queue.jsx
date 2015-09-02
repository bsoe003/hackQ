$(document).ready(function() {
    var search = $("#search").height();
    var sidebar = $("#aside").height();
    $("#queueWrapper").height(sidebar-search)
    console.log($("#queueWrapper").height()); 
});

var QueueRow = React.createClass({
    render: function() {
        var hacker = this.props.hacker;
        return(
            <tr href={hacker[".key"]}>
                <td className="hImgWrapper"><img className="hImg" src="/img/dummy_profile.png" alt="" /></td>
                <td className="hacker">
                    <span className="hName">{hacker.name}</span> <br/> <span className="hLocation">{hacker.location}</span>
                </td>
            </tr>
        );
    }
});

var Queue = React.createClass({
    render: function() {
        var rows = [];
        this.props.hackers.forEach(function(hacker) {
            if(!hacker.name.toLowerCase().contains(this.props.filterText.toLowerCase())) return;
            rows.unshift(<QueueRow hacker={hacker} key={hacker.name} />);
        }.bind(this));
        return(
            <div id="queueWrapper">
                <table id="queue" align="left" cellspacing="0" cellpadding="0">
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    }
});

var SearchBar = React.createClass({
    handleChange: function() {
        this.props.onUserInput(this.refs.filterTextInput.getDOMNode().value);
    },
    render: function() {
        return (
            <div id="search">
                <input type="text" placeholder="Search..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange} />
            </div>
        );
    }
});

var SideTable = React.createClass({
    getInitialState: function() {
        return {
            filterText: '',
            hackers: []
        };
    },
    handleUserInput: function(filterText) {
        this.setState({ filterText: filterText });
    },
    mixins: [ReactFireMixin],
    componentWillMount: function() {
        this.bindAsArray(firebase, "hackers");
    },
    render: function() {
        return (
            <div>
                <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput} />
                <Queue hackers={this.state.hackers} filterText={this.state.filterText} />
            </div>
        );

    }
});

React.render(<SideTable />, document.getElementById("aside"));
