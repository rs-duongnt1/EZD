import * as mongoose from 'mongoose';

export const TeamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name can not be empty'],
    },
    slug: {
      type: String,
      required: [true, 'Slug can not be empty'],
    },
    createdAt: {
      type: Number,
    },
    updatedAt: {
      type: Number,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    // toObject: {
    //   virtuals: true,
    //   versionKey: false,
    //   transform: transformValue,
    // },
    // toJSON: {
    //   virtuals: true,
    //   versionKey: false,
    //   transform: transformValue,
    // },
  },
);

TeamSchema.pre('validate', function (next) {
  next();
});
