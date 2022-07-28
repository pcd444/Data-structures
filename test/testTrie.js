import assert from 'node:assert/strict';
import Trie from '../String-Data-Structures/Trie.js'

describe('Trie',function(){
    describe('basic unit tests',function(){
        it('unit test 1',function(){
            let t = new Trie([]);
            t.add('abc');
            assert.equal(t.has('abc'),true);
        });
        it('unit test 2',function(){
            let t = new Trie([]);
            t.add('abc');
            assert.equal(t.has('ab'),false);
        });
        it('Works on code points not code units', function(){
            let t = new Trie(['👫']);
            assert.equal(t.charToTrieDict.has('👫'),true);
        });
    });
    describe('generated testing', function(){
        it('Works on long ascii printable strings', function(){
            let randStrings = generateRandomPrintableAsciiStrings(100,100);
            let t = new Trie(randStrings);
            for(const str of randStrings)
                assert.equal(t.has(str),true);
        });
    });
})
const asciiPrintable = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'

function generateRandomPrintableAsciiStrings(length,number){
    return new Array(number).fill(null).map(()=>generateRandomPrintableAsciiString(length));
}


function generateRandomPrintableAsciiString(length){
    return choices(asciiPrintable,length).join('');
}

function choices(indexable,n){
    let output = new Array(n);
    for(let i = 0; i< n; i++)
        output[i] = choice(indexable);
    return output;
}

function choice(indexable){
    let length = indexable.length;
    if(typeof length !== 'number')
        throw new TypeError('Argument to choice must have a length property and indexes like an array or string.');
    return indexable[randIntLessThan(length)];
}

function randIntLessThan(upperBound){
    let rand = Math.random();
    return Math.floor(rand * upperBound);
}