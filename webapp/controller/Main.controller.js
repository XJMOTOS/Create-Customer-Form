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
			this._loadModelFromJSONFile("taxInformation", "model/data/taxInformation.json");
			this._loadModelFromJSONFile("taxClasification", "model/data/taxClassification.json");
			this._loadModelFromJSONFile("contactType", "model/data/contactType.json");
			this._loadModelFromJSONFile("distributtionChannel", "model/data/distributtionChannel.json");
			this._loadModelFromJSONFile("customer", "model/data/customer.json");
			this._loadModelFromJSONFile("division", "model/data/division.json");
			this._loadModelFromJSONFile("paymentTerms", "model/data/paymentTerms.json");
			this._loadModelFromJSONFile("accountAssignmentGroup", "model/data/accountAssignmentGroup.json");
			this.getView().setModel(new JSONModel([]), "customerContact");
		},
	});
});
