// Wild Card Trie: Like a trie but supports searches with a wildcard '*'. Wildcard will substitute for any character once.
// example: The search "ca*" matches "cat" but not "cats"

function WildCardTrie(strArray){
    if(strArray.some(str =>str.includes('*')))
        throw new RangeError("A wildcardTrie cannot contain strings that contain '*' because '*' serves as the wildcard.")
    this._internalWildCardTrie = new InternalWildCardTrie(strArray);
}

WildCardTrie.prototype.add = function(word){
    if(word.includes('*'))
        throw new RangeError("A wildcardTrie cannot contain strings that contain '*' because '*' serves as the wildcard.")
    this._internalWildCardTrie.add(word);
}

WildCardTrie.prototype.has = function(word){
    return this._internalWildCardTrie.has(word);
}

function InternalWildCardTrie(strArray){
    this.charToTrieDict = new Map();
    this.marked = false;
    for(let str of strArray){
        this.add(str);
    }
}

InternalWildCardTrie.prototype.add = function(word){
    if(word === ''){
        this.marked = true;
        return;
    }

    const firstChar = word[0];
    const restOfWord = word.slice(1);
    if(this.charToTrieDict.has(firstChar)){
        this.charToTrieDict.get(firstChar).addWord(restOfWord);
    }
    else{
        this.charToTrieDict.set(firstChar,new InternalWildCardTrie([restOfWord]));
    }
}

InternalWildCardTrie.prototype.has = function(word){
    if(word === ''){
        return this.marked;
    }
    const firstChar = word[0];
    const restOfWord = word.slice(1);

    if(firstChar === "*"){
        // Wildcard matches every character. We now have to search every subtrie.
        for(let trie of this.charToTrieDict.values())
            if(trie.has(restOfWord))
                return true;
        return false;

    }
    if(this.charToTrieDict.has(firstChar)){
        return this.charToTrieDict.get(firstChar).has(restOfWord);
    }
    else{
        return false;
    }
}

export default WildCardTrie;