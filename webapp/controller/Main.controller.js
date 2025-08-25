sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/m/MessageBox",
	"sap/ui/core/message/MessageType",
	"sap/ui/core/Fragment",
	"sap/m/MessagePopover",
	"sap/m/MessageItem",
	"../model/submit",
	"../model/validate"
], (BaseController, JSONModel, Filter, MessageBox, MessageType, Fragment, MessagePopover, MessageItem,
	submit, validate) => {
    "use strict";

	const GWD_C_FORM_UI5 = 'GWD_C_FORM_UI5';
	const GWD_BPA_UI5 = 'GWD_BPA_UI5';

    return BaseController.extend("beamsuntoryinc.createcustomerform.controller.Main", {
		hierarchyDialog: null,
		errorsDialog: null,
		existingCustomersDialog: null,

        onInit: function () {
			this._initializeModels();

			this.errorsDialog = new MessagePopover({
				items: {
					path: "errors>/",
					template: new MessageItem({
						title: "{errors>message}",
						type: MessageType.Error,
						subtitle:"{errors>propertyref}"
					}),
				}
			});
			this.getView().addDependent(this.errorsDialog);
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
			this.getView().setModel(new JSONModel([]), "filteredPhonePrefix");
			this.getView().setModel(new JSONModel([]), "errors");

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
			this._loadModelFromJSONFile("phonePrefix", "model/data/phonePrefix.json");
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
					modelName: "hierarchies",
					promise: this._loadModelFromOData("ZFA1_HIERARCHY_TYPE_ASet", filters)
				}];
		},

		_initializeODataModels: async function (hasCountryFilter, hasSalesStructureFilter) {
			let initialCustomer = this.getModel("customer").getData();
			let country = initialCustomer.general.countryKey;
			let distributtionChannel = initialCustomer.main.distributtionChannel;
			let salesOrganization = initialCustomer.main.salesOrganization;
			let division = initialCustomer.main.division;
			let tasks = [];

			sap.ui.core.BusyIndicator.show(0);
			if (hasCountryFilter && hasSalesStructureFilter) {
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
			if (hasSalesStructureFilter) {
				tasks.push(...this._getSalesStructureFilterODataCalls(
					distributtionChannel, salesOrganization, division));
			}

			await Promise
				.all(tasks.map(task => task.promise))
				.then(function(values) {
					values.forEach((data, index) => this.setModel(new JSONModel(data), tasks[index].modelName));
					if (hasCountryFilter && hasSalesStructureFilter) {
						this.setModel(new JSONModel(values[1]), "filteredCountries");
						this.setModel(new JSONModel(values[2]), "filteredSalesDistricts");
					}
				}.bind(this))
				.catch((error => MessageBox.error("Error loading data: " + error.message)))
				.finally(() => sap.ui.core.BusyIndicator.hide());
		},

		_getExistingCustomers: function(taxNumber, vatRegistrationNumber) {
			let model = this.getModel(GWD_BPA_UI5);
			let filters = [
				new Filter("Stcd1", "EQ", taxNumber),
				new Filter("Stceg", "EQ", vatRegistrationNumber)
			];

			return new Promise((resolve, reject) => {
				model.read("/GetCustomerSet", {
					filters: filters,
					success: (data) => resolve(data.results),
					error: (error) => reject(error)
				});
			});
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
				!mainFields.vatRegistrationNumber
			) {
				view.setProperty("/enabled/secondary", false);
				view.setProperty("/enabled/validate", false);
				view.setProperty("/enabled/submit", false);
				return;
			}
			await this._initializeODataModels(true, true);
			view.setProperty("/enabled/secondary", true);
			this.onToggleValidationButton();
		},

		onChangeSalesStructure: function (event) {
			let enabledApp = this.getModel("view").getProperty("/enabled/secondary");
			if (enabledApp) {
				this._initializeODataModels(false, true);
				this.onToggleValidationButton();

				let customer = this.getModel("customer");
				customer.setProperty("/sales/group", "");
				customer.setProperty("/customerGroup/0", "");
				customer.setProperty("/customerGroup/1", "");
				customer.setProperty("/customerGroup/2", "");
				customer.setProperty("/customerGroup/3", "");
				customer.setProperty("/customerGroup/4", "");
				customer.setProperty("/hierarchy/a1Key", "");
				customer.setProperty("/hierarchy/a1Text", "");
				customer.setProperty("/hierarchy/a2Key", "");
				customer.setProperty("/hierarchy/a2Text", "");
				customer.setProperty("/hierarchy/a3Key", "");
				customer.setProperty("/hierarchy/a3Text", "");
				customer.setProperty("/hierarchy/a4Key", "");
				customer.setProperty("/hierarchy/a4Text", "");
			} else {
				this.onChangeMain(event);
			}
			this.onToggleValidationButton();
		},

		_onCustomerExists: function() {
			MessageBox.information(this.getText("messageCustomerExists"), {
				actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
				onClose: function (action) {
					let customer = this.getModel("customer");
					if (action === MessageBox.Action.OK) {
						let existingCustomer = this.getModel("existingCustomer").getData();
						customer.setData(existingCustomer);
					} else {
						customer.setProperty("/main/taxNumber", "");
						customer.setProperty("/main/vatRegistrationNumber", "");
					}
				}.bind(this),
				dependentOn: this.getView()
			});
			view.setProperty("/enabled/existing", true);
		},

		// _mapExistingCustomers: function(customers) {
		// 	return customers.map(customer => {
		// 		return {
		// 			Aufsd: customer.Aufsd,
		// 			Cassd: customer.Cassd,
		// 			Faksd: customer.Faksd,
		// 			Kunnr: customer.Kunnr, //Customer
		// 			Land1: customer.Land1,
		// 			Loevm: customer.Loevm,
		// 			Mcod1: customer.Mcod1,
		// 			Nodel: customer.Nodel,
		// 			Sperr: customer.Sperr, //Posting Block
		// 			Sperz: customer.Sperz,
		// 			Regio: customer.Regio,
		// 			main: {
		// 				companyCode: customer.Bukrs,
		// 				taxNumber: customer.Stcd1,
		// 				vatRegistrationNumber: customer.Stceg,
		// 				salesOrganization: customer.Vkorg,
		// 				distributtionChannel: customer.Vtweg,
		// 				division: customer.Spart,
		// 			},
		// 			general: {
		// 				name1: customer.Name1,
		// 			},
		// 			taxDetails: {
		// 				warehouseExciseNumber: customer.Stcd3,
		// 			},
		// 			delivery: {
		// 				deliveryBlock: customer.Lifsd,
		// 			},
					
		// 		};
		// 	})
		// },

		_openDialog: function(dialog, name) {
			let view = this.getView();
			if (!dialog) {
				dialog = Fragment.load({
					id: view.getId(),
					name: `beamsuntoryinc.createcustomerform.view.fragments.${name}`,
					controller: this
				}).then(function(dialog){
					view.addDependent(dialog);
					return dialog;
				});
			}
			dialog.then(function(dialog){
				dialog.open();
			}.bind(this));
		},

		onChangeTaxNumber: function (event) {
			let taxNumber = event.getParameter("newValue");
			let customer = this.getModel("customer");
			let vatRegistrationNumber = customer.getProperty("/main/vatRegistrationNumber");

			if (taxNumber && vatRegistrationNumber) {
				this._getExistingCustomers(taxNumber, vatRegistrationNumber)
					.then(function(result) {
						if(!result.length) {
							return;
						}
						this.setModel(new JSONModel(result), "existingCustomers");
						this._openDialog(this.existingCustomersDialog, "ExistingCustomers");
					}.bind(this))
					.catch((error => MessageBox.error("Error reading existing customers: " + error.message)))
					.finally();
			}
			this.onChangeMain(event);
		},
		
		onChangeVatRegistrationNumber: function (event) {
			let vatRegistrationNumber = event.getParameter("newValue");
			let customer = this.getModel("customer");
			let taxNumber = customer.getProperty("/main/taxNumber");

			if (taxNumber && vatRegistrationNumber) {
				this._getExistingCustomers(taxNumber, vatRegistrationNumber)
					.then(function(result) {
						if(!result.length) {
							return;
						}
						this.setModel(new JSONModel(result), "existingCustomers");
						this._openDialog(this.existingCustomersDialog, "ExistingCustomers");
					}.bind(this))
					.catch((error => MessageBox.error("Error reading existing customers: " + error.message)))
					.finally();
			}
			this.onChangeMain(event);
		},

		onConfirmDuplicateCustomer: function(event) {
			event.getSource().getParent().exit();
		},

		onCancelDuplicateCustomer: function(event) {
			let customer = this.getModel("customer");
			customer.setProperty("/main/taxNumber", "");
			customer.setProperty("/main/vatRegistrationNumber", "");
			this.getModel("view").setProperty("/enabled/secondary", false);
			event.getSource().getParent().exit();
		},

		// onCancelExistingCustomers: function(event) {
		// 	let customer = this.getModel("customer");
		// 	customer.setProperty("/main/taxNumber", "");
		// 	customer.setProperty("/main/vatRegistrationNumber", "");
		// 	this.getModel("view").setProperty("/enabled/secondary", false);
			
		// },

		onChangeMaxNumberOfPartialDeliveries: function(event) {
			let customer = this.getModel("customer");
			let input = event.getParameter("value");
			if (isNaN(parseInt(input))) {
				customer.setProperty("/delivery/maxNumberOfPartialDeliveries/", "");
			}
		},

		onHierarchy4HelpRequest: function(event) {
			this._openDialog(this.hierarchyDialog, "HierarchyA4Dialog");
		},

		onHierarchyPress: function(event) {
			let itemPath = event.getParameter("selectedItem").getBindingContextPath();
			let model = this.getModel("hierarchies");
			let item = model.getProperty(itemPath);

			let customer = this.getModel("customer");
			customer.setProperty("/hierarchy/a1Key", item.Hkunnr1);
			customer.setProperty("/hierarchy/a1Text", item.Name1);
			customer.setProperty("/hierarchy/a2Key", item.Hkunnr2);
			customer.setProperty("/hierarchy/a2Text", item.Name2);
			customer.setProperty("/hierarchy/a3Key", item.Hkunnr3);
			customer.setProperty("/hierarchy/a3Text", item.Name3);
			customer.setProperty("/hierarchy/a4Key", item.Hkunnr4);
			customer.setProperty("/hierarchy/a4Text", item.Name4);
			this.onToggleValidationButton(event);
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
				this.onToggleValidationButton();
				// this.getModel("view").setProperty("/enabled/validate", false);
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
			
			this._initializeODataModels(true, false);
			this.onToggleValidationButton();
		},

		onLiveSalesDistrict: function (event) {
			let input = event.getParameter("newValue");
			let value = input.toUpperCase();
			let customer = this.getModel("customer");
			let salesDistricts = this.getModel("salesDistricts").getData();
			let filteredSalesDistricts = 
				salesDistricts.filter(salesDistrict => salesDistrict.BZIRK.toUpperCase().includes(value) || salesDistrict.BZTXT.toUpperCase().includes(value));
			this.setModel(new JSONModel(filteredSalesDistricts), "filteredSalesDistricts");
			customer.setProperty("/sales/districtText", input);
			if(input === "") {
				customer.setProperty("/sales/districtKey", "");
				this.onToggleValidationButton();
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

		onLiveFaxPrefix: function (event, param) {
			let input = event.getParameter("newValue");
			let customer = this.getModel("customer");
			let phonePrefixes = this.getModel("phonePrefix").getData();
			let filteredPhonePrefix = 
				phonePrefixes.filter(phonePrefix => phonePrefix.text.toUpperCase().includes(input.toUpperCase()) || phonePrefix.phone.includes(input));
			this.setModel(new JSONModel(filteredPhonePrefix), "filteredPhonePrefix");
			customer.setProperty(`/address/faxCountryCode${param}`, input);
			if(input === "") {
				customer.setProperty(`/address/faxCountryCode${param}`, "");
			}
		},

		onLivePhonePrefix: function (event, param) {
			let input = event.getParameter("newValue");
			let customer = this.getModel("customer");
			let phonePrefixes = this.getModel("phonePrefix").getData();
			let filteredPhonePrefix = 
				phonePrefixes.filter(phonePrefix => phonePrefix.text.toUpperCase().includes(input.toUpperCase()) || phonePrefix.phone.includes(input));
			this.setModel(new JSONModel(filteredPhonePrefix), "filteredPhonePrefix");
			customer.setProperty(`/address/telephoneCountryCodet${param}`, input);
			if(input === "") {
				customer.setProperty(`/address/telephoneCountryCode${param}`, "");
			}
		},

		onSelectFaxPrefix: function (event, param) {
			let selectedKey = event.getParameter("selectedItem").getKey();
			// let selectedText = event.getParameter("selectedItem").getText();
			let customer = this.getModel("customer");
			customer.setProperty(`/address/faxCountryCode${param}`, selectedKey);
			// customer.setProperty(`/address/faxCountryCode${param}`, selectedText);
		},

		onSelectPhonePrefix: function (event, param) {
			let selectedKey = event.getParameter("selectedItem").getKey();
			// let selectedText = event.getParameter("selectedItem").getText();
			let customer = this.getModel("customer");
			customer.setProperty(`/address/telephoneCountryCode${param}`, selectedKey);
			// customer.setProperty(`/address/telephoneCountryCode${param}`, selectedText);
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
				"hierarchy": [ "a4Key" ]
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

		onOpenErrorsDialog: function (event) {
			this.errorsDialog.openBy(event.getSource());
		},

		// onOpenErrorsDialog2: function(event) {
		// 	const oButton = event.getSource();
		// 	const oMessagePopover = this.byId("messagePopover");

		// 	if (!oMessagePopover.isOpen()) {
		// 		oMessagePopover.openBy(oButton);
		// 	} else {
		// 		oMessagePopover.close();
		// 	}
		// },

		onSubmit: function (event) {
			// TODO empty mandatory fields
			let customer = this.getModel("customer").getData();
			let taxInformations = this.getModel("taxInformations").getData();
			// submit.postCustomerData(customer, taxInformations);
		},

		_getErrorFieldName: function(customer, value) {
			return Object.keys(customer).reduce((result, section) => {
				if (result) {
					return result;
				}
				let errorfield = Object.keys(customer[section]).find(field => customer[section][field] === value);
				if(errorfield) {
					return errorfield;
				}
				return result;
			}, null);
		},

		// _getErrorMessage: function(error, payload) {
		// 	let model = this.getModel("customer");
		// 	let customer = model.getData();
		// 	let values = error.split("'");
		// 	let value = values.at(-2);
		// 	let errorFieldName = this._getErrorFieldName(customer, value);
		// 	let lblFieldName = `lbl${errorFieldName.charAt(0).toUpperCase()}${errorFieldName.slice(1)}`;
			
		// 	if (!lblFieldName) {
		// 		return this.getText("messageUnexpectedError", [error]);
		// 	}
		// 	let txtFieldName = this.getText(lblFieldName);
		// 	return this.getText("messageError", [txtFieldName, value]);

		// },

		onValidate: function (event) {
			let i18n = this.getView().getModel("i18n").getResourceBundle();
			let oDataModel = this.getOwnerComponent().getModel(GWD_BPA_UI5, i18n);
			let customer = this.getModel("customer").getData();
			sap.ui.core.BusyIndicator.show(0);
			let payload = validate.getStructure(customer);
			validate.onValidate(oDataModel, payload)
				.then(function(response) {
					let result = response?.data?.HDRreturnSet?.results[0];
					if (result?.Type === "S") {
						this.getModel("view").setProperty("/enabled/submit", true);
						this.setModel(new JSONModel([]), "errors");
						MessageBox.success(result.Message);
						return;
					}
					if (result?.Message) {
						let errors = [{message: result.Message, propertyref: ""}];
						this.setModel(new JSONModel(errors), "errors");
						this.onOpenErrorsDialog(event);
					}
				}.bind(this))
				.catch(function(error) {
					let responseText = JSON.parse(error.responseText);
					// let message = this._getErrorMessage(responseText.error.message.value, payload);
					this.setModel(new JSONModel(responseText.error.innererror.errordetails), "errors");
					this.onOpenErrorsDialog(event);
				}.bind(this))
				.finally(() => sap.ui.core.BusyIndicator.hide());
		}
    });
});