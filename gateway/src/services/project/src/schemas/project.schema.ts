import * as mongoose from 'mongoose';

export const ProjectSChema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name can not be empty'],
    },
    teamId: {
      type: String,
      required: [true, 'Team can not be empty'],
    },
    slug: {
      type: String,
      required: [true, 'Name can not be empty'],
    },
    gitUri: {
      type: String,
    },
    framework: {
      type: String,
      required: [true, 'Framework can not be empty'],
    },
    status: {
      type: String,
      required: [true, 'Status can not be empty'],
    },
    deletedAt: {
      type: Number,
      required: [false, 'Status can not be empty'],
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

ProjectSChema.path('framework').validate((value) => {
  if (['vue', 'react', 'angular'].includes(value)) {
    return Promise.resolve(true);
  }
  return Promise.resolve(false);
}, 'framework must is vue, react, or angular.');

ProjectSChema.pre('validate', function (next) {
  next();
});
