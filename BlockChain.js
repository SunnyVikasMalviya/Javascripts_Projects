function to_hash(var word){
$.ajax(
{
	type : "POST",
	ur : "C:\MvikBack\Python\ToUpload\Hashing.py",
	data : word;
	success : function(response)
				{
					return response;
				}
	error : function(error)
				{
					return error;
				}
});
}


class Block
{
	constructor(index, timestamp, data,previousHash = '')
	{
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
	}
	
	calculateHash()
	{
		return to_hash(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
	}
}

class Blockchain
{
	constructor()
	{
		this.chain = [this.createGenesisBlock()];
	}
	
	createGenesisBlock()
	{
		return new Block(0, "29/08/2019", "Genesis Block", "0");
	}
	
	getLatestBlock()
	{
		return this.chain[this.chain.lenght-1];
	}
	
	addBlock()
	{
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}
	
	isChainValid()
	{
		for(let i = 1; i < this.chain.length; i++)
		{
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i-1];
			
			if(currentBlock.hash !== currentBlock.calculateHash())
			{
				return false;
			}
			
			if(previousBlock.hash !== currentBlock.previousHash)
			{
				return false;
			}
		}
		return true;
	}
}


let Coin = new Blockchain();
Coin.addBlock(new Block(1, "30/08/2019", {amount: 4}));
Coin.addBlock(new Block(2, "30/08/2019", {amount: 10}));

console.log(JSON.stringify(Coin, null, 4));
