
const axios = require('axios')
const config=require("../config/configs");

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


var monObjet = {
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
console.log(obj1.list.data)






let mot = "bonjour mes amis";

module.exports = {
    listPvs(req,res) {
        axios.get(config.blochainApiUri+'Pv')
            .then(function (response) {
                res.status(200).send(response.data)
            })
            .catch(function (error) {
                res.status(400).send(error.response.data.errors[0].message)
            })
    },
    description(req,res){
        return res.status(200).send(mot);
    }
};

