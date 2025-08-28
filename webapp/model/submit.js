sap.ui.define([
], 
function () {
	"use strict";

	const tokenUrl = 'https://jimbeambtp-training-gcp.authentication.us30.hana.ondemand.com/oauth/token';
	const clientId = 'sb-b1e5c253-7a4c-4a9d-9152-e82b54af4a79!b15140|xsuaa!b4445';
    const clientSecret= '38a8a6e5-9312-4538-b0ee-0bd7061471e8$h-Hmf_6ft1OM2IwT-x-k-e1ve_7p2lrQmGPb_RdLxQA=';
            
	return {
		getToken2: function() {
			var that = this
			$.ajax({
			url: tokenUrl,
				method: 'POST',
				headers: {
					'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
					'Accept': 'application/json'
				},
				contentType: 'application/x-www-form-urlencoded',
				data: $.param({
					grant_type: 'client_credentials'
				}),
				success: function(response) {
					var sToken = response.access_token;
					that.oAppModel.setProperty("/sToken", sToken)
					that.fetchAllWorkflowInstances(sToken);
				},
				error: function(xhr, status, err) {
					console.error('Token request failed:', status, err, xhr.responseText);
				}
			});
		},
		getToken: function() {
			return new Promise((resolve, reject) => {
				$.ajax({
					url: tokenUrl,
					method: 'POST',
					headers: {
						'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
						'Accept': 'application/json'
					},
					contentType: 'application/x-www-form-urlencoded',
					data: $.param({
						grant_type: 'client_credentials'
					}),
					success: (response) => resolve(response.access_token),
					error: (xhr, status, err) => reject({ xhr: xhr, status: status, err: err})
				});
			});
		},

		postCustomerData: async function (data, taxInformations) {
			let token = await this.getToken();

			const oPayload = {
				"definitionId": "us30.jimbeambtp-training-gcp.custformapibpa.customerCreateForm",
				"context": {
					"customerdetails": {
						"CustomersSet": {
							"Kunnr": "",
							"Akont": data.company.reconciliationAccount,
							"Versg": data.customerGroup.statisticsGroup,
							"Stcd3": data.taxDetails.warehouseExciseNumber,
							"ObjectTask": "I",
							"Kalks": data.sales.pricingProcedure,
							"Bukrs": "SG60",
							"Ktgrd": data.sales.accountAssignmentGroup,
							"Vkorg": data.main.salesOrganization,
							"Zuawa": data.company.sortKey,
							"Vtweg": data.main.distributtionChannel,
							"Spart": data.main.division,
							"Ktokd": data.main.accountGroup,
							"Aufsd": "",
							"Hityp": "",
							"Hkunnr": "",
							"Hvkorg": "",
							"Hvtweg": "",
							"Hspart": "",
							"Kdgrp": data.customerGroup["0"],
							"Ernam": "",
							"Erdat": "/Date(-62135769600000)/",
							"Defab": "",
							"Stcd1": data.main.taxNumber,
							"Stcd2": data.taxDetails.vatNumber2,
							"Sperr": "",
							"J1kfrepre": "",
							"J1kftbus": "",
							"J1kftind": "",
							"Katr1": data.attributes["1"],
							"Katr2": data.attributes["2"],
							"Katr3": data.attributes["3"],
							"Katr8": data.attributes["8"],
							"Katr10": data.attributes["10"],
							"Bbbnr": "0000000",
							"Bbsnr": "00000",
							"Bubkz": "0",
							"Knfak": "",
							"Inco1": data.sales.incoterm1,
							"Inco2": data.sales.incoterm2,
							"Konda": data.customerGroup.priceGroup,
							"Zwels": data.company.paymentMethod,
							"Waers": data.sales.currency,
							"Zterm": data.sales.termsOfPayment,
							"Lprio": data.delivery.deliveryPriority,
							"Vsbed": data.delivery.shippingCondition,
							"Vsort": "",
							"Bokre": data.sales.indicatorRebateRelevant,
							"Mahna": "",
							"Antlf": data.delivery.maxNumberOfPartialDeliveries,
							"Kztlf": data.delivery.partialDelivery,
							"Podkz": "",
							"Busab": data.company.accountingClerkAbbreviation,
							"Zahls": "",
							"Kvgr1": data.customerGroup["1"],
							"Kvgr2": data.customerGroup["2"],
							"Kvgr3": data.customerGroup["3"],
							"Kvgr4": data.customerGroup["4"],
							"Kvgr5": data.customerGroup["5"],
							"Bzirk": data.sales.districtKey,
							"Vkbur": data.sales.office,
							"Zzcgrp1": data.customerGroup["11"],
							"Zzcgrp2": data.customerGroup["12"],
							"Zzcgrp3": data.customerGroup["13"],
							"Zzcgrp4": data.customerGroup["14"],
							"Zzcgrp5": data.customerGroup["15"],
							"Zzcgrp6": data.customerGroup["16"],
							"Zzcgrp7": data.customerGroup["17"],
							"Zzcgrp8": data.customerGroup["18"],
							"Zzcgrp9": data.customerGroup["19"],
							"Zzcgrp10": data.customerGroup["20"],
							"CompTerm": "NT60",
							"Sbgrp": "",
							"Ctlpc": "",
							"Klimk": "0.000",
							"Lockb": "",
							"Xausz": "2",
							"Intad": "",
							"Nxtrv": "/Date(-62135769600000)/",
							"ComSperr": "",
							"Cassd": "",
							"TextsSet": [
								{
									"KunnrText": "",
									"Langu": "EN",
									"Languiso": "EN",
									"TextId": "ZMX1",
									"Tdformat": "AS",
									"Tdline": "SG HUB"
								},
								{
									"KunnrText": "",
									"Langu": "EN",
									"Languiso": "EN",
									"TextId": "ZMX2",
									"Tdformat": "AS",
									"Tdline": "SG HUB - HEINEMANN ASIAPAC"
								}
							],
							"HDRreturnSet": [],
							"AddressSet": [
								{
									"KunnrAdd": "",
									"AddrVers": "",
									"FromDate": "/Date(-62135769600000)/",
									"ToDate": "/Date(253402214400000)/",
									"Title": "",
									"Name": data.general.name1,
									"Name2": data.general.name2,
									"Name3": data.general.name3,
									"Name4": data.general.name4,
									"ConvName": "",
									"COName": "",
									"City": data.address.city,
									"District": data.address.district,
									"CityNo": "",
									"DistrctNo": "",
									"Chckstatus": "",
									"Regiogroup": "",
									"PostlCod1": data.address.postalCode,
									"PostlCod2": "",
									"PostlCod3": "",
									"Pcode1Ext": "",
									"Pcode2Ext": "",
									"Pcode3Ext": "",
									"PoBox": data.address.poBox,
									"PoWONo": false,
									"PoBoxCit": "",
									"PboxcitNo": "",
									"PoBoxReg": "",
									"PoboxCtry": "",
									"PoCtryiso": "",
									"DelivDis": "",
									"Transpzone": "SC-SG-0000",
									"Street": data.address.street,
									"StreetNo": "",
									"StrAbbr": "",
									"HouseNo": data.address.houseNumber,
									"HouseNo2": "",
									"HouseNo3": "",
									"StrSuppl1": data.address.street2,
									"StrSuppl2": data.address.street3,
									"StrSuppl3": data.address.street4,
									"Location": data.address.street5,
									"Building": data.address.building,
									"Floor": data.address.floor,
									"RoomNo": data.address.room,
									"Country": data.general.countryKey,
									"Countryiso": data.address.countryKey,
									"Langu": data.general.language,
									"LanguIso": data.general.language,
									"Region": data.address.region,
									"Sort1": "HEINEMANN ASIA PACIF",
									"Sort2": "",
									"Extens1": "",
									"Extens2": "",
									"TimeZone": "UTC+8",
									"Taxjurcode": "",
									"AddressId": "",
									"LanguCr": "EN",
									"Langucriso": "EN",
									"CommType": "",
									"AddrGroup": "",
									"HomeCity": "",
									"Homecityno": "",
									"DontUseS": "",
									"DontUseP": "",
									"PoBoxLobby": "",
									"DeliServType": "",
									"DeliServNumber": "",
									"CountyCode": "",
									"County": "",
									"TownshipCode": "",
									"Township": "",
									"Xpcpt": "",
									"AdrNotes": "",
									"Errorflag": false,
									"CommNotes": "",
									"StdNo": false,
									"Telephone": "",
									"Extension": "",
									"TelNo": "",
									"CallerNo": "",
									"StdRecip": "",
									"R3User": "",
									"HomeFlag": false,
									"Consnumber": "000",
									"FaxCountry": "",
									"FaxCountryiso": "",
									"FaxStdNo": false,
									"Fax": "",
									"FaxExtension": "",
									"FaxNo": "",
									"FaxSenderNo": "",
									"EMail": data.address.email1,
									"EmailSrch": "",
									"Encode": "",
									"Tnef": false,
									"Telbx": "",
									"Telf2": "",
									"Teltx": "",
									"Telx1": ""
								}
							],
							"TaxGroupIndSet": [],
							"PartnerFunctionSet": [
								{
									"KunnrSale": "",
									"Parvw": "SP",
									"Parza": "000",
									"Defpa": true,
									"Knref": "",
									"Partner": ""
								},
								{
									"KunnrSale": "",
									"Parvw": "BP",
									"Parza": "000",
									"Defpa": true,
									"Knref": "",
									"Partner": ""
								},
								{
									"KunnrSale": "",
									"Parvw": "PY",
									"Parza": "000",
									"Defpa": true,
									"Knref": "",
									"Partner": ""
								},
								{
									"KunnrSale": "",
									"Parvw": "SH",
									"Parza": "000",
									"Defpa": true,
									"Knref": "",
									"Partner": ""
								}
							]
						}
					}
				}
			};
		
			oPayload.context.customerdetails.CustomersSet.TaxGroupIndSet = taxInformations.map(tax => {
				return {
					"KunnrTax": "",
					"Taxgr": "",
					"Sbjdf": "/Date(-62135769600000)/",
					"Sbjdt": "/Date(-62135769600000)/",
					"Exnr": "",
					"Exrt": "0.00",
					"Exdf": "/Date(-62135769600000)/",
					"Exdt": "/Date(-62135769600000)/",
					"Aland": tax.taxCountry,
					"Tatyp": tax.taxCategory,
					"Taxkd": tax.taxClassification
				};
			});

			sap.ui.core.BusyIndicator.show(0);
			$.ajax({
				// url: "https://spa-api-gateway-bpi-us-prod.cfapps.us30.hana.ondemand.com/workflow/rest/v1/workflow-instances",
				url: "/sbpa_process/workflow-instances",
				method: "POST",
				headers: {
					"Authorization": "Bearer " + token
				},
				contentType: "application/json",
				data: JSON.stringify(oPayload),
				success: function (response) {
					console.log("POST successful", response);
					sap.ui.core.BusyIndicator.hide()
				},
				error: function (xhr, status, error) {
					console.error("POST failed", xhr.responseText);
					sap.ui.core.BusyIndicator.hide()
				}
			});
		}
	};

});