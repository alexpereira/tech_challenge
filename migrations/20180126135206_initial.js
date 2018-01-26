
module.exports.up = async db => {
  await db.schema.createTable('users', table => {
    table.string('username');
    table.string('password');
  });
};

module.exports.down = async db => {
  await db.schema.dropTableIfExists('users');
};
