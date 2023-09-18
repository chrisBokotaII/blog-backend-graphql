exports.Subscription = {
  newPost: {
    subscribe: async (parent, args, { pubsub }) =>
      pubsub.asyncIterator("NEW_POST"),
  },
};
