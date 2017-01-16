var React = require('react');
var ReactRouter = require('react-router');
var Link=ReactRouter.Link;
var styles = require('../styles/index')
var d3Loaders = require('../utils/d3Loaders')
var Puker = require('../utils/Puker')
var dropdown = require('../utils/Dropdown')
var C3Chart = require('../utils/c3Chart')
require('../styles/c3ChartStyles.css')

var Simple = React.createClass({
	getInitialState: function() {
		return {
			rawData: [],
			domain: [],
			columnHeaders: [],
			chartType: 'bar'
		}
	},
	setChartData: function(rawData) {
		console.log("MyRawData",rawData)
		// var domain = d3Loaders.domainCalculator(rawData, "xvar", "yvar")
		this.setState({rawData: rawData})

	},
	setDropDownData: function(columnHeaders) {
		this.setState({columnHeaders:columnHeaders, updateData:this.updateData })
	},
	updateData: function(selectedHeader, selectedChartType) {
			this.setState({chartType: selectedChartType})
			d3Loaders.csvLoader("data/dummy.csv", "var", selectedHeader, this.setChartData,'c3');
	},
	componentWillMount: function() {
		d3Loaders.csvLoader("data/dummy.csv", "var", "value2", this.setChartData,'c3');
		dropdown.getColumnHeaders("data/dummy.csv", this.setDropDownData)
	},
	componentDidMount: function() {
		// console.log(this.state.rawData);
	},
	render: function(){
		// d3Loaders.csvLoader("data/dummy.csv","var","value2", this.getdata)
		// console.log("Myarog",arogya);
		console.log("My state",this.state)
		var radiovals = ['line','bar'];
		return(
				<div className="row">
					<div className="jumbotron">
						<Link to='/'>
							<button type='button' className='pull-right btn btn-large btn-danger'>Back to home</button>
						</Link>
						<h1>Simple load and view!</h1>
						<p className="link">Simple analysis and visualization module</p>
					</div>
					
					<div className="jumbotron" style = {styles.transparentBg}>
						<h4>This is where my content stays!</h4>
						<dropdown.renderdropdown  selectedradiovar='bar'  radiovals = {radiovals} headers = {this.state.columnHeaders} updateDataFunction={this.updateData} selectedYVal="value2"/>
						{/*<Chart data={this.state.rawData} domain={this.state.domain} type="Bar"/>*/}
						<C3Chart columns={this.state.rawData} chartType={this.state.chartType}/>
						<Puker data={this.state} />
					</div>
					
				</div>
			)
	}
})

module.exports = Simple;