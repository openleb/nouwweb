(function() {
'use strict';
var Card = React.createClass({
	render: function() {
		var legislator = this.props.legislator;
		var email = legislator.email.trim().length > 0?
			<a href={'mailto:'+legislator.email.trim()}>Email</a> :
			''

		var twitter = legislator.twitter.trim().length > 0?
			<a href={legislator.twitter}>Twitter</a> :
			''

		var facebook = legislator.facebook.trim().length > 0?
			<a href={legislator.facebook}>Facebook</a> :
			''

		var anySocial = (facebook + twitter + email).length == 0?
			"Not Available" : ""
		return (

			<div className="card col-md-6">
				<h3>{legislator.first_name + " " + legislator.last_name}</h3>
				<ul>
					<li><strong>District:</strong> {legislator.district || "Not Available"}</li>
					<li><strong>Sect: </strong>{legislator.sect || "Not Available"}</li>
					<li><strong>Party: </strong> {legislator.party || "Not Available"}</li>
					<li><strong>Phone: </strong> {legislator.phone || "Not Available"}</li>
					<li><strong>Mobile: </strong> {legislator.mobile || "Not Available"}</li>
					<li><strong>Social: </strong> {anySocial}
				<span>{email} {twitter} {facebook}</span></li>
				</ul>
			</div>
		);
	}
});

var Table = React.createClass({
	render: function() {
		var rows = [];
		var lastCategory = null;
		this.props.legislators.forEach(function (legislator) {
			var name = legislator.first_name + " " + legislator.last_name;
			var canPush = true;
			if (name.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1 ||
				(this.props.district !== 'All' && legislator.district !== this.props.district) ||
				(this.props.sect !== 'All' && legislator.sect !== this.props.sect) ||
				(this.props.party !== 'All' && legislator.party !== this.props.party)) {
				canPush = canPush && false;
			}
			if (this.props.social) {
				this.props.social.forEach(function(socialAccount) {
					if (legislator[socialAccount].trim().length === 0) {
						canPush = canPush && false;
					}
				});
			}
			if (canPush) rows.push(<Card legislator={legislator} />)
		}.bind(this));
		return (
			<div className="list col-md-12">
			 {rows}
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
			<form className="searchBar col-md-12">
				<input type="text" id="search" placeholder="Search..." value={this.props.filterText}
					onChange={this.handleChange}
					ref="filterTextInput" />
			</form>
		)
	}

});

var FilterBar = React.createClass({
	handleChange: function(key) {
		return function(a,b,c) {
			if (key !== 'social') {
				this.props.onUserInput(key, b.selected);
			} else {
				this.props.onUserInput(key, c);
			}
		}.bind(this)
	},
	render: function() {
		var districts = [];
		var sects = [];
		var parties = [];
		this.props.legislators.forEach(function(legislator) {
			if  ((this.props.district !== 'All' && legislator.district !== this.props.district) ||
				(this.props.sect !== 'All' && legislator.sect !== this.props.sect) ||
				(this.props.party !== 'All' && legislator.party !== this.props.party)) {
				return;
			}
			if (districts.indexOf(legislator.district) === -1) {
				districts.push(legislator.district)
			}
			if (sects.indexOf(legislator.sect) === -1) {
				sects.push(legislator.sect)
			}
			if (parties.indexOf(legislator.party) === -1) {
				parties.push(legislator.party)
			}
		}.bind(this))
		var districtOptions = districts.map(function(district) {
			return <option value={district}>{district}</option>
		})
		var partyOptions = parties.map(function(party) {
			return <option value={party}>{party}</option>
		})
		var sectOptions = sects.map(function(sect) {
			return <option value={sect}>{sect}</option>
		})
		return (
			<form className="filterBar col-md-12">
			<div className="selector col-md-3">
			<span><label>Sect:</label>
			<Chosen ref="sectInput" width="150px" value={this.props.sect} onChange={this.handleChange("sect")}>
				<option value='All'>All</option>
				{sectOptions}
			</Chosen> </span>
			</div >
			<div className="selector col-md-3">
			<span><label>Party:</label>
			<Chosen ref="partyInput" width="150px" value={this.props.party} onChange={this.handleChange("party")}>
				<option value='All'>All</option>
				{partyOptions}
			</Chosen> </span>
			</div>
			<div className="selector col-md-3">
			<span><label>District:</label>
			<Chosen ref="districtInput" width="150px" value={this.props.district} onChange={this.handleChange("district")}>
				<option value='All'>All</option>
				{districtOptions}
			</Chosen></span>
			</div>
			<div className="selector col-md-3">
			<span><label>Social:</label>
			<Chosen ref="Social" multiple width="150px" onChange={this.handleChange("social")}>
				<option value="facebook">Facebook</option>
				<option value="twitter">Twitter</option>
				<option value="email">Email</option>
			</Chosen></span>
			</div>
			</form>
		)
	}
})


var FilterableTable = React.createClass({
	componentDidMount: function() {
		$("#img").hide();
	},
	handleNewData: function(data) {
		this.setState({
			legislators: data,
		});
	},
	componentWillMount: function() {
		var that = this;
		$("#img").show();
		$.ajax({
			url: this.props.url,
			dataType: 'json',
		})
		.done(function(data) {
			that.handleNewData(data);
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});

	},
	getInitialState: function() {
		return {
			legislators: [],
			filterText: '',
			district: 'All',
			sect: 'All',
			party: 'All',
			social: [],
		};
	},
	handleSearchInput: function(filterText) {
		this.setState({
			filterText: filterText,
		});
	},
	handleFilterInput: function(key, value) {
		var stateChange = {};
		stateChange[key] = value;
		this.setState(stateChange);
	},
	render: function() {
		return (
			<div>
				<SearchBar onUserInput={this.handleSearchInput} filterText={this.state.filterText} />
				<FilterBar
					onUserInput={this.handleFilterInput}
					legislators={this.state.legislators}
					district={this.state.district}
					sect={this.state.sect}
					party={this.state.party} />
				<Table
					legislators={this.state.legislators}
					filterText={this.state.filterText}
					district={this.state.district}
					social={this.state.social}
					sect={this.state.sect}
					party={this.state.party}
					/>
			</div>
		);
	}
})

React.renderComponent(
	<FilterableTable url="http://api.nouwweb.pw/search?deputies_terms=2009" />,
	document.getElementById('content')
);
}());
