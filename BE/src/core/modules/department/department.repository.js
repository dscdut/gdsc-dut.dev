import { DataRepository } from 'packages/restBuilder/core/dataHandler/data.repository';

class Repository extends DataRepository {
    findById(id) {
        return this.query().where('id', id).select().first();
    }

    findAll() {
        return this.query()
            .select('departments.id', 'departments.name')
            .count('members_gens.member_id as total_members')
            .leftJoin('members_gens', 'departments.id', 'members_gens.department_id')
            .groupBy('departments.id')
            .orderBy('departments.id', 'asc');
    }

    createOne(data) {
        return this.query().insert(data);
    }

    deleteOne(id) {
        return this.query().where('department_id', id).del().from('members_gens')
            .then(() => this.query()
                .where('id', id)
                .del());
    }

    updateOne(id, data) {
        return this.query().where('id', id).update(data);
    }
}

export const DepartmentRepository = new Repository('departments');
