import { unlink } from 'fs';
import {
    InternalServerException,
    NotFoundException,
} from 'packages/httpException';
import { logger } from 'packages/logger';
import { cloudinaryUploader } from '../../../config/cloudinary.config';
import { MediaRepository } from '../media.repository';
import { Optional } from '../../../utils';
import { CreateMediaDto } from '../upload-file.dto';

class Service {
    constructor() {
        this.logger = logger;
        this.repository = MediaRepository;
    }

    async uploadOne(file, folderName = 'gdsc') {
        try {
            const response = await cloudinaryUploader.upload(file.path, {
                folder: folderName,
            });

            return Optional.of(
                await this.repository.createOne(CreateMediaDto(response)),
            )
                .throwIfNullable()
                .get()[0];
        } catch (error) {
            throw new InternalServerException(error.message);
        } finally {
            unlink(file.path, err => {
                if (err) {
                    this.logger.error(err.message);
                    throw new InternalServerException(err.message);
                }
            });
        }
    }

    async uploadMany(files, folderName = '') {
        const uploadTasks = files.map(file => this.uploadOne(file, folderName));
        return Promise.all(uploadTasks);
    }

    async deleteMany(ids) {
        const deleteTasks = ids.map(id => this.deleteOne(id));

        return Promise.all(deleteTasks);
    }

    async deleteOne(id) {
        const response = await cloudinaryUploader.destroy(id);
        return {
            id,
            ...response,
        };
    }

    async findById(id) {
        return Optional.of(await this.repository.findById(id))
            .throwIfNotPresent(new NotFoundException(`Image with id ${id} not found`))
            .get();
    }
}

export const MediaService = new Service();
