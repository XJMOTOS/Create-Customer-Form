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

			// this._loadModelFromJSONFile("taxInformation", "model/data/taxInformation.json");
			// this._loadModelFromJSONFile("taxClasification", "model/data/taxClassification.json");
			// this._loadModelFromJSONFile("contactType", "model/data/contactType.json");
			// this._loadModelFromJSONFile("distributtionChannel", "model/data/distributtionChannel.json");
			// this._loadModelFromJSONFile("division", "model/data/division.json");
			// this._loadModelFromJSONFile("paymentTerms", "model/data/paymentTerms.json");
			// this._loadModelFromJSONFile("accountAssignmentGroup", "model/data/accountAssignmentGroup.json");
		},

		_toggleVisibility: function (property) {
			let model = this.getView().getModel("view");
			let visible = model.getProperty(property);
			model.setProperty(property, !visible);
		},

		_showsField: function (fieldName, limit) {
			let model = this.getView().getModel("view");
			for (let index = 2; index <= limit; index++) {
				let visible = model.getProperty(`/show/${fieldName}${index}`);
				if (!visible) {
					model.setProperty(`/show/${fieldName}${index}`, true);
					return;
				}
			}
		},

		onToggleTaxDetailsFields: function (event) {
			this._toggleVisibility("/show/taxDetailsFields");
		},

		onToggleAttributeFields: function (event) {
			this._toggleVisibility("/show/attributeFields");
		},

		onToggleAddressFields: function (event) {
			this._toggleVisibility("/show/addressFields");
		},

		onToggleContactPersonsTable: function (event) {
			this._toggleVisibility("/show/contactPersonsTable");
		},
		
		onToggleCompanyFields: function (event) {
			this._toggleVisibility("/show/companyFields");
		},

		onToggleDeliveryFields: function (event) {
			this._toggleVisibility("/show/deliveryFields");
		},
		
		onToggleCustomerGroupFields: function (event) {
			this._toggleVisibility("/show/customerGroupFields");
		},

		onToggleSalesFields: function (event) {
			this._toggleVisibility("/show/salesFields");
		},
		
		onToggleHierarchyFields: function (event) {
			this._toggleVisibility("/show/hierarchyFields");
		},

		onShowName: function (event) {
			this._showsField("name", 4);
		},

		onHideName: function (event, param) {
			let model = this.getView().getModel("view");
			model.setProperty(`/show/name${param}`, false);
		},

		onShowTelephone: function (event) {
			this._showsField("telephone", 5);
		},

		onHideTelephone: function (event, param) {
			let model = this.getView().getModel("view");
			model.setProperty(`/show/telephone${param}`, false);
		},

		onShowFax: function (event) {
			this._showsField("fax", 5);
		},

		onHideFax: function (event, param) {
			let model = this.getView().getModel("view");
			model.setProperty(`/show/fax${param}`, false);
		},

		onShowEmail: function (event) {
			this._showsField("email", 5);
		},

		onHideEmail: function (event, param) {
			let model = this.getView().getModel("view");
			model.setProperty(`/show/email${param}`, false);
		},

		onShowStreet: function (event) {
			this._showsField("street", 5);
		},

		onHideStreet: function (event, param) {
			let model = this.getView().getModel("view");
			model.setProperty(`/show/street${param}`, false);
		},

		onAddContactPerson: function (event) {
			let model = event.getSource().getModel("customer");
			let contacts = model.getProperty("/contactPersons");
			contacts.push({
				function: "",
				firstName: "",
				lastName: "",
				email: "",
				phone: ""
			});
			model.setProperty("/contactPersons", contacts);
		},

		onRemoveContactPerson: function (event) {
			let model = event.getSource().getModel("customer");
			let contacts = model.getProperty("/contactPersons");
			let path = event.getParameter("listItem").getBindingContext("customer").getPath();
			let index = path.split("/")[2];
			contacts.splice(index, 1);
			model.setProperty("/contactPersons", contacts);
		}
	});
});
