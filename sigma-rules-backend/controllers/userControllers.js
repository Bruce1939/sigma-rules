const User = require('../models/userModel');
const Rule = require('../models/ruleModel');

const userProfileController = async (req,res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id }).select('-password');
        const rules = await Rule.find({ postedBy: id })
                                .populate('postedBy', '_id username')
                                .populate('comments.postedBy', '_id username');
        return res.json({ user, rules });
    } catch (error) {
        console.log(error);
        return res.json({ internalError: error });
    }
};

const followUserController = async (req,res) => {
    try {
        const { userId } = req.params;
        const { user } = req;
        const followedUser = await User.findByIdAndUpdate(userId, {
            $push: { followers: user._id }
        }, {
            new: true
        }).select('-password').select('-email');
        const followerUser = await User.findByIdAndUpdate(user._id, {
            $push: { following: userId }
        }, {
            new: true
        }).select('-password').select('-email');
        const followedUserRules = await Rule.find({ postedBy: userId })
                                    .populate('postedBy', '_id username')
                                    .populate('comments.postedBy', '_id username');
        return res.json({ followedUser, followerUser, followedUserRules });
    } catch (error) {
        console.log(error);
        return res.json({ internalError: error });
    }
};

const unfollowUserController = async (req,res) => {
    try {
        const { userId } = req.params;
        const { user } = req;
        const unfollowedUser = await User.findByIdAndUpdate(userId, {
            $pull: { followers: user._id }
        }, {
            new: true
        });
        const unfollowerUser = await User.findByIdAndUpdate(user._id, {
            $pull: { following: userId }
        }, {
            new: true
        });
        const unfollowedUserRules = await Rule.find({ postedBy: userId })
                                                .populate('postedBy', '_id username')
                                                .populate('comments.postedBy', '_id username');
        return res.json({ unfollowedUser, unfollowerUser, unfollowedUserRules });
    } catch (error) {
        console.log(error);
        return res.json({ internalError: error });
    }
}; 

module.exports = { 
    userProfileController,
    followUserController,
    unfollowUserController
};