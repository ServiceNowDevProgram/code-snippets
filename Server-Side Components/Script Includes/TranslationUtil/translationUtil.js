/* 
This SI is a translationUtil to for dynamic language translation for example english to French

This script include for language translation will invoke flow designer action and sublfow to complete the real time language transaltion

The properties referred in this translation util is DUMMY name that needs to be replaced with actual property name 

Identify the right AI translator for language and Update 
*/
var TranslationUtils = Class.create();
TranslationUtils.prototype = {
    initialize: function() {},

	getLimits: function() {

        var charLimit = parseInt(gs.getProperty('mycompany.dynamic.translation.char.limit', 30720));//51200=50KB 30720 = 30KB
        var requestBufferSize = parseInt(gs.getProperty('mycompany.dynamic.translation.request.buffer', 100));
        charLimit = (charLimit >= requestBufferSize) ? (charLimit - requestBufferSize) : charLimit;
        return {
            'charLimit': charLimit,
            'arrayLimit': parseInt(gs.getProperty('mycompany.dynamic.translation.array.limit', 10)),
            'textBufferSize': parseInt(gs.getProperty('mycompany.dynamic.translation.text.buffer', 4))
        };
    },


    getSubscriptionKey: function() {

         /* try {

            var result = sn_fd.FlowAPI.getRunner().action('<call FD action to get subscription key>').inForeground().run();
            var get_key_outputs = result.getOutputs();
            var subscription_key = get_key_outputs.subscription_key;

			return subscription_key;
			
        } catch (ex) {
            var message = ex.getMessage();
            gs.error(message);

        }*/
		try {

			var alias = gs.getProperty('mycompany.alias.ia.translation.id');
			var subscription_key = '';

			var gr_connection = new GlideRecord('http_connection');
			gr_connection.addEncodedQuery('active=true^connection_alias=' + alias);
			gr_connection.query();

			if (gr_connection.next()) {
				var gr_api_key = new GlideRecord('api_key_credentials');
				gr_api_key.get(gr_connection.getValue('credential'));
				subscription_key = gr_api_key.api_key.getDecryptedValue();
			}

			return subscription_key;
			
        } catch (ex) {
            var message = ex.getMessage();
            gs.error(message);
        }

    },


	getKBSize: function(text, limits) {
        var bytes = text.length;
        for (var i = text.length - 1; i >= 0; i--) {
            var code = text.charCodeAt(i);
            if (code > 0x7f && code <= 0x7ff)
                bytes++;
            else if (code > 0x7ff && code <= 0xffff)
                bytes += 2;
            if (code >= 0xDC00 && code <= 0xDFFF)
                i--;
        }
        var textBufferSize = limits.textBufferSize;
        return bytes + textBufferSize;
    },

	getBytesData: function(texts, limits) {
        var bytesData = {};
        for (var i = 0; i < texts.length; i++) {
            var kbSize = this.getKBSize(texts[i], limits);
            bytesData[texts[i]] = kbSize;
        }
        return bytesData;
    },

	classifyBulkTexts: function(texts, charLimit, bytesData) {
        var count = 0;
        var classifiedData = {};
        classifiedData["smallTexts"] = [];
        classifiedData["largeTexts"] = [];
        classifiedData["isBatchingRequired"] = false;
        for (var i = 0; i < texts.length; i++) {
            if (bytesData[texts[i]] > charLimit) {
                classifiedData["largeTexts"].push(texts[i]);
            } else {
                classifiedData["smallTexts"].push(texts[i]);
                count = count + bytesData[texts[i]];
                if (count > charLimit) {
                    classifiedData["isBatchingRequired"] = true;
                }
            }
        }
        return classifiedData;
    },

	splitLargeTexts: function(texts, charLimit) {

		var text_obj = {}; //text_obj = texts[0];
        var text_transl = []; //text_transl = text_obj["texts_to_translate"];
		var text_splited = [];
		//gs.log("charLimit : " + charLimit +'\n\ntext_transl : ' + JSON.stringify(text_transl), "BELLTR");
		//var text_array = texts[0].texts_to_translate;
		//for (var i = 0; i < text_transl.length; i++) {
			//var txt = text_transl[i];
			var txt = texts
			var kbSize = this.getKBSize(txt, limits);
		gs.log('kbSize : ' + kbSize +'\n\ntxt : ' + JSON.stringify(txt), "TELCOTR");
			if (kbSize > charLimit) {
				var text = txt
				var size = 0;
				var stop = 0
		gs.log('text : ' + text, "TELCOTR");
				while (size > charLimit && stop < 4) {
					text = txt.subString(0, charLimit);
					txt = txt.subString(charLimit);
					text_splited.push(text);
		gs.log('text_splited : ' + text_splited, "TELCOTR");
					size = this.getKBSize(txt, limits) 
					stop++;
				}
				text_splited.push(txt)
			}
			
		
		return text_splited;
	},


	addLargeTextsToArray: function(result, largeTexts, targetLanguages) {

        for (var large = 0; large < largeTexts.length; large++) {
            this.transformBatchTextsResponse([largeTexts[large]], targetLanguages, result);
        }
    },

	getSortedBytesMap: function(texts, bytesData) {
        var bytesList = [];
        for (var i = 0; i < texts.length; i++) {
            var kbSize = bytesData[texts[i]];
            if (kbSize) {
                bytesList.push([kbSize, texts[i]]);
            }
        }
        return bytesList.sort();
    },

    getBatchTexts: function(texts, bytesData, limits) {
        var bytesList = this.getSortedBytesMap(texts, bytesData);
        var weight = limits.charLimit;
        var splitTexts = [];
        var startIdx = 0;
        var arrayLength = bytesList.length;
        var endIdx = arrayLength - 1;
        var textsProcessed = 0;
        while (textsProcessed < arrayLength) {
            var singleSplit = [];
            var tempWeight = 0;
            while (singleSplit.length != limits.arrayLimit &&
                endIdx >= 0 &&
                startIdx <= endIdx &&
                weight >= (tempWeight + bytesList[endIdx][0])) {
                tempWeight += bytesList[endIdx][0];
                singleSplit.push(bytesList[endIdx][1]);
                endIdx -= 1;
                textsProcessed += 1;
            }
            while (singleSplit.length != limits.arrayLimit &&
                startIdx < arrayLength &&
                startIdx <= endIdx &&
                weight >= (tempWeight + bytesList[startIdx][0])) {
                tempWeight += bytesList[startIdx][0];
                singleSplit.push(bytesList[startIdx][1]);
                startIdx += 1;
                textsProcessed += 1;
            }
            splitTexts.push(singleSplit);
        }
        return splitTexts;
    },


	transformBatchTextsResponse: function(texts, targetLanguages, result) {
        for (var i = 0; i < targetLanguages.length; i++) {
            result.push({
                "texts_to_translate": texts,
                "target_language": targetLanguages[i]
            });
        }
    },

	addSmallTextsToArray: function(smallTexts, result, limits, targetLanguages) {
        var tempSmallTexts = [];
        for (var i = 0; i < smallTexts.length; i++) {
            tempSmallTexts.push(smallTexts[i]);
            if (tempSmallTexts.length == limits.arrayLimit) {
                this.transformBatchTextsResponse(tempSmallTexts, targetLanguages, result);
                tempSmallTexts = [];
            }
        }
        if (tempSmallTexts.length > 0) {
            this.transformBatchTextsResponse(tempSmallTexts, targetLanguages, result);
        }

    },

	splitInputTextsIntoBatches: function(texts, limits, targetLanguages) {
        var result = [];
        var bytesData = this.getBytesData(texts, limits);
        var classifiedData = this.classifyBulkTexts(texts, limits.charLimit, bytesData);
        if (classifiedData["isBatchingRequired"]) {
            var splitTexts = this.getBatchTexts(classifiedData.smallTexts, bytesData, limits);
		
            for (var idx = 0; idx < splitTexts.length; idx++) {
                var selectedTexts = splitTexts[idx];
                this.transformBatchTextsResponse(selectedTexts, targetLanguages, result);
            }
        } else {
            this.addSmallTextsToArray(classifiedData.smallTexts, result, limits, targetLanguages);
        }
        this.addLargeTextsToArray(result, classifiedData.largeTexts, targetLanguages);
        return result;
    },


	batchBulkTexts: function(texts, targetLanguages) {
        var limits = this.getLimits();
		//var test = this.splitLargeTexts(texts, limits.charLimit)
		//gs.log('test: ' + JSON.stringify(test), "TELCOTR")
        return this.splitInputTextsIntoBatches(texts, limits, targetLanguages);
    },

    _getProcessedTextResult: function(textResult) {
        var processedTextResult = {};
        var textResultKeys = Object.keys(textResult);
        for (var keyIdx = 0; keyIdx < textResultKeys.length; keyIdx++) {
            var key = textResultKeys[keyIdx];
            if (key == 'text_translations') {
                var textTranslations = [];
                var languages = Object.keys(textResult.text_translations);
                for (var idx = 0; idx < languages.length; idx++) {
                    var language = languages[idx];
                    var textTranslation = {
                        'translated_text': textResult.text_translations[language],
                        'target_language': language
                    };
                    textTranslations.push(textTranslation);
                }
                processedTextResult.text_translations = textTranslations;
            } else {
                processedTextResult[key] = textResult[key];
            }
        }
        return processedTextResult;
    },

    rearrangeJSONResult: function(texts, result, isTranslation) {
        var response = {
            'status': 'Success'
        };
        var rearrangedResponse = [];
        for (var i = 0; i < texts.length; i++) {
            var eachTextResult = result[texts[i]];
            if ('Error' === eachTextResult.status) {
                response['status'] = 'Error';
            }
            var processedTextResult = this._getProcessedTextResult(eachTextResult);
            rearrangedResponse.push(processedTextResult);
        }
        if (isTranslation)
            response['translations'] = rearrangedResponse;
        else
            response['detections'] = rearrangedResponse;
        return response;
    },


	detectLanguage: function(texts) {

		try {
			var inputs = {};
			inputs['texts'] = texts; // Array.String 

			// Start Asynchronously: Uncomment to run in background. Code snippet will not have access to outputs.
			// sn_fd.FlowAPI.getRunner().subflow('<detect langugage FD Action>').inBackground().withInputs(inputs).run();
					
			// Execute Synchronously: Run in foreground. Code snippet has access to outputs.
			var result = sn_fd.FlowAPI.getRunner().subflow('<detect langugage FD Action>').inForeground().withInputs(inputs).run();
			var outputs = result.getOutputs();

			// Get Outputs:
			// Note: outputs can only be retrieved when executing synchronously.
			var detections = outputs['detections']; // Array.Object
			var status = outputs['status']; // Choice
			var rest_calls = outputs['rest_calls']; // Integer

			return detections;
			
		} catch (ex) {
			var message = ex.getMessage();
			gs.log(message, "AI Translator - detectLanguage");
		}

		return '';
		
	},

	translateFields: function(texts, source_language, target_languages, additional_parameters) {

		try {

			var inputs = {};
			inputs['texts'] = texts; // Array.String 
			inputs['source_language'] = source_language; // String 
			inputs['target_languages'] = target_languages; // Array.String 
			inputs['additional_parameters'] = additional_parameters; // Array.Object 

			// Start Asynchronously: Uncomment to run in background. Code snippet will not have access to outputs.
			// sn_fd.FlowAPI.getRunner().subflow('<FD ACTION for Text Translation>').inBackground().withInputs(inputs).run();
					
			// Execute Synchronously: Run in foreground. Code snippet has access to outputs.
			var result = sn_fd.FlowAPI.getRunner().subflow('global.<FD ACTION for Text Translation>').inForeground().withInputs(inputs).run();
			var outputs = result.getOutputs();

			// Get Outputs:
			// Note: outputs can only be retrieved when executing synchronously.
			var translations = outputs['translations']; // Array.Object
			var status = outputs['status']; // Choice
			var rest_calls = outputs['rest_calls']; // Integer

			return translations;
			
		} catch (ex) {
			var message = ex.getMessage();
			gs.log(message, "
			AI Translator - translateFields");
		}

		return '';

	},


    type: 'TranslationUtils'
};
