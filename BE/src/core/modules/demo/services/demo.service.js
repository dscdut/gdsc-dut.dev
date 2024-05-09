import { Optional } from "core/utils";
import { DemoRepository } from "../demo.repository";

class Service {
    constructor(){
        this.repository = DemoRepository
    }
  
    async findAll() {
        return this.repository.findAll();
    }
    async findById(id) {
       return  await this.repository.findById(id)
                
    }
    async createOne (createDemoDto){
          return await this.repository.createOne(createDemoDto)
    }
    async updateOne (id, updateDemoDto) {
        return await this.repository.updateOne(id, updateDemoDto)
    }
    async deleteOne(id) {
        return await this.repository.deleteOne(id)
    }
}
export const DemoService = new Service()