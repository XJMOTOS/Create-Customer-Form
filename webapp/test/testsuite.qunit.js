sap.ui.define(function () {
	"use strict";

	return {
		name: "QUnit test suite for the UI5 Application: beamsuntoryinc.createcustomerform",
		defaults: {
			page: "ui5://test-resources/beamsuntoryinc/createcustomerform/Test.qunit.html?testsuite={suite}&test={name}",
			qunit: {
				version: 2
			},
			sinon: {
				version: 1
			},
			ui5: {
				language: "EN",
				theme: "sap_horizon"
			},
			coverage: {
				only: "beamsuntoryinc/createcustomerform/",
				never: "test-resources/beamsuntoryinc/createcustomerform/"
			},
			loader: {
				paths: {
					"beamsuntoryinc/createcustomerform": "../"
				}
			}
		},
		tests: {
			"unit/unitTests": {
				title: "Unit tests for beamsuntoryinc.createcustomerform"
			},
			"integration/opaTests": {
				title: "Integration tests for beamsuntoryinc.createcustomerform"
			}
		}
	};
});
