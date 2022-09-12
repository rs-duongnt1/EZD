import * as mongoose from 'mongoose';

export const DeploymentSChema = new mongoose.Schema(
  {
    projectId: {
      type: String,
      required: [true, 'projectId can not be empty'],
    },
    state: {
      type: String,
      required: [true, 'State can not be empty'],
    },
    url: {
      type: String,
    },
    readyAt: {
      type: Number,
    },
    buildingAt: {
      type: Number,
    },
    target: {
      type: String,
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

DeploymentSChema.pre('validate', function (next) {
  next();
});
