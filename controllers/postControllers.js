import Post from '../models/Post.js';
import User from '../models/User.js';

export const fetchAll = async (req, res) => {
    try {
        const posts = await Post.find();
        console.log('Fetched All');
        res.send(posts);
    } catch (error) {
        console.log(error);
    }
}

export const createPost = async (req, res) => {
    try {
        const postData = req.body;
        let creatorId;
        if (req.custom) {
            creatorId = req.user._id;
        } else {
            creatorId = req.user.sub;
        }
        const newPost = new Post({ ...postData, creatorId, creatorName: req.user.given_name });
        await newPost.save();
        console.log('Created');
        res.send(newPost);
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post) {
            return res.send('Post not found');
        }
        const postData = req.body;
        const updatedPost = await Post.findByIdAndUpdate(id, { ...postData, id }, { new: true });
        await updatedPost.save();
        console.log('Updated');
        res.send(updatedPost);
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post) {
            return res.send('Post not found');
        }
        await Post.findByIdAndDelete(id);
        console.log('Deleted');
        res.send('Post Deleted Successfully');
    } catch (error) {
        console.log(error);
    }
}

export const likePost = async (req, res) => {
    try {
        let userId;
        if (req.custom) {
            userId = req.user._id;
        } else {
            userId = req.user.sub;
        }
        if (!userId) {
            return res.send('Unauthorised User');
        }
        const { id } = req.params;
        const post = await Post.findById(id);
        console.log(post.tags);
        if (!post) {
            return res.send('Post not found');
        }
        const index = post.likes.findIndex(id => id === String(userId));
        if (index === -1) {
            post.likes.push(userId);
            console.log('Liked');
        } else {
            post.likes = post.likes.filter(id => id !== String(userId));
            console.log('Disliked');
        }
        await post.save();
        res.send(post);
    } catch (error) {
        console.log(error);
    }
}

export const fetchBySearch = async (req, res) => {
    try {
        const { string } = req.params;
        const query= new RegExp(string, 'i');

        const searchedPosts = await Post.find({$or : [{title: query}, {description: query}, {tags: query}, {creatorName: query}]});

        // string && posts.map(post => {
        //     if (post.title.toLowerCase().search(string) >= 0 ||
        //         post.description.toLowerCase().search(string) >= 0 ||
        //         post.creatorName.toLowerCase().search(string) >= 0
        //     ) {
        //         searchedPosts.push(post);
        //     } else if(post.tags.map(tag => {
        //         if(tag.toLowerCase().search(string) >= 0){
        //             searchedPosts.push(post);
        //         }
        //     })){
    
        //     }
        // })
        console.log('Fetched By Search');
        console.log(searchedPosts.length);
        res.send(searchedPosts);
    } catch (error) {
        console.log(error);
    }
}