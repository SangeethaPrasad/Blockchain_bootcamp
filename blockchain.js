const fs = require("fs");

class Blockchain {
    constructor() {
        this._blocks = [];
    }



    get_blocks() {
        return this._blocks;
    }

    add_block(block) {
        this._blocks.push(block);
    }

    get_blocks_count() {
        return this._blocks.length;
    }

    get_recently_added_block() {
        if (this.get_blocks_count() > 0) {
            return this._blocks.slice(-1).pop();
        }
        return null;
    }

     validate_chain() {
        // TO-DO: Write your logic to check whether the whole chain is valid
     
        for(var i=0 ;i<this._blocks.length; i++)
        { 
            console.log('value of the first block in chain');
            console.log('value'+this._blocks[i]._prev_hash);
            console.log('value 2'+this._blocks[i]._hash);

            /*if(this._blocks[i]._hash !== Block._hash_block()) 
            return false;*/

            if(i > 0 && this._blocks[i]._prev_hash != this._blocks[i-1]._hash)
            return false;
        }
        return true;
        }
    }

module.exports = Blockchain;