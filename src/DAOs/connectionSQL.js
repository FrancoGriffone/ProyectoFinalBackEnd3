import knex from 'knex';

class ConnectionSQL {
    constructor(table, config){
        this.db = knex(config);
        this.table = table;
    }

    async getAll(){
        try{
            return await this.db.select("*").from(this.table)
        }catch(err){
            throw new Error(`Couldn't be found: ${err}`)
        }
    }
    async getById(id){
        try{
            return await this.db.select('*').from(this.table).where('id', id);
        }catch (err){
            throw new Error(`Can't be found: ${err}`)
        }
    }

    async save(data){
        try{
            return await this.db.insert(data).into(this.table)
        }catch(err){
            throw new Error(`Can't save: ${err}`)
        }
    }

    async deleteById(id){
        try{
            return this.db.delete().from(this.table).where('id', id)
        }catch (err){
            throw new Error(`Can't be deleted : ${err}`)

        }        
    }

    async deteleAll(){
        try {
            return this.db.delete().from(this.table)
        } catch (err) {
            throw new Error(`Can't delete: ${err}`)
        }
    }

    // Configurar el actualizar. Quizá es
    /* return this.db.from(this.table).where('id', data.id).update(data)*/

}

export default ConnectionSQL;