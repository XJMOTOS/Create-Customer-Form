sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/m/MessageBox",
	"../model/submit"
], (BaseController, JSONModel, Filter, MessageBox, submit) => {
    "use strict";

	const GWD_C_FORM_UI5 = 'GWD_C_FORM_UI5';

    return BaseController.extend("beamsuntoryinc.createcustomerform.controller.Main", {
        onInit: function () {
			this._initializeModels();
		},

		read: function () {
			let model = this.getOwnerComponent().getModel("GWD_C_FORM_UI5");
			let entity = "/ZFA1_BUS_ACC_GRPSet";

			model.read(entity, {
				success: function (oData) {
					console.log("Datos leídos:", oData.results);
				},
				error: function (oError) {
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
				success: function (data) {
					this.getView().setModel(new JSONModel(data.results), entity);
					let filteredData = data.results.filter( item => item[fieldName] === value );
					this.getView().setModel(new JSONModel(filteredData), filteredModelName);
				}.bind(this),
				error: function (error) {
					this.getView().setModel(new JSONModel([]), entity);
					this.getView().setModel(new JSONModel([]), filteredModelName);
				}
			});
		},

		_loadModelFromOData: function (entity, filters) {
			let model = this.getModel(GWD_C_FORM_UI5);
			return new Promise((resolve, reject) => {
				model.read(`/${entity}`, {
				  filters: filters,
				  success: (data) => resolve(data.results),
				  error: (error) => reject(error)
				});
			});
		},

		_initializeModels: function () {
			this.getView().setModel(new JSONModel([]), "transportationZones");
			this.getView().setModel(new JSONModel([]), "regions");
			this.getView().setModel(new JSONModel([]), "paymentMethods");
			this.getView().setModel(new JSONModel([]), "salesGroups");
			this.getView().setModel(new JSONModel([]), "countries");
			this.getView().setModel(new JSONModel([]), "filteredCountries");
			this.getView().setModel(new JSONModel([]), "salesDistricts");
			this.getView().setModel(new JSONModel([]), "filteredSalesDistricts");
			this.getView().setModel(new JSONModel([]), "deliveryPriorities");

			this._loadModelFromJSONFile("customer", "model/customer.json");
			this._loadModelFromJSONFile("existingCustomer", "model/existingCustomer.json");
			this._loadModelFromJSONFile("view", "model/view.json");
			this._loadModelFromJSONFile("taxInformations", "model/data/taxInformations.json");
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
			this._loadModelFromJSONFile("deliveryPriorities", "model/data/deliveryPriorities.json");
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

		_getCountryFilterODataCalls: function(country) {
			let filters1 = [new Filter("Land1", "EQ", country)];
			let filters2 = [new Filter("LAND1", "EQ", country)];
			return [{
					key:"Zone1",
					modelName: "transportationZones",
					promise: this._loadModelFromOData("ZFA1_TZoneSet", filters1)
				}, {
					key:"BLAND",
					modelName: "regions",
					promise: this._loadModelFromOData("ZFA1_RegionSet", filters2)
				}, {
					key:"ZLSCH",
					modelName: "paymentMethods",
					promise: this._loadModelFromOData("ZFA1_PayMethSet", filters2)
				}];
		},

		_getDivisionFilterODataCalls: function(division) {
			let filters = [new Filter("Spart", "EQ", division)];
			return [{
					key:"Kunnr",
					modelName: "hierarchiesA2",
					promise: this._loadModelFromOData("ZFA1_HIER2Set", filters)
				}, {
					key:"Kunnr",
					modelName: "hierarchiesA3",
					promise: this._loadModelFromOData("ZFA1_HIER3Set", filters)
				}, {
					key:"Kunnr",
					modelName: "hierarchiesA4",
					promise: this._loadModelFromOData("ZFA1_HIER4Set", filters)
				}, {
					key:"Kunnr",
					modelName: "hierarchiesB1",
					promise: this._loadModelFromOData("ZFA1_HIERB1Set", filters)
				}, {
					key:"Kunnr",
					modelName: "hierarchiesB2",
					promise: this._loadModelFromOData("ZFA1_HIERB2Set", filters)
				}, {
					key:"Kunnr",
					modelName: "hierarchiesB3",
					promise: this._loadModelFromOData("ZFA1_HIERB3Set", filters)
				}, {
					key:"Kunnr",
					modelName: "hierarchiesB4",
					promise: this._loadModelFromOData("ZFA1_HIERB4Set", filters)
				}, {
					key:"Kunnr",
					modelName: "hierarchiesB5",
					promise: this._loadModelFromOData("ZFA1_HIERB5Set", filters)
				}, {
					key:"Kunnr",
					modelName: "hierarchiesB6",
					promise: this._loadModelFromOData("ZFA1_HIERB6Set", filters)
				}];
		},

		_getSalesStructureFilterODataCalls: function(distributtionChannel, salesOrganization, division) {
			let filters = [
				new Filter("Vkorg", "EQ", salesOrganization),
				new Filter("Vtweg", "EQ", distributtionChannel),
				new Filter("Spart", "EQ", division)
			];
		  
			return [{
					key:"Kvgr1",
					modelName: "salesGroups",
					promise: this._loadModelFromOData("ZFA1_BRCUSGRP1Set", filters)
				}, {
					key:"Kdgrp",
					modelName: "customerGroups",
					promise: this._loadModelFromOData("ZFA1_BRCUSCGRPSet", filters)
				}, {
					key:"Kvgr1",
					modelName: "customerGroups1",
					promise: this._loadModelFromOData("ZFA1_BRCUSGRP1Set", filters)
				}, {
					key:"Kvgr2",
					modelName: "customerGroups2",
					promise: this._loadModelFromOData("ZFA1_BRCUSGRP2Set", filters)
				}, {
					key:"Kvgr2",
					modelName: "customerGroups3",
					promise: this._loadModelFromOData("ZFA1_BRCUSGRP3Set", filters)
				}, {
					key:"Kvgr4",
					modelName: "customerGroups4",
					promise: this._loadModelFromOData("ZFA1_BRCUSGRP4Set", filters)
				}, {
					key:"Kunnr",
					modelName: "hierarchiesA1",
					promise: this._loadModelFromOData("ZFA1_HIER1Set", filters)
				}];
		},

		_initializeODataModels: async function (hasCountryFilter, hasDivisionFilter, hasSalesStructureFilter) {
			let initialCustomer = this.getModel("customer").getData();
			let country = initialCustomer.general.countryKey;
			let distributtionChannel = initialCustomer.main.distributtionChannel;
			let salesOrganization = initialCustomer.main.salesOrganization;
			let division = initialCustomer.main.division;
			let tasks = [];

			sap.ui.core.BusyIndicator.show(0);
			if (hasCountryFilter && hasDivisionFilter && hasSalesStructureFilter) {
				tasks = [{
					key: "Vkbur",
					modelName: "salesOffices",
					promise: this._loadModelFromOData("ZFA1_VKBURSet", [])
				}, {
					key:"LAND1",
					modelName: "countries",
					promise: this._loadModelFromOData("ZFA1_CountrySet", [])
				}, {
					key:"BZIRK",
					modelName: "salesDistricts",
					promise: this._loadModelFromOData("ZFA1_SalesDistrictSet", [])
				}];
			}

			if (hasCountryFilter) {
				tasks.push(...this._getCountryFilterODataCalls(country));
			}
			if (hasDivisionFilter) {
				tasks.push(...this._getDivisionFilterODataCalls(division));
			}			
			if (hasSalesStructureFilter) {
				tasks.push(...this._getSalesStructureFilterODataCalls(
					distributtionChannel, salesOrganization, division));
			}

			await Promise
				.all(tasks.map(task => task.promise))
				.then(function(values) {
					values.forEach((data, index) => {
						let task = tasks[index];
						if(data.length && (data[0][task.key] !== "" || data.at(-1)[task.key] !== "")) {
							let emptyData = Object.fromEntries(Object.keys(data[0]).map(key => [key, ""]));
							data.unshift(emptyData);
						}
						this.setModel(new JSONModel(data), task.modelName);
					});
					if (hasCountryFilter && hasDivisionFilter && hasSalesStructureFilter) {
						this.setModel(new JSONModel(values[1]), "filteredCountries");
						this.setModel(new JSONModel(values[2]), "filteredSalesDistricts");
					}
				}.bind(this))
				.catch((error => MessageBox.error("Error loading data: " + error.message)))
				.finally(() => sap.ui.core.BusyIndicator.hide());
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
				view.setProperty("/enabled/validate", false);
				return;
			}
			await this._initializeODataModels(true, true, true);
			view.setProperty("/enabled/secondary", true);
			this.onToggleValidationButton();
		},


		onChangeDivision: function (event) {
			let enabledApp = this.getModel("view").getProperty("/enabled/secondary");
			if (enabledApp) {
				this._initializeODataModels(false, true, true);
				this.onToggleValidationButton();

				let customer = this.getModel("customer");
				customer.setProperty("/hierarchy/a2", "");
				customer.setProperty("/hierarchy/a3", "");
				customer.setProperty("/hierarchy/a4", "");
				customer.setProperty("/hierarchy/b1", "");
				customer.setProperty("/hierarchy/b2", "");
				customer.setProperty("/hierarchy/b3", "");
				customer.setProperty("/hierarchy/b4", "");
				customer.setProperty("/hierarchy/b5", "");
				customer.setProperty("/hierarchy/b6", "");
			} else {
				this.onChangeMain();
			}
		},

		onChangeSalesStructure: function (event) {
			let enabledApp = this.getModel("view").getProperty("/enabled/secondary");
			if (enabledApp) {
				this._initializeODataModels(false, false, true);
				this.onToggleValidationButton();

				let customer = this.getModel("customer");
				customer.setProperty("/sales/group", "");
				customer.setProperty("/customerGroup/0", "");
				customer.setProperty("/customerGroup/1", "");
				customer.setProperty("/customerGroup/2", "");
				customer.setProperty("/customerGroup/3", "");
				customer.setProperty("/customerGroup/4", "");
				customer.setProperty("/hierarchy/a1", "");
				customer.setProperty("/hierarchy/a2", "");
				customer.setProperty("/hierarchy/a3", "");
				customer.setProperty("/hierarchy/a4", "");
				customer.setProperty("/hierarchy/b1", "");
				customer.setProperty("/hierarchy/b2", "");
				customer.setProperty("/hierarchy/b3", "");
				customer.setProperty("/hierarchy/b4", "");
				customer.setProperty("/hierarchy/b5", "");
				customer.setProperty("/hierarchy/b6", "");
			} else {
				this.onChangeMain();
			}
			this.onToggleValidationButton();
		},

		onChangeTaxNumber: function (event) {
			let taxNumber = event.getParameter("newValue") ;
			let view = this.getModel("view");
			if(taxNumber === "123456") {
				let existingCustomer = this.getModel("existingCustomer").getData();
				this.getModel("customer").setData(existingCustomer);
				MessageBox.information("Customer already exists");
				view.setProperty("/enabled/existing", true);
				return;
			}
			view.setProperty("/enabled/existing", false);
			this.onChangeMain(event);
		},
		
		onChangeVatRegistrationNumber: function (event) {
			let vatRegistrationNumber = event.getParameter("newValue");
			let view = this.getModel("view");
			if(vatRegistrationNumber === "123456") {
				let existingCustomer = this.getModel("existingCustomer").getData();
				this.getModel("customer").setData(existingCustomer);
				MessageBox.information("Customer already exists");
				view.setProperty("/enabled/existing", true);
				return;
			}
			view.setProperty("/enabled/existing", false);
			this.onChangeMain(event);
		},

		onLiveChangeCountry: function (event) {
			let input = event.getParameter("newValue");
			let value = input.toUpperCase();
			let customer = this.getModel("customer");
			let countries = this.getModel("countries").getData();
			let filteredCountries = 
				countries.filter( country => country.LANDX.toUpperCase().includes(value) || country.LAND1.toUpperCase().includes(value));
			this.setModel(new JSONModel(filteredCountries), "filteredCountries");
			customer.setProperty("/general/countryText", input);
			if(input === "") {
				customer.setProperty("/general/countryKey", "");
				this.getModel("view").setProperty("/enabled/validate", false);
			}
		},

		onSelectCountry: function (event) {
			let selectedKey = event.getParameter("selectedItem").getKey();
			let selectedText = event.getParameter("selectedItem").getText();
			let customer = this.getModel("customer");
			customer.setProperty("/general/countryKey", selectedKey);
			customer.setProperty("/general/countryText", selectedText);
			customer.setProperty("/general/transportationZone", "");
			customer.setProperty("/address/region", "");
			customer.setProperty("/company/paymentMethod", "");
			
			this._initializeODataModels(true, false, false);
			this.onToggleValidationButton();
		},

		onLiveSalesDistrict: function (event) {
			let input = event.getParameter("newValue");
			let value = input.toUpperCase();
			let customer = this.getModel("customer");
			let salesDistricts = this.getModel("salesDistricts").getData();
			let filteredSalesDistricts = 
				salesDistricts.filter( salesDistrict => salesDistrict.BZIRK.toUpperCase().includes(value) || salesDistrict.BZTXT.toUpperCase().includes(input));
			this.setModel(new JSONModel(filteredSalesDistricts), "filteredSalesDistricts");
			customer.setProperty("/sales/districtText", input);
			if(input === "") {
				customer.setProperty("/sales/districtKey", "");
				this.getModel("view").setProperty("/enabled/validate", false);
			}
		},

		onSelectSalesDistricts: function (event) {
			let selectedKey = event.getParameter("selectedItem").getKey();
			let selectedText = event.getParameter("selectedItem").getText();
			let customer = this.getModel("customer");
			customer.setProperty("/sales/districtKey", selectedKey);
			customer.setProperty("/sales/districtText", selectedText);
			this.onToggleValidationButton();
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

		_hasEmptyMandatoryFields: function (event) {
			let customerMandatoryFields = {
				"main": [ "accountGroup", "companyCode", "salesOrganization", "distributtionChannel", "division", "taxNumber", "vatRegistrationNumber" ],
				"general": [ "name1", "countryKey", "searchTerm", "language", "transportationZone", "industryKey", "timeZone" ],
				"address": [ "city" ],
				"company": [ "sortKey", "reconciliationAccount", "cashManagmentGroup", "paymentMethod" ],
				"sales": [ "districtKey", "currency", "accountAssignmentGroup", "termsOfPayment", "pricingProcedure", "incoterm1" ],
				"customerGroup": [ "0", "statisticsGroup" ],
				"delivery": [ "shippingCondition" ],
			};
			let customerModel = this.getModel("customer");
			let hasEmptyMandatoryFields = Object
				.entries(customerMandatoryFields)
				.reduce(function(result, [section, fields]) {
					if (result) {
						return result;
					}
					let sectionData = customerModel.getProperty(`/${section}`) || {};
					let emptyMandatoryField = fields.find(field => !sectionData[field]);
					return !!emptyMandatoryField;
				}.bind(this), false);
			return hasEmptyMandatoryFields;
		},

		onToggleValidationButton: function () {
			let disabled = this._hasEmptyMandatoryFields();
			this.getModel("view").setProperty("/enabled/validate", !disabled);	
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



		onValidate: function (event) {
			// TODO empty mandatory fields
		},

		onSubmit: function (event) {
			// TODO empty mandatory fields
			let customer = this.getModel("customer").getData();
			let taxInformations = this.getModel("taxInformations").getData();
			submit.postCustomerData(customer, taxInformations);
		},
    });
});