require('./utilis/db.connection')()
const Block = require('./model/block_info.model')
const Node_Info = require('./model/node_info.model')
const Coins = require('./model/supply_coins.model')
const Transaction = require('./model/transactions.model')
async function name() {

    const dub_Block = await Block.aggregate([{
            $group: {
                _id: { height: "$block_meta.header.height" },
                count: { $sum: 1 }
            }
        },
        {
            $match: {
                count: { "$gt": 1 }
            }
        }
    ]);
    console.log('Duplicate Blocks: ', dub_Block);

    const dub_Node = await Node_Info.aggregate([{
            $group: {
                _id: { height: "$application_version.commit" },
                count: { $sum: 1 }
            }
        },
        {
            $match: {
                count: { "$gt": 1 }
            }
        }
    ]);
    console.log('Duplicate Node info: ', dub_Node);

    const dub_Coins = await Coins.aggregate([{
            $group: {
                _id: { height: "$height" },
                count: { $sum: 1 }
            }
        },
        {
            $match: {
                count: { "$gt": 1 }
            }
        }
    ]);
    console.log('Duplicate Coins: ', dub_Coins);

    const dub_txs = await Transaction.aggregate([{
            $group: {
                _id: { txhash: "$txhash" },
                count: { $sum: 1 }
            }
        },
        {
            $match: {
                count: { "$gt": 1 }
            }
        }
    ]);
    console.log('Duplicate txs: ', dub_txs);
}
name()