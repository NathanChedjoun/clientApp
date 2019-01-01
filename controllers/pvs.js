
const axios = require('axios');
const config=require("../config/configs");

const numberOfParties = 3;

/*
var monObjet = {
    list: [],

    init: function() {
        return axios.get(config.blochainApiUri+'Pv')
        .then(function (response) {
            return response.data;
            console.log(response.data);
        })
    }
};

var obj1 = Object.create(monObjet);
obj1.init();
console.log(obj1.list)
*/

/*
const getData = async() => {
    try {
        const response = await axios.get(config.blochainApiUri+'Pv');
        const data = response.data;
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};

var list = getData();

console.log(list);
*/
/*
var resultat = [];

async function getPvs() {
    let data = await axios.get(config.blochainApiUri+'Pv')
    return data;
}

getPvs().then( function(result) {
    resultat = result.data;
});

console.log(resultat)
*/


/*var monObjet = {
    list: [],

    init: async function() {
        return await axios.get(config.blochainApiUri+'Pv')
        .then(function (response) {
            this.list = response.data;
            console.log(response.data);
        })
    }
};

var obj1 = Object.create(monObjet);
obj1.init();
console.log(obj1.list.data);*/


function sumVoices(pvList){
    var sum = [];
    for(var i=0; i<numberOfParties; i++){
        sum.push(0);
    }
    pvList.forEach(function(item){
        for(var i=0; i<numberOfParties; i++){
            sum[i] += item.voices[i];
        }
    });
    return sum;
}



var mot = "bonjour mes amis";

module.exports = {
    listPvs(req,res) {
        axios.get(config.blochainApiUri+'Pv')
            .then(function (response) {
                var sum = sumVoices(response.data);
                res.status(200).send(sum);
            })
            .catch(function (error) {
                res.status(400).send(error.response.data.errors[0].message)
            })
    },
    description(req,res){
        return res.status(200).send(mot);
    }
};

