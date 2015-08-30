var QueueRow = React.createClass({
	render: function() {
		var hacker = this.props.hacker;
		return(
			<tr>
				<td>{hacker.name} | {hacker.location} | {hacker.time}</td>
			</tr>
		);
	}
});

var Queue = React.createClass({
	render: function() {
		var rows = [];
		this.props.hackers.forEach(function(hacker) {
			if(!hacker.name.contains(this.props.filterText)) return;
			rows.push(<QueueRow hacker={hacker} key={hacker.name} />);
		}.bind(this));
		return(
			<table>
                <tbody>{rows}</tbody>
            </table>
		);
	}
});

var SearchBar = React.createClass({
	handleChange: function() {
		this.props.onUserInput(this.refs.filterTextInput.getDOMNode().value);
	},
	render: function() {
		return (
			<form>
				<input type="text" placeholder="Search..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange} />
			</form>
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
	{ name: "Brian Soe", location: "Galbriath Hall", time: "2:00 PM" },
	{ name: "Eduardo Ramirez", location: "CSE Building", time: "1:30 PM" }
];
React.render(<SideTable hackers={HACKERS} />, document.getElementById("aside"));
