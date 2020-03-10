module.exports = {
  name: 'todo-undo',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/todo-undo',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
