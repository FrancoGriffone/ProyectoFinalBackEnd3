import knex from 'knex'


class Tablas {


// Tabla productos
async prod(){
await knex.schema.dropTableIfExists('productos').then(() => {
    knex.schema.createTable('productos', (table) => {
        table.increments('id');
        table.string('title');
        table.float('price');
        table.string('thumbnail');
    }).then(() => {
        console.log('table product created')
    }).catch((err) => {
        console.log(err)
    }).finally(() => {
        knex.destroy();
    })
});
}


// Tabla Mensajes
async mess(){
await knexSql.schema.dropTableIfExists('mensajes').then(() => {
    knexSql.schema.createTable('mensajes', (table)=>{
        table.increments('id');
        table.string('author');
        table.string('text');
        table.string('date');
    }).then(() => {
        console.log('table message created')
    }).catch((err) => {
        console.log(err)
    }).finally(() => {
        knex.destroy();
    })
})
}
}

export default Tablas;
