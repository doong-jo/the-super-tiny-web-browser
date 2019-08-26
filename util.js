function comparePropertyValue(propertyNames, instA, instB, resultString){
    if(!instA || !instB){
        throw new Error('입력한 instance가 유효하지 않습니다.');
    }

    if(!Array.isArray(propertyNames)){
        throw new Error('propertyNames parameter is not array');
    }

    let consider = [];    
    for(let property of propertyNames){
        if(!instA.hasOwnProperty(property) || !instB.hasOwnProperty(property)){
            console.log('wtf', property);
            throw new Error('해당 property가 없습니다.');
        }

        if(Array.isArray(instA[property])){
            consider.push(instA[property].equals(instB[property]));
        } else {
            consider.push(instA[property] === instB[property]);
        }    
    }
    
    if( consider.every((v) => { return v; }) ) {
        return resultString;
    } else {
        return false;
    }
}

module.exports = { comparePropertyValue };