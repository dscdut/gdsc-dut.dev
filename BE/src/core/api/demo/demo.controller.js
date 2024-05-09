import { CreateDemoDto, UpdateDemoDto } from "core/modules/demo/dto"
import { DemoService } from "core/modules/demo/services/demo.service"
import { MediaService } from "core/modules/document"
import { UploadFileDto } from "core/modules/document/upload-file.dto"
import { ValidHttpResponse } from "packages/handler/response/validHttp.response"
class Controller {
    constructor(){
        this.services = DemoService
        this.service = MediaService
    }
    findAll = async () => {
       const data = await this.services.findAll()
       return ValidHttpResponse.toOkResponse(data)
    }
    findById = async req => {
        const data = await this.services.findById(req.params.id)
        return ValidHttpResponse.toOkResponse(data)
    }
    createOne = async req => {
        const data = await this.services.createOne(CreateDemoDto(req.body))
        return ValidHttpResponse.toOkResponse(data)
    }

    updateOne = async req => {
       const data = await this.services.updateOne(req.params.id, UpdateDemoDto(req.body))
        return ValidHttpResponse.toOkResponse(data)
    }
    deleteOne = async req => {
        const data = await this.services.deleteOne(req.params.id)
        return ValidHttpResponse.toOkResponse(data)
    }
    uploadMany = async req => {
        const data = await this.service.uploadMany(req.files, UploadFileDto(req.body).folderName)
        return ValidHttpResponse.toOkResponse(data)
    }
}
export const DemoController = new Controller()