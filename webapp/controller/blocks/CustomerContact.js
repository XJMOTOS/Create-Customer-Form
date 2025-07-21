sap.ui.define([
	"sap/ui/core/library",
	"sap/uxap/BlockBase",
	"sap/ui/model/json/JSONModel"
],
function (coreLibrary, BlockBase, JSONModel) {
	"use strict";

	const ViewType = coreLibrary.mvc.ViewType;
	const customerContactModelName = "customerContact";

	return BlockBase.extend("beamsuntoryinc.createcustomerform.controller.blocks.CustomerContact", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "beamsuntoryinc.createcustomerform.view.blocks.CustomerContact",
					type: ViewType.XML
				},
				Expanded: {
					viewName: "beamsuntoryinc.createcustomerform.view.blocks.CustomerContact",
					type: ViewType.XML
				}
			}
		},

		onAddContact: function (event) {
			let model = event.getSource().getModel(customerContactModelName);
			let contacts = model.getData();
			contacts.push({
				contactType: "",
				name: "",
				surname: "",
				phone: "",
				fax: "",
				email: ""
			});
			model.setData(new JSONModel(contacts), customerContactModelName);
		},

		onRemoveContact: function (event) {
			let model = event.getSource().getModel(customerContactModelName);
			let contacts = model.getData();
			let path = event.getParameter("listItem").getBindingContext(customerContactModelName).getPath();
			let index = parseInt(path.slice(1), 10);
			contacts.splice(index, 1);
			model.setData(new JSONModel(contacts), customerContactModelName);
		}
	});
});
