const Rule = require('../models/ruleModel');

/*
json response for getrules getallrules controllers
{
    "rules": [
        {
            "_id": "6209357daa1bafa7981cdb6a",
            "rule": "testing rule",
            "image": "",
            "postedBy": {
                "_id": "6202dc69436a6bb86bbafad3",
                "username": "user"
            },
            "likes": [],
            "comments": [
                {
                    "text": "testing comment",
                    "postedBy": {
                        "_id": "6202dc69436a6bb86bbafad3",
                        "username": "user"
                    },
                    "_id": "62093689aa1bafa7981cdb82"
                },
                {
                    "text": "testing comment",
                    "postedBy": {
                        "_id": "6202dc69436a6bb86bbafad3",
                        "username": "user"
                    },
                    "_id": "62093fbe4aba7b3a7edaa018"
                }
            ],
            "createdAt": "2022-02-13T16:44:45.916Z",
            "updatedAt": "2022-02-13T17:28:30.706Z",
            "__v": 0
        },
        {
            "_id": "6209402da4835e428217ab07",
            "rule": "testing 123",
            "image": "",
            "postedBy": {
                "_id": "6202dc69436a6bb86bbafad3",
                "username": "user"
            },
            "likes": [],
            "comments": [],
            "createdAt": "2022-02-13T17:30:21.592Z",
            "updatedAt": "2022-02-13T17:30:21.592Z",
            "__v": 0
        }
    ]
}
*/

const getRulesController = async (req,res) => {
    try {
        const { user } = req;
        const userPosts = await Rule.find({ postedBy: user._id })
            .populate('postedBy', 'id username')
            .populate('comments.postedBy', '_id username');
        return res.json({ rules: userPosts});
    } catch (error) {
        console.log(error);
        return res.json({ internalError: error });
    }
}

const getAllRulesController = async (req,res) => {
    try {
        const allPosts = await Rule.find()
            .populate('postedBy', 'id username')
            .populate('comments.postedBy', '_id username');
        return res.json({ rules: allPosts });
    } catch (error) {
        console.log(error);
        return res.json({ internalError: error });
    }
}

const getSubRulesController = async (req,res) => {
    try {
        const { user } = req;
        const allPosts = await Rule.find({ postedBy: { $in: user.following} })
            .populate('postedBy', 'id username')
            .populate('comments.postedBy', '_id username');
        return res.json({ rules: allPosts });
    } catch (error) {
        console.log(error);
        return res.json({ internalError: error });
    }
}

const addRuleController = async (req,res) => {
    try {
        const { user } = req;
        const { rule, image } = req.body;
        const post = await Rule.create({ rule, image, postedBy: user });
        return res.json({ created: true });
    } catch (error) {
        console.log(error);
        return res.json({ internalError: error });
    }
}

const deleteRuleController = async (req,res) => {
    try {
        const { ruleId } = req.params;
        const { user } = req;
        const rule = await Rule.findById({ _id: ruleId }).populate('postedBy', 'id username');
        if (!rule) return res.json({ error: 'rule doesn\'t exists' });
        if (rule.postedBy._id.toString() !== user._id.toString()) return res.json({ error: 'unauthorized' });
        rule.remove();        
        return res.json({ ruleDeleted: true });
    } catch (error) {
        console.log(error);
        return res.json({ internalError: error });
    }
}

/*
json response for like unlike and comment controllers
{
    "rule": {
        "_id": "6209357daa1bafa7981cdb6a",
        "rule": "testing rule",
        "image": "",
        "postedBy": {
            "_id": "6202dc69436a6bb86bbafad3",
            "username": "user"
        },
        "likes": [
            "6202dc69436a6bb86bbafad3"
        ],
        "comments": [
            {
                "text": "testing comment",
                "postedBy": {
                    "_id": "6202dc69436a6bb86bbafad3",
                    "username": "user"
                },
                "_id": "62093689aa1bafa7981cdb82"
            }
        ],
        "createdAt": "2022-02-13T16:44:45.916Z",
        "updatedAt": "2022-02-13T17:26:35.680Z",
        "__v": 0
    }
}
*/

const likeRuleController = async (req,res) => {
    try {
        const { ruleId } = req.params
        const { user } = req;
        const likedRule = await Rule.findByIdAndUpdate(ruleId, {
            $push: { likes: user._id }
        }, {
            new: true
        }).populate('postedBy', 'id username')
        .populate('comments.postedBy', '_id username');
        return res.json({ rule: likedRule });
    } catch (error) {
        console.log(error);
        return res.json({ internalError: error });
    }
}

const unlikeRuleController = async (req,res) => {
    try {
        const { ruleId } = req.params
        const { user } = req;
        const unlikedRule = await Rule.findByIdAndUpdate(ruleId, {
            $pull: { likes: user._id }
        }, {
            new: true
        }).populate('postedBy', 'id username')
        .populate('comments.postedBy', '_id username');
        return res.json({ rule: unlikedRule });
    } catch (error) {
        console.log(error);
        return res.json({ internalError: error });
    }
}

const commentController = async (req,res) => {
    try {
        const { text } = req.body;
        const { ruleId } = req.params
        const { user } = req;
        const comment = { text, postedBy: user._id };
        const commentedRule = await Rule.findByIdAndUpdate(ruleId, {
            $push: { comments: comment }
        }, {
            new: true
        }).populate('comments.postedBy', 'id username')
        .populate('postedBy', 'id username');
        return res.json({ rule: commentedRule });
    } catch (error) {
        console.log(error);
        return res.json({ internalError: error });
    }
}

module.exports = {
    getRulesController,
    getAllRulesController,
    getSubRulesController,
    addRuleController,
    deleteRuleController,
    likeRuleController,
    unlikeRuleController,
    commentController
};