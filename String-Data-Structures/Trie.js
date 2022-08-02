// Trie: Well known data structure. Look it up.

function Trie(strArray=[]){
    this.charToTrieDict = new Map();
    this.marked = false;
    for(let str of strArray){
        this.add(str);
    }
}

Trie.prototype.add = function(string){
    if(string === ''){
        this.marked = true;
        return;
    }

    const [firstChar, restOfString] = getFirstAndRest(string);

    if(this.charToTrieDict.has(firstChar)){
        this.charToTrieDict.get(firstChar).add(restOfString);
    }
    else{
        this.charToTrieDict.set(firstChar,new Trie([restOfString]));
    }
}

Trie.prototype.has = function(string){
    if(string === ''){
        return this.marked;
    }
    const [firstChar, restOfString] = getFirstAndRest(string);

    if(this.charToTrieDict.has(firstChar)){
        return this.charToTrieDict.get(firstChar).has(restOfString);
    }
    else{
        return false;
    }
}

// Gets first Unicode char instead of UTF-16 code unit. 
function getFirstAndRest(str){
    let iter = str[Symbol.iterator]();
    let first = iter.next().value;
    let rest = [...iter].join('');
    return [first,rest];
}



export default Trie;