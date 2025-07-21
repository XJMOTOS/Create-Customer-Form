sap.ui.define(["sap/ui/core/library", 'sap/uxap/BlockBase'],
function (coreLibrary, BlockBase) {
	"use strict";

	const ViewType = coreLibrary.mvc.ViewType;

	return BlockBase.extend("beamsuntoryinc.createcustomerform.controller.blocks.General", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "beamsuntoryinc.createcustomerform.view.blocks.General",
					type: ViewType.XML
				},
				Expanded: {
					viewName: "beamsuntoryinc.createcustomerform.view.blocks.General",
					type: ViewType.XML
				}
			}
		}
	});
});
