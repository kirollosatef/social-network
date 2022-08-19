import Comment from "./comment.model";

const notfound = {
  code: 404,
  success: false,
  errors: [
    {
      key: "record",
      value: `record not found`,
    },
  ],
};

class commentRepo {
  static create = async (query: object = {}) => {
    const newComment = new Comment(query);
    return await newComment.save();
  };

  static list = async (query: object = {}) => {
    return await Comment.find(query);
  };

  static get = async (query: object = {}) => {
    return await Comment.findOne(query);
  };

  static update = async (query: object = {}, form: object = {}) => {
    const comment = await Comment.findOne(query);
    if (comment) {
      const isUpdeted = true;
      const newComment = {
        ...form,
        isUpdeted: isUpdeted,
      };
      return await Comment.updateOne(query, newComment);
    } else {
      return {
        ...notfound,
      };
    }
  };

  static delete = async (id: string, userId: string) => {
    const comment = await Comment.findOne({ _id: id, user: userId });
    if (comment) {
      return await Comment.deleteOne({ _id: id, user: userId });
    } else {
      return {
        ...notfound,
      };
    }
  };

  static addReact = async (id: string, userId: string, react: string) => {
    const comment = await Comment.findOne({ _id: id, user: userId });
    if (comment) {
      const newReact = {
        ...comment.reacts,
        react,
      };
      const newComment = {
        ...comment,
        reacts: newReact,
      };
      return await Comment.updateOne({ _id: id, user: userId }, newComment);
    } else {
      return {
        ...notfound,
      };
    }
  };

  static reply = async (commentId: string, query: object = {}) => {
    const newQuery = {
      ...query,
      isReply: {
        type: true,
        comment: commentId,
      },
    };
    const comment = new Comment(newQuery);
    return await comment.save();
  };
}

export default commentRepo;
