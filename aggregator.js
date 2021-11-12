'use strict';

exports.aggregate =function (result, method){


    switch(method){
        case 'getMusic':
            return music(result);
        break;
        case 'getTemperature':
            return temperature(result);
        break;
    }


}


function music(result){
    
    var reqMap = new Map();

  

    result.forEach(musicList => {
        musicList.forEach(genre =>{

            if(reqMap.get(genre) == null)
                reqMap.set(genre, { frequency: 1});
            else{
                reqMap.set(genre, { frequency: reqMap.get(genre).frequency+1});
            }
        });
        
    });
    


    let jsonObject = {};  
    reqMap.forEach((value, key) => {  
        jsonObject[key] = value  
    });  
    
    
    
    return jsonObject;

}

function temperature(result){
    
    var finalResult=0;
    
    
    result.forEach(element => {
        finalResult=finalResult+element
    });

    finalResult=finalResult/result.length
    finalResult=finalResult.toFixed(2)

    //Formated in JSON
    finalResult={"avg" : finalResult}
    
    return finalResult

}