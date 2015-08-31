var QueueRow = React.createClass({
    render: function() {
        var hacker = this.props.hacker;
        return(
            <tr href={hacker.id}>
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
            rows.push(<QueueRow hacker={hacker} key={hacker.name} />);
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
        return { filterText: '' };
    },
    handleUserInput: function(filterText) {
        this.setState({ filterText: filterText });
    },
    render: function() {
        return (
            <div>
                <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput} />
                <Queue hackers={this.props.hackers} filterText={this.state.filterText} />
            </div>
        );

    }
});

var HACKERS = [
    { id: 1, name: "Brian Soe", location: "Galbriath Hall", time: "2:00 PM" },
    { id: 2, name: "Eduardo Ramirez", location: "CSE Building", time: "1:30 PM" }
];
React.render(<SideTable hackers={HACKERS} />, document.getElementById("aside"));
