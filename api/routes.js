var csv = require('csv-stream');
var request = require('request');

module.exports = (function() {
	'use strict';
	var baseUrl = 'https://docs.google.com/spreadsheet/tq?' +
	'key=0Aqv3NjQVGHDbdGZNTXFiWlg4ZFFSdDhiSXU1d25MU1E&pub=1&tqx=out:csv';

	var dict = {
		'first_name': {column: 'A', type: 'category'},
		'first_name_ar': {column: 'B', type: 'category'},
		'last_name': {column: 'C', type: 'category'},
		'last_name_ar': {column: 'D', type: 'category'},
		'gender': {column: 'E', type: 'category'},
		'gender_ar': {column: 'F', type: 'category'},
		'district': {column: 'K', type: 'category'},
		'sect': {column: 'Q', type: 'category'},
		'born_day': {column: 'R', type: 'category'},
		'born_month': {column: 'S', type: 'category'},
		'born_year': {column: 'T', type: 'category'},
		'other_notes': {column: 'V', type: 'category'},
		'email': {column: 'J', type: 'boolean'},
		'phone': {column: 'G', type: 'boolean'},
		'fax': {column: 'H', type: 'boolean'},
		'mobile': {column: 'I', type: 'boolean'},
		'facebook': {column: 'L', type: 'boolean'},
		'twitter': {column: 'M', type: 'boolean'},
		'website': {column: 'U', type: 'boolean'},
		'deputies_terms': {column: 'N', type: 'set'},
		'party': {column: 'O', type: 'set'},
		'party_ar': {column: 'P', type: 'set'},
	};

	function buildResponse(paramString, callback) {
		var res = [];
		var options = {enclosedChar: '"'};
		var csvStream = csv.createStream(options);
		var sane = true;
		request(baseUrl + paramString)
		.pipe(csvStream)
		.on('data', function(data) {
			for (var k in data) {
				sane = sane && (k !== 'undefined');
			}
			res.push(data);
		})
		.on('end', function() {
			if (sane) {
				callback(null, res);
			} else {
				callback(new Error('Some or all of your parameters could not be processed.'), null);
			}
		});
	}
	return {

		search:function (params, callback) {
			var paramString = '&tq=where%20';
			var numParams = 0;

			//Create the Query 
			for (var k in params) {
				var kv = '';
				if (k in dict) {
					if (dict[k].type === 'category') {
						kv = dict[k].column + '=%27' + params[k] +'%27%20';
					}
					if (dict[k].type === 'boolean') {
						if (params[k] === 'true') {
							kv = dict[k].column +'!=""%20';
						} else if (params[k] === 'false') {
							kv = dict[k].column +'=""%20';
						} else {
							callback(new Error('Some or all of your parameters could not be processed.'), null);
						}
					}
					if (dict[k].type === 'set') {
						kv = dict[k].column+'%20contains%20%27' + params[k] + '%27%20';
					}
					paramString += (numParams > 0)? 'and%20' + kv: kv;
					numParams += 1;
				}
			}

			//Create the JSON Object
			if (numParams == 0) {
				callback()
			}
			buildResponse(paramString, callback);
		},

		districts: function(callback) {
			var paramString = '&tq=select%20'+dict.district.column +
				',count('+dict.first_name.column+')%20group%20by%20'+
				dict.district.column + '%20label%20count('+dict.first_name.column+')%20' +
				'%27legislators%27';
			buildResponse(paramString, callback);
		},
		sects: function(callback) {
			var paramString = '&tq=select%20'+dict.sect.column +
				',count('+dict.first_name.column+')%20group%20by%20'+
				dict.sect.column + '%20label%20count('+dict.first_name.column+')%20' +
				'%27legislators%27';
			buildResponse(paramString, callback);
		},
		parties: function(callback) {
			var paramString = '&tq=select%20'+dict.party.column + ',' + dict.party_ar.column +
				',count('+dict.first_name.column+')%20group%20by%20'+
				dict.party.column +',' + dict.party_ar.column +
				'%20label%20count('+dict.first_name.column+')%20' +
				'%27legislators%27';
			buildResponse(paramString, callback);
		},
		names: function(callback) {
			var paramString = '&tq=select%20'+dict.first_name.column + ',' +
			dict.last_name.column + ',' + dict.first_name_ar.column + ',' +
			dict.last_name_ar.column;
			buildResponse(paramString, callback);
		},
	};
})();