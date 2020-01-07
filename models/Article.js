var mongoose = require('mongoose');
var User = mongoose.model('User');
/**
 * @slug => a short name given to an article that is in production.
 * @title => title of the article
 * @description =>short brief of the article
 * @body => body of the article
 * @author => author of the article
 */
var ArticleSchema = new mongoose.Schema({
    slug: { type: String, lowercase: true, unique: true },
    title: String,
    description: String,
    body: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

ArticleSchema.pre('validate', function(next) {
    if (!this.slug) {
        this.slugify();
    }
    next();
});

ArticleSchema.methods.toJSONFor = function(user) {
    return {
        slug: this.slug,
        title: this.title,
        description: this.description,
        body: this.body,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        tagList: this.tagList,
        favorited: user ? user.isFavorite(this._id) : false,
        favoritesCount: this.favoritesCount,
        author: this.author.toProfileJSONFor(user)
    };
};

mongoose.model('Article', ArticleSchema);