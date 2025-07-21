sap.ui.define(["sap/ui/core/library", 'sap/uxap/BlockBase'],
function (coreLibrary, BlockBase) {
	"use strict";

	const ViewType = coreLibrary.mvc.ViewType;

	return BlockBase.extend("beamsuntoryinc.createcustomerform.controller.blocks.Sales", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "beamsuntoryinc.createcustomerform.view.blocks.Sales",
					type: ViewType.XML
				},
				Expanded: {
					viewName: "beamsuntoryinc.createcustomerform.view.blocks.Sales",
					type: ViewType.XML
				}
			}
		}
	});
});
