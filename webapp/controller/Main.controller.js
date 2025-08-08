sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter"
], (BaseController, JSONModel, Filter) => {
    "use strict";

	const GWD_C_FORM_UI5 = 'GWD_C_FORM_UI5';

    return BaseController.extend("beamsuntoryinc.createcustomerform.controller.Main", {
        onInit: function () {
			this._initializeModels();
		},

		read: function() {
			let model = this.getOwnerComponent().getModel("GWD_C_FORM_UI5");
			let entity = "/ZFA1_BUS_ACC_GRPSet";

			model.read(entity, {
				success: function(oData) {
					console.log("Datos leídos:", oData.results);
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

		_loadAndFilterModelFromOData: function (modelName, entity, filteredModelName, fieldName, value) {
			let model = this.getOwnerComponent().getModel(modelName);
			model.read(`/${entity}`, {
				success: function(data) {
					this.getView().setModel(new JSONModel(data.results), entity);
					let filteredData = data.results.filter( item => item[fieldName] === value );
					this.getView().setModel(new JSONModel(filteredData), filteredModelName);
				}.bind(this),
				error: function(error) {
					this.getView().setModel(new JSONModel([]), entity);
					this.getView().setModel(new JSONModel([]), filteredModelName);
				}
			});
		},

		_loadModelFromOData2: function(entity, filters) {
			let model = this.getModel(GWD_C_FORM_UI5);
			return new Promise((resolve, reject) => {
				model.read(`/${entity}`, {
				  filters: filters,
				  success: (data) => resolve(data.results),
				  error: (error) => reject(error)
				});
			});
		},

		_loadModelFromOData: function (modelName, entity, filters) {
			let model = this.getOwnerComponent().getModel(modelName);
			model.read(`/${entity}`, {
				filters: filters,
				success: function(data) {
					this.getView().setModel(new JSONModel(data.results), modelName);
				}.bind(this),
				error: function(error) {
					this.getView().setModel(new JSONModel([]), modelName);
				}
			});
		},

		_initializeModels: function () {
			this.getView().setModel(new JSONModel([]), "transportationZones");
			this.getView().setModel(new JSONModel([]), "regions");
			this.getView().setModel(new JSONModel([]), "paymentMethods");
			this.getView().setModel(new JSONModel([]), "salesGroups");

			this._loadModelFromJSONFile("customer", "model/customer.json");
			this._loadModelFromJSONFile("view", "model/view.json");
			this._loadModelFromJSONFile("taxInformation", "model/data/taxInformations.json");
			this._loadModelFromJSONFile("taxClasifications", "model/data/taxClassifications.json");
			this._loadModelFromJSONFile("contactTypes", "model/data/contactTypes.json");
			this._loadModelFromJSONFile("distributtionChannels", "model/data/distributtionChannels.json");
			this._loadModelFromJSONFile("divisions", "model/data/divisions.json");
			this._loadModelFromJSONFile("paymentTerms", "model/data/paymentTerms.json");
			this._loadModelFromJSONFile("accountAssignmentGroups", "model/data/accountAssignmentGroups.json");
			this._loadModelFromJSONFile("hierarchyTypes", "model/data/hierarchyTypes.json");
			this._loadModelFromJSONFile("pricingProcedures", "model/data/pricingProcedures.json");
			this._loadModelFromJSONFile("customerClassifications", "model/data/customerClassifications.json");
			this._loadModelFromJSONFile("customerStatisticsGroups", "model/data/customerStatisticsGroups.json");
			this._loadModelFromJSONFile("timeZones", "model/data/timeZones.json");
			this._loadModelFromJSONFile("reconciliationAccounts", "model/data/reconciliationAccounts.json");
			this._loadModelFromJSONFile("sortKeys", "model/data/sortKeys.json");
			this._loadModelFromJSONFile("toleranceGroups", "model/data/toleranceGroups.json");
		},

		_toggleVisibility: function (property) {
			let model = this.getModel("view");
			let visible = model.getProperty(property);
			model.setProperty(property, !visible);
		},

		_showsField: function (fieldName, limit) {
			let model = this.getModel("view");
			for (let index = 2; index <= limit; index++) {
				let visible = model.getProperty(`/show/${fieldName}${index}`);
				if (!visible) {
					model.setProperty(`/show/${fieldName}${index}`, true);
					return;
				}
			}
		},

		_initializeODataModels: async function(params) {
			let initialCustomer = this.getModel("customer").getData();
			let country = initialCustomer.general.country;
			let distributtionChannel = initialCustomer.main.distributtionChannel;
			let salesOrganization = initialCustomer.main.salesOrganization;
			let division = initialCustomer.main.division;
			let language = initialCustomer.general.language;

			sap.ui.core.BusyIndicator.show(0);
			try {
				const [
					transportationZones,
					regions,
					paymentMethods,
					salesGroups,
					salesOffices,
					customerGroups,
					customerGroups1,
					customerGroups2,
					customerGroups3,
					customerGroups4,
					hierarchiesA1,
					hierarchiesA2,
					hierarchiesA3,
					hierarchiesA4,
					hierarchiesB1,
					hierarchiesB2,
					hierarchiesB3,
					hierarchiesB4,
					hierarchiesB5,
					hierarchiesB6,
				] = await Promise.all([
					this._loadModelFromOData2("ZFA1_TZoneSet", [ //transportationZones
						new Filter("Land1", "EQ", country)
					]),
					this._loadModelFromOData2("ZFA1_RegionSet", [ //regions
						new Filter("LAND1", "EQ", country)
					]),
					this._loadModelFromOData2("ZFA1_PayMethSet", [ //paymentMethods
						new Filter("LAND1", "EQ", country)
					]),
					this._loadModelFromOData2("ZFA1_BRCUSGRP1Set", [ //salesGroups
						new Filter("Vtweg", "EQ", distributtionChannel),
						new Filter("Vkorg", "EQ", salesOrganization),
						new Filter("Spart", "EQ", division),
					]),
					this._loadModelFromOData2("ZFA1_VKBURSet", []), //salesOffices
					this._loadModelFromOData2("ZFA1_BRCUSCGRPSet", [ //customerGroups
						new Filter("Vtweg", "EQ", distributtionChannel),
						new Filter("Vkorg", "EQ", salesOrganization),
						new Filter("Spart", "EQ", division)
					]),
					this._loadModelFromOData2("ZFA1_BRCUSGRP1Set", [ //customerGroups1
						new Filter("Vtweg", "EQ", distributtionChannel),
						new Filter("Vkorg", "EQ", salesOrganization),
						new Filter("Spart", "EQ", division)
					]),
					this._loadModelFromOData2("ZFA1_BRCUSGRP2Set", [ //customerGroups2
						new Filter("Vtweg", "EQ", distributtionChannel),
						new Filter("Vkorg", "EQ", salesOrganization),
						new Filter("Spart", "EQ", division)
					]),
					this._loadModelFromOData2("ZFA1_BRCUSGRP3Set", [ //customerGroups3
						new Filter("Vtweg", "EQ", distributtionChannel),
						new Filter("Vkorg", "EQ", salesOrganization),
						new Filter("Spart", "EQ", division)
					]),
					this._loadModelFromOData2("ZFA1_BRCUSGRP4Set", [ //customerGroups4
						new Filter("Vtweg", "EQ", distributtionChannel),
						new Filter("Vkorg", "EQ", salesOrganization),
						new Filter("Spart", "EQ", division)
					]),
					this._loadModelFromOData2("ZFA1_HIER1Set", [ //hierarchiesA1
						new Filter("Vtweg", "EQ", distributtionChannel),
						new Filter("Vkorg", "EQ", salesOrganization),
						new Filter("Spart", "EQ", division)
					]),
					this._loadModelFromOData2("ZFA1_HIER2Set", [ //hierarchiesA2
						new Filter("Spart", "EQ", division)
					]),
					this._loadModelFromOData2("ZFA1_HIER3Set", [ //hierarchiesA3
						new Filter("Spart", "EQ", division)
					]),
					this._loadModelFromOData2("ZFA1_HIER4Set", [ //hierarchiesA4
						new Filter("Spart", "EQ", division)
					]),
					this._loadModelFromOData2("ZFA1_HIERB1Set", [ //hierarchiesB1
						new Filter("Spart", "EQ", division)
					]),
					this._loadModelFromOData2("ZFA1_HIERB2Set", [ //hierarchiesB2
						new Filter("Spart", "EQ", division)
					]),
					this._loadModelFromOData2("ZFA1_HIERB3Set", [ //hierarchiesB3
						new Filter("Spart", "EQ", division)
					]),
					this._loadModelFromOData2("ZFA1_HIERB4Set", [ //hierarchiesB4
						new Filter("Spart", "EQ", division)
					]),
					this._loadModelFromOData2("ZFA1_HIERB5Set", [ //hierarchiesB5
						new Filter("Spart", "EQ", division)
					]),
					this._loadModelFromOData2("ZFA1_HIERB6Set", [ //hierarchiesB6
						new Filter("Spart", "EQ", division)
					]),
				]);

				this.setModel(new JSONModel(transportationZones), "transportationZones");
				this.setModel(new JSONModel(regions), "regions");
				this.setModel(new JSONModel(paymentMethods), "paymentMethods");
				this.setModel(new JSONModel(salesGroups), "salesGroups");
				this.setModel(new JSONModel(salesOffices), "salesOffices");
				this.setModel(new JSONModel(customerGroups), "customerGroups");
				this.setModel(new JSONModel(customerGroups1), "customerGroups1");
				this.setModel(new JSONModel(customerGroups2), "customerGroups2");
				this.setModel(new JSONModel(customerGroups3), "customerGroups3");
				this.setModel(new JSONModel(customerGroups4), "customerGroups4");
				this.setModel(new JSONModel(hierarchiesA1), "hierarchiesA1");
				this.setModel(new JSONModel(hierarchiesA2), "hierarchiesA2");
				this.setModel(new JSONModel(hierarchiesA3), "hierarchiesA3");
				this.setModel(new JSONModel(hierarchiesA4), "hierarchiesA4");
				this.setModel(new JSONModel(hierarchiesB1), "hierarchiesB1");
				this.setModel(new JSONModel(hierarchiesB2), "hierarchiesB2");
				this.setModel(new JSONModel(hierarchiesB3), "hierarchiesB3");
				this.setModel(new JSONModel(hierarchiesB4), "hierarchiesB4");
				this.setModel(new JSONModel(hierarchiesB5), "hierarchiesB5");
				this.setModel(new JSONModel(hierarchiesB6), "hierarchiesB6");
			  } catch (error) {
				let foo = error;
				// MessageBox.error("Error loading data: " + error.message);
			  } finally {
				sap.ui.core.BusyIndicator.hide();
			  }
		},

		onChangeMain: async function (event) {
			let view = this.getModel("view");
			let customer = this.getModel("customer");
			let mainFields = customer.getProperty("/main");
			if (!mainFields.accountGroup ||
				!mainFields.companyCode ||
				!mainFields.salesOrganization ||
				!mainFields.distributtionChannel ||
				!mainFields.division ||
				!mainFields.taxNumber ||
				!mainFields.vatRegistrationNumber) {
				view.setProperty("/enabled/secondary", false);
				return;
			}
			await this._initializeODataModels();
			view.setProperty("/enabled/secondary", true);
		},

		onChangeCountry: async function (event) {
			let country = event.getParameter("selectedItem").getKey();
			let customer = this.getModel("customer");
			customer.setProperty("/general/transportationZone", "");
			customer.setProperty("/address/region", "");
			customer.setProperty("/company/paymentMethod", "");

			sap.ui.core.BusyIndicator.show(0);
			try {
				const [
					transportationZones,
					regions,
					paymentMethods,
				] = await Promise.all([
					this._loadModelFromOData2("ZFA1_TZoneSet", [
						new Filter("Land1", "EQ", country)
					]),
					this._loadModelFromOData2("ZFA1_RegionSet", [
						new Filter("LAND1", "EQ", country)
					]),
					this._loadModelFromOData2("ZFA1_PayMethSet", [
						new Filter("LAND1", "EQ", country)
					]),
				]);

				this.setModel(new JSONModel(transportationZones), "transportationZones");
				this.setModel(new JSONModel(regions), "regions");
				this.setModel(new JSONModel(paymentMethods), "paymentMethods");
			  } catch (error) {
				let foo = error;
				// MessageBox.error("Error loading data: " + error.message);
			  } finally {
				sap.ui.core.BusyIndicator.hide();
			  }
		},

		onChangeDistributtionChannel: function (event) {
			let selectedKey = event.getParameter("selectedItem").getKey();
			let customer = this.getModel("customer");
			let salesOrganization = customer.getProperty("/main/salesOrganization");
			let division = customer.getProperty("/main/division");
			customer.setProperty("/sales/group", "");

			if (salesOrganization && division) {

			}

			this.onChangeMain(event);
		},

		onChangeLanguage: function (event) {
			let selectedKey = event.getParameter("selectedItem").getKey();
			let customer = this.getModel("customer");
			customer.setProperty("/sales/salesOffice", "");

			// this._filterModel("ZFA1_VKBURSet", "salesGroups", [{ fieldName:"Spras", value: selectedKey }]);
			// this._filterModel("salesOffices", "salesOfficesByLanguage", [{ fieldName:"Spras", value: selectedKey }]);
		},

		onChangeSalesDistrict: function (event) {
			// let selectedKey = event.getParameter("selectedItem").getKey();
			// let customer = this.getModel("customer");
			// let distributtionChannel = customer.getProperty("/main/distributtionChannel");
			// customer.setProperty("/sales/group", "");

			// this._filterModel(
			// 	"ZFA1_BRCUSGRP1Set", "salesOffice", "Vtweg", distributtionChannel, "Vkorg", selectedKey);
		},

		onChangeSalesOrganization: function (event) {
			let selectedKey = event.getParameter("selectedItem").getKey();
			let customer = this.getModel("customer");
			let distributtionChannel = customer.getProperty("/main/distributtionChannel");
			let division = customer.getProperty("/main/division");
			customer.setProperty("/sales/group", "");
			// if (distributtionChannel && division) {
			// 	this._filterModel(
			// 		"ZFA1_BRCUSGRP1Set", "salesGroups",
			// 		[
			// 			{ fieldName: "Vtweg", value: distributtionChannel },
			// 			{ fieldName: "Vkorg", value: selectedKey },
			// 			{ fieldName: "Spart", value: division }
			// 		]);
			// 	this._filterModel(
			// 		"ZFA1_BRCUSCGRPSet", "customerGroups",
			// 		[
			// 			{ fieldName: "Vtweg", value: distributtionChannel },
			// 			{ fieldName: "Vkorg", value: selectedKey },
			// 			{ fieldName: "Spart", value: division }
			// 		]);
			// 	this._filterModel(
			// 		"ZFA1_HIER1Set", "hierarchiesA1",
			// 		[
			// 			{ fieldName: "Vtweg", value: distributtionChannel },
			// 			{ fieldName: "Vkorg", value: selectedKey },
			// 			{ fieldName: "Spart", value: division }
			// 		]
			// 	);
			// }

			this.onChangeMain(event);
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
			let model = this.getModel("view");
			if(!model.getProperty("/enabled/secondary")) {
				return;
			}
			this._showsField("name", 4);
		},

		onHideName: function (event, param) {
			let model = this.getModel("view");
			if(!model.getProperty("/enabled/secondary")) {
				return;
			}
			model.setProperty(`/show/name${param}`, false);
		},

		onShowTelephone: function (event) {
			let model = this.getModel("view");
			if(!model.getProperty("/enabled/secondary")) {
				return;
			}
			this._showsField("telephone", 5);
		},

		onHideTelephone: function (event, param) {
			let model = this.getModel("view");
			if(!model.getProperty("/enabled/secondary")) {
				return;
			}
			model.setProperty(`/show/telephone${param}`, false);
		},

		onShowFax: function (event) {
			let model = this.getModel("view");
			if(!model.getProperty("/enabled/secondary")) {
				return;
			}
			this._showsField("fax", 5);
		},

		onHideFax: function (event, param) {
			let model = this.getModel("view");
			if(!model.getProperty("/enabled/secondary")) {
				return;
			}
			model.setProperty(`/show/fax${param}`, false);
		},

		onShowEmail: function (event) {
			let model = this.getModel("view");
			if(!model.getProperty("/enabled/secondary")) {
				return;
			}
			this._showsField("email", 5);
		},

		onHideEmail: function (event, param) {
			let model = this.getModel("view");
			if(!model.getProperty("/enabled/secondary")) {
				return;
			}
			model.setProperty(`/show/email${param}`, false);
		},

		onShowStreet: function (event) {
			let model = this.getModel("view");
			if(!model.getProperty("/enabled/secondary")) {
				return;
			}
			this._showsField("street", 5);
		},

		onHideStreet: function (event, param) {
			let model = this.getModel("view");
			if(!model.getProperty("/enabled/secondary")) {
				return;
			}
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