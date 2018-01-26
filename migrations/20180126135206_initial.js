
exports.up = function(knex, Promise) {
  await db.schema.createTable('users', table => {
  table.string('username');
  table.string('password');
});
};

exports.down = function(knex, Promise) {
  await db.schema.dropTableIfExists('users');
};
