sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("beamsuntoryinc.createcustomerform.controller.Main", {
		onInit: function () {
			this._initializeModels();
		},

		_loadModelFromJSONFile: function (modelName, path) {
			let model = new JSONModel();
			model.loadData(path);
			this.getView().setModel(model, modelName);
		},

		_initializeModels: function () {
			this._loadModelFromJSONFile("view", "model/view.json");
			this._loadModelFromJSONFile("customer", "model/customer.json");
			this._loadModelFromJSONFile("taxInformation", "model/data/taxInformation.json");
			this._loadModelFromJSONFile("taxClasification", "model/data/taxClassification.json");
			this._loadModelFromJSONFile("contactType", "model/data/contactType.json");
			this._loadModelFromJSONFile("distributtionChannel", "model/data/distributtionChannel.json");
			this._loadModelFromJSONFile("division", "model/data/division.json");
			this._loadModelFromJSONFile("paymentTerms", "model/data/paymentTerms.json");
			this._loadModelFromJSONFile("accountAssignmentGroup", "model/data/accountAssignmentGroup.json");
			this.getView().setModel(new JSONModel([]), "customerContact");
		},

		_toggleVisibility: function (modelName, property) {
			let model = this.getView().getModel(modelName);
			let visible = model.getProperty(property);
			model.setProperty(property, !visible);
		},

		onToggleTaxTable: function (event) {
			this._toggleVisibility("view", "/show/table/taxInformation");
		},

		onToggleCustomerContactTable: function (event) {
			this._toggleVisibility("view", "/show/table/customerContact");
		},

		onToggleOrganizationalDataOptionalFields: function (event) {
			this._toggleVisibility("view", "/show/optionalOrganizationalDataFields");
		},

		onToggleGeneralDataOptionalFields: function (event) {
			this._toggleVisibility("view", "/show/optionalGeneralDataFields");
		},

		onShowTaxNumber: function (event) {
			let model = this.getView().getModel("view");
			let visible = model.getProperty("/show/taxNumber2");
			if (!visible) {
				model.setProperty("/show/taxNumber2", true);
				return
			}
			model.setProperty("/show/taxNumber4", true);
		},

		onHideTaxNumber: function (event, param) {
			let model = this.getView().getModel("view");
			model.setProperty(`/show/taxNumber${param}`, false);
		},

		onAddContact: function (event) {
			let model = event.getSource().getModel("customerContact");
			let contacts = model.getData();
			contacts.push({
				contactType: "",
				name: "",
				surname: "",
				phone: "",
				fax: "",
				email: ""
			});
			model.setData(new JSONModel(contacts), "customerContact");
		},

		onRemoveContact: function (event) {
			let model = event.getSource().getModel("customerContact");
			let contacts = model.getData();
			let path = event.getParameter("listItem").getBindingContext("customerContact").getPath();
			let index = parseInt(path.slice(1), 10);
			contacts.splice(index, 1);
			model.setData(new JSONModel(contacts), customerContactModelName);
		}
	});
});
