/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/takotsubo/dist/Takotsubo.js":
/*!**************************************************!*\
  !*** ./node_modules/takotsubo/dist/Takotsubo.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Takotsubo = void 0;\nclass Takotsubo {\n    ENDPOINT = 'https://api.oejp-kraken.energy/v1/graphql/';\n    fetchWrapper(query, variables, token) {\n        return new Promise(async (resolve, reject) => {\n            if (!token)\n                token = '';\n            try {\n                let result = await fetch(this.ENDPOINT, {\n                    method: \"POST\",\n                    headers: {\n                        \"Content-Type\": \"application/json\",\n                        \"Authorization\": String(token)\n                    },\n                    body: JSON.stringify({\n                        query: query,\n                        variables: variables\n                    }),\n                });\n                let jsonMsg = await result.json();\n                resolve(jsonMsg);\n            }\n            catch (error) {\n                reject(error);\n            }\n        });\n    }\n    async fetchToken(email, passwd) {\n        return new Promise(async (resolve, reject) => {\n            try {\n                const query = `mutation login($input: ObtainJSONWebTokenInput!) {\n                    obtainKrakenToken(input: $input) {\n                        token\n                        refreshToken\n                    }\n                }`;\n                const variables = { \"input\": { \"email\": email, \"password\": passwd } };\n                const headers = {};\n                let result = await this.fetchWrapper(query, variables);\n                resolve(result.data.obtainKrakenToken);\n            }\n            catch (error) {\n                reject(error);\n            }\n        });\n    }\n    async fetchData(token, accountNumber, startDate, endData) {\n        return new Promise(async (resolve, reject) => {\n            try {\n                const query = `\n                query halfHourlyReadings(\n                    $accountNumber: String!\n                    $fromDatetime: DateTime\n                    $toDatetime: DateTime\n                ) {\n                    account(accountNumber: $accountNumber) {\n                        properties {\n                            electricitySupplyPoints {\n                                status\n                                agreements {\n                                    validFrom\n                                }\n                                halfHourlyReadings(\n                                    fromDatetime: $fromDatetime\n                                    toDatetime: $toDatetime\n                                ) {\n                                    startAt\n                                    value\n                                    costEstimate\n                                }\n                            }\n                        }\n                    }\n                }`;\n                // クエリで(startAtと同列) consumptionStep,consumptionRateBand を指定可能\n                const variables = {\n                    \"accountNumber\": accountNumber,\n                    \"fromDatetime\": startDate,\n                    \"toDatetime\": endData\n                };\n                let result = await this.fetchWrapper(query, variables, token);\n                resolve(result.data.account.properties[0].electricitySupplyPoints[0].halfHourlyReadings);\n            }\n            catch (error) {\n                reject(error);\n            }\n        });\n    }\n}\nexports.Takotsubo = Takotsubo;\n\n\n//# sourceURL=webpack://takoyaki/./node_modules/takotsubo/dist/Takotsubo.js?");

/***/ }),

/***/ "./node_modules/takotsubo/dist/index.js":
/*!**********************************************!*\
  !*** ./node_modules/takotsubo/dist/index.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __exportStar = (this && this.__exportStar) || function(m, exports) {\n    for (var p in m) if (p !== \"default\" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n__exportStar(__webpack_require__(/*! ./Takotsubo */ \"./node_modules/takotsubo/dist/Takotsubo.js\"), exports);\n\n\n//# sourceURL=webpack://takoyaki/./node_modules/takotsubo/dist/index.js?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst takotsubo_1 = __webpack_require__(/*! takotsubo */ \"./node_modules/takotsubo/dist/index.js\");\nwindow.onload = () => {\n    const dlBtn = document.querySelector('#download');\n    const idElem = document.querySelector('#id');\n    const emailElem = document.querySelector('#email');\n    const passwordElem = document.querySelector('#password');\n    const startDateElem = document.querySelector('#start-date');\n    const endDateElem = document.querySelector('#end-date');\n    dlBtn.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {\n        const takotusbo = new takotsubo_1.Takotsubo();\n        try {\n            let startDateEpoch = new Date(startDateElem.value).valueOf();\n            let endDateEpoch = new Date(endDateElem.value).valueOf();\n            if (startDateEpoch > endDateEpoch) {\n                alert('時刻の指定が不正です');\n            }\n            else {\n                let startDate = `${String(startDateElem.value)}T00:00:00Z`;\n                let endDate = `${String(endDateElem.value)}T00:00:00Z`;\n                const result = yield takotusbo.fetchToken(String(emailElem.value), String(passwordElem.value));\n                const data = yield takotusbo.fetchData(result.token, String(idElem.value), startDate, endDate);\n                const csvString = takotusboData2csvString(data);\n                yield downloadFile(csvString, `takoyaki_${String(startDateElem.value)}_${String(endDateElem.value)}`);\n                alert('ダウンロード完了');\n            }\n        }\n        catch (error) {\n            alert('データ取得に失敗しました');\n        }\n    }));\n};\nfunction downloadFile(content, fileName) {\n    return new Promise((resolve) => {\n        const a = document.createElement(\"a\");\n        const file = new Blob([content], { type: 'csv/plain' });\n        a.href = URL.createObjectURL(file);\n        a.download = fileName;\n        a.click();\n        URL.revokeObjectURL(a.href);\n        resolve(true);\n    });\n}\nfunction takotusboData2csvString(data) {\n    let csvString = data.map(d => `${d.startAt},${d.value},${d.costEstimate}`)\n        .flat()\n        .join('\\n');\n    return `date,power consumption,estimate cost\\n${csvString}`;\n}\n\n\n//# sourceURL=webpack://takoyaki/./src/main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;