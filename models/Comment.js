var mongoose = require('mongoose'); 

<<<<<<< HEAD
var CommentSchema = new mongoose.Schema({
    content: String, 
    user:  {
      type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
=======
var CommentSchema = new mongoose.Schema){
  content: 'String', 
  user: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User' 
  }
>>>>>>> de68a5b059bca0c2f0b291f04503e2bef9d38f89
});

var Comment = mongoose.model('Comment', CommentSchema); 

module.exports = Comment;