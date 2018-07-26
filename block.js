const crypto = require("crypto");
const Transaction = require("./transaction");
const Blockchain = require("./blockchain");
const Helper = require("./helper");

class Block {
    constructor(blockchain = new Blockchain()) {
        this._transactions = [];
        this._prev_hash = (blockchain.get_blocks_count() > 0) ?
            blockchain.get_recently_added_block()._hash : null;
        this._height = blockchain.get_blocks_count() + 1;
        this._hash = null;
        this._timestamp = new Date().getTime();
        this._transaction_count = 0;
    }

    _hash_transactions() {

        // TO-DO: Write your logic to hash all the transactions
        var current_hash="";
        for(var i=0;i<this._transactions.length;i++)
        {
            console.log('value of txn');
            //console.log(this._transactions[i]);
            var txn = current_hash.concat(JSON.stringify(this._transactions[i]));
            current_hash= Helper.sha256Hash(txn) ;
            console.log(txn);
            console.log(current_hash);
        }
        console.log(current_hash);
        return current_hash;
    }

    _hash_payload() {
        console.log('hash payload')
        return this._hash_transactions();
    }

    add_transaction(transaction) {
        this._transactions.push(transaction);
        this._transaction_count = this._transactions.length;
    }

    _hash_block() {

        // TO-DO: Write your logic to create block header with below details and return the hash value
        console.log('hash block calling')
        var payload_hash = this._hash_payload();
        let blockheader_data = {
            'payload_hash': payload_hash,
            'timestamp': this._timestamp,
            'prev_hash': this.prev_hash,
            'total_transactions': this._transaction_count
        };
        
       return Helper.sha256Hash(JSON.stringify(blockheader_data)); 
    }

    finalize() {
        if(this._hash == null) {
            this._hash = this._hash_block();
        } else {
            throw new Error("Block already finalized");
        }
    }

    validate() {
        // TO-DO: Write your logic to check whether the block is valid
        console.log('value of block ')
        console.log(this._hash == this._hash_block());
        return (this._hash == this._hash_block());
    }

    get_transaction_count() {
        return this._transaction_count;
    }
}

module.exports = Block;