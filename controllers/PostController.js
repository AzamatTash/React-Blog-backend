import PostModel from '../models/Post.js';

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post);
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось создать пост'
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const findItem = req.query;
        const {sort} = req.query;
        let posts;

        switch (sort)  {
            case 'views':
                posts = await PostModel.find(findItem).sort({viewsCount: -1}).populate('user').exec();
                break;
            case 'title':
                posts = await PostModel.find(findItem).sort({title: -1}).populate('user').exec();
                break;
            case 'date':
                posts = await PostModel.find(findItem).sort({createdAt: 1}).populate('user').exec();
                break;
            default:
                posts = await PostModel.find(findItem).sort({createdAt: -1}).populate('user').exec();
        }

        res.json(posts);
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось получить посты'
        });
    }
};

export const getOne = (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndUpdate(
            {
                _id: postId,
            },
            {
                $inc: { viewsCount: 1 },
            },
            {
                returnDocument: 'after',
            },
            (err, doc) => {
                if(err) {
                    return res.status(500).json({
                        message: 'Не удалось найти данный пост'
                    });
                }

                if(!doc) {
                    return res.status(404).json({
                        message: 'Пост не найдет'
                    })
                }

                res.json(doc);
            }
        ).populate('user');
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось получить пост'
        });
    }
};

export const remove = (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndRemove(
            {
                _id: postId,
            },
            (err, doc) => {
                if(err) {
                    return res.status(500).json({
                        message: 'Не удалось удалить данный пост'
                    });
                }

                if(!doc) {
                    res.status(404).json({
                        message: 'Пост не найдет'
                    })
                }

                res.json({
                    success: true,
                });
            }
        );
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось удалить пост'
        });
    }
};

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne(
            {
                _id: postId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags,
                user: req.userId,
            },
        );

        res.json({
            success: true,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось обнавить пост'
        });
    }
};

export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec();

        const tags = posts.map(obj => obj.tags).flat().slice(0,5);

        res.json(tags);
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось получить теги'
        });
    }
};

