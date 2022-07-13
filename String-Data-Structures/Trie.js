// Trie: Well known data structure. Look it up.

function Trie(strArray){
    this.charToTrieDict = new Map();
    this.marked = false;
    for(let str of strArray){
        this.add(str);
    }
}

InternalWildCardTrie.prototype.add = function(string){
    if(string === ''){
        this.marked = true;
        return;
    }

    const firstChar = string[0];
    const restOfString = string.slice(1);
    if(this.charToTrieDict.has(firstChar)){
        this.charToTrieDict.get(firstChar).add(restOfString);
    }
    else{
        this.charToTrieDict.set(firstChar,new InternalWildCardTrie([restOfString]));
    }
}

InternalWildCardTrie.prototype.has = function(string){
    if(string === ''){
        return this.marked;
    }
    const firstChar = string[0];
    const restOfString = string.slice(1);

    if(this.charToTrieDict.has(firstChar)){
        return this.charToTrieDict.get(firstChar).has(restOfString);
    }
    else{
        return false;
    }
}
