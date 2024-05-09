import { DataRepository } from "packages/restBuilder/core/dataHandler/data.repository";

class Repository extends DataRepository{
    findAll () {
        return this.query().select('*')
    }
    findById (id) {
        return this.query().select('*').where( 'demo.id', id)
                                     
    }
    createOne(data){
        return this.query().insert(data)
    }
    updateOne(id, data){
        return this.query().select('*').where('demo.id', id).update(data);
    }
    deleteOne(id) {
        return this.query().where('id', id).del()
    }
}
export const DemoRepository = new Repository('demo')
