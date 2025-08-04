sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel"
], (BaseController, JSONModel) => {
    "use strict";

    return BaseController.extend("beamsuntoryinc.createcustomerform.controller.Main", {
        onInit: function () {
			this._initializeModels();
		},

		read: function() {
			let model = this.getOwnerComponent().getModel("GWD_C_FORM_UI5");
			let entity = "/ZFA1_BRSCHSet";

			model.read(entity, {
				success: function(oData) {
					console.log("Datos leídos:", oData);
				},
				error: function(oError) {
					console.error("Error al leer:", oError);
				}
			});
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
			this._loadModelFromJSONFile("contactTypes", "model/data/contactType.json");
			this._loadModelFromJSONFile("distributtionChannels", "model/data/distributtionChannel.json");
			this._loadModelFromJSONFile("divisions", "model/data/division.json");
			this._loadModelFromJSONFile("termsOfPayment", "model/data/paymentTerms.json");
			this._loadModelFromJSONFile("accountAssignmentGroups", "model/data/accountAssignmentGroup.json");
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

		onToggleAddressFields: function (event) {
			this._toggleVisibility("/show/addressFields");
		},
		
		onToggleCompanyFields: function (event) {
			this._toggleVisibility("/show/companyFields");
		},

		onToggleSalesFields: function (event) {
			this._toggleVisibility("/show/salesFields");
		},
		
		onToggleHierarchyFields: function (event) {
			this._toggleVisibility("/show/hierarchyFields");
		},
		
		onToggleGeneralFields: function (event) {
			this._toggleVisibility("/show/generalFields");
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
				contactType: "",
				name: "",
				surname: "",
				phone: "",
				fax: "",
				email: "",
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
		},

		_getEmptyMandatoryFields(event) {
			let customerMandatoryFields = {
				"main": [ "accountGroup", "companyCode", "salesOrganization", "distributtionChannel", "division", "taxNumber", "vatRegistrationNumber" ],
				"general": [ "name1", "country", "searchTerm", "language", "accountGroup", "classification", "transportationZone", "industryKey", "TimeZone" ],
				"address": [ "city" ],
				"company": [ "sortKey", "reconciliationAccount", "cashManagmentGroup", "paymentMethod" ],
				"sales": [ "district", "currency", "accountAssignmentGroup", "termsOfPayment", "pricingProcedure", "incoterm1" ],
				"customerGroup": [ "0", "statisticsGroup" ],
				"delivery": [ "shippingCondition" ],
			};
			let customerModel = event.getSource().getModel("customer");
			let emptyFields = Object.entries(customerMandatoryFields).reduce((result, [section, fields]) => {
				const sectionData = customerModel.getProperty(`/${section}`) || {};
				const empty = fields.filter(field => !sectionData[field]);
				if (empty.length > 0) {
					result[section] = empty;
				}
				return result;
			}, {});
			return emptyFields;
		},

		onValidate: function(event) {
			let emptyMandatoryFields = this._getEmptyMandatoryFields(event);
			if (Object.keys(emptyMandatoryFields).length > 0) {
				// TODO empty mandatory fields
				return;
			}
		},

		onSubmit: function(event) {
			let emptyMandatoryFields = this._getEmptyMandatoryFields(event);
			if (Object.keys(emptyMandatoryFields).length > 0) {
				// TODO empty mandatory fields
				return;
			}
		},
    });
});