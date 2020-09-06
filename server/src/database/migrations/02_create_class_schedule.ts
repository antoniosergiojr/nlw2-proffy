import knex from 'knex';

// fazer alteração
export async function up(knex: knex) {
    return knex.schema.createTable('class_schedule', table => {
        table.increments('id').primary();
        table.integer('week_day').notNullable();
        table.integer('from').notNullable();
        table.integer('to').notNullable();

        table.integer('class_id')
            .notNullable()
            .references('id')
            .inTable('classes')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    })
}

// desfazer alteração
export async function down(knex: knex) {
    return knex.schema.dropTable('class_schedule');
}