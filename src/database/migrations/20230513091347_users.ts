import  {Knex} from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('users', (table) => {
        table.uuid('id').defaultTo(knex.raw('gen_random_uuid()'));
        table.string('email').notNullable().unique()
        table.string('name').notNullable()
        table.string('password').notNullable()
      })
}


export async function down(knex: Knex) {
    return knex.schema.dropTable('users')
}