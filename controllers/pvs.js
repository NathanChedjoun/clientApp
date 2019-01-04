
const axios = require('axios');
const config=require("../config/configs");

const numberOfParties = 3;
const numberOfPollingStations = 3;


// First level of result in our problem
function firstLevelResult(partyPvList){
    var sum = [];
    for(var i=0; i<numberOfParties; i++){
        sum.push(0);
    }
    partyPvList.forEach(function(item){
        for(var i=0; i<numberOfParties; i++){
            sum[i] += item.voices[i];
        }
    });
    return sum;
}


// Extract the indice of the max element of the tab
function indiceBigElement(tab){
    var indice=0;
    var test = tab[0];
    for(var i=1; i<tab.length; i++){
        if(tab[i]>=test){
            test = tab[i];
            indice = i;
        }
    }
    return indice;
}


// Equality between two tabs
function equals(tab1,tab2){
    var test=0;
    var response = false;
    for(var i=0; i<tab1.length; i++){
        if(tab1[i]===tab2[i]){
            test+=1;
        }
    }
    if(test === tab1.length){
        response = true;
    }
    return response;
}

// Extract for a polling station the most repetitive pv
function extractionPv(pvs){
    console.log(pvs);
    var comparaison = [];
    var response = pvs[pvs.length-1];
    var max=0; 
    
    for(var i=0; i<pvs.length-1; i++){
        comparaison.push(0);
    }
    for(var i=0; i<pvs.length-1; i++){
        for(var j=i+1; j<pvs.length-1; j++){
            if (equals(pvs[i].voices,pvs[j].voices) === true){
                comparaison[i]+=1;
                comparaison[j]+=1;
            }
        }
    }

    max = Math.max(...comparaison);
    console.log('resultat max');
    console.log(comparaison);
    if(max>0){
        response = pvs[indiceBigElement(comparaison)];
    }

    return response;
}


// Extract the list of pvs to use to generate our own level of result
function ourList(pvs){
    var response = [];
    var listPvsPollingStation = [];
    var stop =1;
    var pvElecam;

   for(var i=1; i<=numberOfPollingStations; i++){
        for(var j=0; j<pvs.length; j++){
            if(pvs[j].pollingStation === i){
                if((pvs[j].scrutineerName !== "bon") && (pvs[j].scrutineerName !== "elecam")){ //exclusion pvs elecam et bon
                    listPvsPollingStation.push(pvs[j]);
                }
                if(pvs[j].scrutineerName === "elecam" && stop>0){
                    pvElecam = pvs[j];
                    stop = 0;
                }
            }
        }
        listPvsPollingStation.push(pvElecam); // pv qu'on enverra pour ce bureau de vote lorsque tous truque les élections dans leur coin
        response.push(extractionPv(listPvsPollingStation));
        listPvsPollingStation = [];
    }
    return response;
}

// Our result after processing the data
function secondLevelResult(pvs){
    console.log("Nos résultats");
    return firstLevelResult(ourList(pvs));
}


module.exports = {
    resultPartyByPartyNumber(req,res) {
        axios.get(config.blochainApiUri+'queries/selectPvByPartyNumber?partyNumber='+req.params.partyNumber)
            .then(function (response) {
                var result = firstLevelResult(response.data);
                res.status(200).send(result);
            })
            .catch(function (error) {
                res.status(400).send(error.response.data.errors[0].message)
            })
    },
    resultPartyByScrutineerName(req,res) {
        axios.get(config.blochainApiUri+'queries/selectPvByScrutineerName?scrutineerName='+req.params.scrutineerName)
            .then(function (response) {
                var result = firstLevelResult(response.data);
                res.status(200).send(result);
            })
            .catch(function (error) {
                res.status(400).send(error.response.data.errors[0].message)
            })
    },
    ourOwnResult(req,res) {
        axios.get(config.blochainApiUri+'Pv')
            .then(function (response) {
                var result = secondLevelResult(response.data);
                res.status(200).send(result);
            })
            .catch(function (error) {
                res.status(400).send(error.response.data.errors[0].message)
            })
    }
};

