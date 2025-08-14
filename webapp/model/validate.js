sap.ui.define([
], 
function () {
    return {
            onValidate: function (oData) {
                var oPayload = {
    Akont: "51520",
    TestRun: "X",
    Vkgrp: "",
    Kunnr: "",
    Pltyp: "",
    Lifsd: "",
    Stcd3: "",
    Sortl: "",
    Versg: "1",
    Kalks: "6",
    Kukla: "",
    ObjectTask: "I",
    Spras: "",
    Brsch: "",
    Bukrs: "ES10",
    Begru: "",
    Ktgrd: "01",
    Knazk: "",
    Vkorg: "ES11",
    Awahr: "000",
    Zuawa: "066",
    Klabc: "",
    Vtweg: "OU",
    Spart: "20",
    Vwerk: "",
    Fdgrv: "",
    Ktokd: "ZESP",
    Aufsd: "",
    Togru: "",
    Hbkid: "",
    Hityp: "",
    Hkunnr: "5142",
    Stcd4: "",
    Hvkorg: "",
    Name1: "",
    Hvtweg: "",
    Stceg: "",
    Hspart: "",
    Katr4: "",
    Katr5: "",
    Kdgrp: "O3",
    Ernam: "",
    Katr6: "",
    Erdat: null,
    Katr7: "",
    Defab: "",
    Katr9: "",
    Autlf: "",
    Stcd1: "32080693V",
    Kzazu: "",
    Stcd2: "",
    FshKvgr6: "",
    Sperr: "",
    FshKvgr7: "",
    J1kfrepre: "",
    FshKvgr8: "",
    J1kftbus: "",
    FshKvgr9: "",
    J1kftind: "",
    FshKvgr10: "",
    Katr1: "",
    Katr2: "",
    Katr3: "",
    Katr8: "",
    Katr10: "",
    Bbbnr: "0000000",
    Bbsnr: "00000",
    Bubkz: "0",
    Knfak: "",
    Inco1: "",
    Inco2: "",
    Konda: "10",
    Zwels: "",
    Waers: "USD",
    Zterm: "NT60",
    Lprio: "00",
    Vsbed: "SE",
    Vsort: "",
    Bokre: "",
    Mahna: "",
    Antlf: "0",
    Kztlf: "",
    Podkz: "",
    Busab: "",
    Zahls: "",
    Kvgr1: "",
    Kvgr2: "",
    Kvgr3: "",
    Kvgr4: "",
    Kvgr5: "",
    Bzirk: "013",
    Vkbur: "",
    Zzcgrp1: "",
    Zzcgrp2: "",
    Zzcgrp3: "",
    Zzcgrp4: "",
    Zzcgrp5: "",
    Zzcgrp6: "",
    Zzcgrp7: "",
    Zzcgrp8: "",
    Zzcgrp9: "",
    Zzcgrp10: "",
    CompTerm: "",
    Sbgrp: "",
    Ctlpc: "",
    Klimk: "0.000",
    Lockb: "",
    Xausz: "",
    Intad: "",
    Nxtrv: null,
    ComSperr: "",
    Cassd: "",

    // Deep entities
    TextsSet: {
        results: [{
            KunnrText: "",
            Langu: "",
            Languiso: "",
            TextId: "",
            Tdformat: "",
            Tdline: ""
        }]
    },
    PartnerFunctionSet: {
        results: [{
            KunnrSale: "",
            Parvw: "SP",
            Parza: "000",
            Defpa: false,
            Knref: "",
            Partner: ""
        }]
    },
    TaxGroupIndSet: {
        results: [{
            KunnrTax: "",
            Taxgr: "",
            Sbjdf: null,
            Sbjdt: null,
            Exnr: "",
            Exrt: "0.00",
            Exdf: null,
            Exdt: null,
            Aland: "",
            Tatyp: "",
            Taxkd: ""
        }]
    },
    AddressSet: {
        results: [{
            KunnrAdd: "",
            Name: "Ashutosh",
            City: "Vity",
            PostlCod1: "12345",
            Transpzone: "SC-US-0000",
            Country: "US",
            Countryiso: "US",
            Sort1: "Ashu"
        }]
    }
};
oData.create("/CustomersSet", oPayload, {
    success: function (oData) {
        sap.m.MessageToast.show("Customer created successfully");
        console.log("Created:", oData);
    },
    error: function (oError) {
        console.error("Error creating customer", oError);
    }
});
            }
    }
	
});