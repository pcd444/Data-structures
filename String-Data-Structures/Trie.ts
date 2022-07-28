'use strict';


class TypedTrie{
    charToTrieDict: Map<string,TypedTrie>;
    marked:boolean;

    constructor(strArray:Array<string>){
        this.charToTrieDict = new Map();
        this.marked = false;
        for(let str of strArray){
            this.add(str);
        }
    }

    add(str:string){
        if(str === ''){
            this.marked = true;
            return;
        }
    
        const firstChar = str[0];
        const restOfString = str.slice(1);
        const possibleTrie = this.charToTrieDict.get(firstChar);
        if(possibleTrie instanceof TypedTrie){
            possibleTrie.add(restOfString);
        }
        else{
            this.charToTrieDict.set(firstChar,new TypedTrie([restOfString]));
        }
    }

    has(str:string):boolean{
        if(str === '')
            return this.marked;
        const firstChar = str[0];
        const restOfString = str.slice(1);
        const possibleTrie = this.charToTrieDict.get(firstChar);
        if(possibleTrie instanceof TypedTrie){
            return possibleTrie.has(restOfString);
        }
        else{
            return false;
        }
    }
}

export default TypedTrie;