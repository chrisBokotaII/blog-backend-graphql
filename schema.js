const typeDefs = ` #graphql
type User{
user_id: ID!
name: String!
email: String!
password: String!
posts: [Post!]

 
}
type Post {
post_id: ID!
title: String!
content: String!
published: Boolean!
user_id: User!
comment: [Comment!]
}

type Comment {
comment_id: ID!
user_id:User!
text: String!
post_id: Post!

}
type Subscription{
    newPost:Post
}
type loginResponce{
    user_id:ID! 
    name:String! 
    email:String!
    token:String! 
}
type registerResponce{
    user_id:ID! 
    name:String! 
    email:String!
    token:String!

}


type Query {
users: [User!]!
user(user_id: ID!): User!
posts: [Post!]
post(post_id: ID!): Post!
comments: [Comment!]
comment(comment_id: ID!): Comment!
}
type Mutation {
createUser(name: String!, email: String!, password: String!): registerResponce!
login(email:String!, password:String!): loginResponce!

createPost(input:postInput!): Post!

updatePost(input:updatePostInput!): Post!

deletePost(post_id: ID!): Boolean

createComment(text: String!, user_id: ID!, post_id: ID!): Comment!



deleteComment(comment_id: ID!): Boolean
}

input postInput {
title: String!
content: String!
published: Boolean!
user_id: ID

}
input updatePostInput {
post_id: ID!
title: String
content: String
published: Boolean
}










`;
module.exports = typeDefs;
