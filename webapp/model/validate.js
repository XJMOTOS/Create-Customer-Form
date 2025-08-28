sap.ui.define([
], 
function () {
	return {
		getStructure: function(customer) {
			let structure = {
				TestRun: "X",
				Ktokd: customer.main.accountGroup,
				Bukrs: customer.main.companyCode,
				Vkorg: customer.main.salesOrganization,
				Vtweg: customer.main.distributtionChannel,
				Spart: customer.main.division,
				Stcd1: customer.main.taxNumber,// || "32080693V",
				Stceg: customer.main.vatRegistrationNumber,

				Name1: customer.general.name1,
				// customer.general.name2,
				// customer.general.name3,
				// customer.general.name4,
				// customer.general.country,
				Sortl: customer.general.searchTerm,
				Spras: customer.general.language,
				Kukla: customer.general.classification,
				Brsch: customer.general.industryKey,
				Knazk: "", //customer.general.timeZone,

				Stcd2: customer.taxDetails.vatNumber2,
				Stcd3: customer.taxDetails.warehouseExciseNumber,
				Stcd4: customer.taxDetails.vatNumber4,

				Katr1: customer.attributes["1"], 
				Katr2: customer.attributes["2"],
				Katr3: customer.attributes["3"],
				Katr4: customer.attributes["4"],
				Katr5: customer.attributes["5"],
				Katr6: customer.attributes["6"],
				Katr7: customer.attributes["7"],
				Katr9: customer.attributes["9"],
				Katr8: customer.attributes["8"],
				Katr10: customer.attributes["10"],

				// "contactPersons": [],

				AddressSet: {
					results: [{
						KunnrAdd: "",
						Name: "Ashutosh",
						City: "Vity",
						PostlCod1: "12345",
						Transpzone: "SC-US-0000",
						Country: "US",
						Countryiso: "US",
						Sort1: "Ashu",

      					LanguCr: customer.general.language,
      					Langucriso: customer.general.language
					}]
				},

				Zuawa: customer.company.sortKey,
				Akont: customer.company.reconciliationAccount,
				Begru: customer.company.authorizationGroup,
				Fdgrv: customer.company.cashManagmentGroup,
				Togru: customer.company.toleranceGroup,
				Zwels: customer.company.paymentMethod,
				Hbkid: customer.company.houseBank,
				Busab: customer.company.accountingClerkAbbreviation,

				Bzirk: customer.sales.districtKey,
				Vkgrp: customer.sales.group,
				Vkbur: customer.sales.office,
				Waers: customer.sales.currency,
				Ktgrd: customer.sales.accountAssignmentGroup,
				Zterm: customer.sales.termsOfPayment,
				Kalks: customer.sales.pricingProcedure,
				Inco1: customer.sales.incoterm1,
				Inco2: customer.sales.incoterm2,
				Awahr: customer.sales.orderProbability,
				Klabc: customer.sales.customerClassification,
				Bokre: customer.sales.indicatorRebateRelevant,

				Kdgrp: customer.customerGroup["0"],
				Kvgr1: customer.customerGroup["1"],
				Kvgr2: customer.customerGroup["2"],
				Kvgr3: customer.customerGroup["3"],
				Kvgr4: customer.customerGroup["4"],
				Kvgr5: customer.customerGroup["5"],
				Zzcgrp1: customer.customerGroup["11"],
				Zzcgrp2: customer.customerGroup["12"],
				Zzcgrp3: customer.customerGroup["13"],
				Zzcgrp4: customer.customerGroup["14"],
				Zzcgrp5: customer.customerGroup["15"],
				Zzcgrp6: customer.customerGroup["16"],
				Zzcgrp7: customer.customerGroup["17"],
				Zzcgrp8: customer.customerGroup["18"],
				Zzcgrp9: customer.customerGroup["19"],
				Zzcgrp10: customer.customerGroup["20"],
				Konda: customer.customerGroup.priceGroup,
				Pltyp: customer.customerGroup.priceListType,
				Versg: customer.customerGroup.statisticsGroup,

				Vsbed: customer.delivery.shippingCondition,
				Lifsd: customer.delivery.deliveryBlock,
				Autlf: customer.delivery.completeDelivery,
				Antlf: customer.delivery.maxNumberOfPartialDeliveries.toString() || "0",
				Kztlf: customer.delivery.partialDelivery,
				Kzazu: customer.delivery.orderCombinationIndicator ? "X" : "",
				Lprio: customer.delivery.deliveryPriority,
				Vwerk: customer.delivery.deliveringPlant,
				
				Hityp: customer.hierarchy.type,

				Kunnr: "", //Customer
				ObjectTask: "I", //
				Aufsd: "", //Ord.blk:sls ar.
				Hkunnr: "5142", //HgLvCust.
				Hvkorg: "", //HgLv sales org.
				Hvtweg: "", //HgLv.distrib.ch
				Hspart: "", //HgLv division
				Ernam: "", //Created By
				Erdat: null, //Created On
				Defab: "", //Default unld.pt
				FshKvgr6: "", //Default unld.pt
				Sperr: "", //Posting Block
				FshKvgr7: "", //Customer grp 7
				J1kfrepre: "", //Rep's Name
				FshKvgr8: "", //Customer grp 8
				J1kftbus: "", //Type of Business
				FshKvgr9: "", //Customer grp 9
				J1kftind: "", //Type of Industry
				FshKvgr10: "", //Customer grp 10
				Bbbnr: "0000000", //Location no. 1
				Bbsnr: "00000", //Location no. 2
				Bubkz: "0", //Check digit
				Knfak: "", //Cust.calendar
				Vsort: "", //Item proposal
				Mahna: "", //Dunn.Procedure
				Podkz: "", //POD-relevant
				Zahls: "", //Payment block
				CompTerm: "", //Payt Terms
				Sbgrp: "", //Cred.rep.grp
				Ctlpc: "", //Risk category
				Klimk: "0.000", //Credit limit
				Lockb: "", //Lockbox
				Xausz: "", //Acct statement
				Intad: "", //Clrk's internet
				Nxtrv: null, //Next int.review
				ComSperr: "", //Co.code post.block
				Cassd: "", //Sales block

				// Deep entities
				TextsSet: {
					results: [
						{
						KunnrText: "", //Customer
						Langu: customer.general.language, //Language
						Languiso: customer.general.language, //Lang. (ISO)
						TextId: "", //Text ID
						Tdformat: "", //Tag column
						Tdline: "" //Text Line
					}
				]
				},
				PartnerFunctionSet: {
					results: [{
						KunnrSale: "", //Customer
						Parvw: "SP", //Partner Functn
						Parza: "000", //Partner counter
						Defpa: false, //Default Partner
						Knref: "", //Partner desc.
						Partner: "" //Number
					}]
				},
				TaxGroupIndSet: {
					results: [{
						KunnrTax: "", //Customer
						Taxgr: "", //Tax category
						Sbjdf: null, //subjected from
						Sbjdt: null, //subjected until
						Exnr: "", //Exempt. Number
						Exrt: "0.00", //Exemption Rate
						Exdf: null, //Exempted from
						Exdt: null, //Exempted until
						Aland: "", //Country
						Tatyp: "", //Tax category
						Taxkd: "" //Tax Classific.
					}]
				},
				AddressSet: {
					results: [{
						KunnrAdd: "", //Customer
						Name: "Ashutosh",
						City: "Vity",
						PostlCod1: "12345",
						Transpzone: "SC-US-0000",
						Country: "US",
						Countryiso: "US",
						Sort1: "Ashu",
						Langu: customer.general.language,
      					LanguIso: customer.general.language,
						LanguCr: customer.general.language,
      					Langucriso: customer.general.language
					}]
				},
				HDRreturnSet: [],
			};

			// structure.AddressSet.results = customer.contactPersons.map(person => {
			//     return {
			//         Name: "Ashutosh",
			//         City: "Vity",
			//         PostlCod1: "12345",
			//         Transpzone: "SC-US-0000",
			//         Country: "US",
			//         Countryiso: "US",
			//         Sort1: "Ashu"
			//     };

			// })

			return structure;
		},

		onValidate: function (oDataModel, payload) {
			return new Promise((resolve, reject) => {
				oDataModel.create("/CustomersSet", payload, {
					success: (data, result) => resolve(result),
					error: (error) => reject(error)
				});
			});
		}
	}
	
});