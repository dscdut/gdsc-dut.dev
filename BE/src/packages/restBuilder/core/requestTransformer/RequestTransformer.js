import { LockValidator } from '../../modules/validator/lock.validator';
import { PaginationFactory } from '../../modules/factory/pagination.factory';
import { SortFactory } from '../../modules/factory/sort.factory';
import { FilterFactory } from '../../modules/factory/filter.factory';
import { SearchFactory } from '../../modules/factory/search.factory';
/**
 * @notes This class consists of factory which will produce the final format
 {
        pagination: {
            page,
            size,
            offset
        },
        filters,
        sorts,
        search,
        main,
        associates,
        notDeleted
     }
 */
export class RequestTransformer {
    /**
     * Method to communicate with other classes
     * @type {{
        pagination: {
            page: number,
            size: number,
            offset: number
        },
        filters: [{column: string,sign: '$eq' | '$gt' | '$like',value: string}],
        sorts: [{sort, order}],
        search,
        main: string[],
        associates: string[],
        notDeleted: string[]
     }}
     */
    content;

    static paginationFactory = new PaginationFactory();

    static sortFactory = new SortFactory();

    static filterFactory = new FilterFactory();

    static searchFactory = new SearchFactory();

    /**
     * @notes: Validator work when constructor run
     */
    static constructValidator(content, locks) {
        LockValidator.builder()
            .applySortContext(content.sorts)
            .applyFilterContext(content.filters)
            .validate(locks);
    }

    constructorConverter(locks) {
        this.content.filters.forEach(filter => {
            filter.column = locks.filters.find(
                element => Object.keys(element)[0] === filter.column
            )[filter.column];
        });

        this.content.sorts.forEach(sortField => {
            sortField.sort = locks.sorts.find(
                element => Object.keys(element)[0] === sortField.sort
            )[sortField.sort];
        });
    }

    /**
     * @param {any} req from client
     * @param relationSchema backend definition in json schema file
     */
    constructor(req, relationSchema) {
        this.content = {};
        req.searchSchema = relationSchema?.searchCriteria;
        this.content.pagination = RequestTransformer.paginationFactory.produce(req);
        this.content.filters = RequestTransformer.filterFactory.produce(req, relationSchema?.locks.filters);
        this.content.sorts = RequestTransformer.sortFactory.produce(req, relationSchema?.locks.sorts);
        this.content.search = RequestTransformer.searchFactory.produce(req);
        this.content.main = relationSchema?.main;
        this.content.associates = relationSchema?.associates;
        this.content.notDeleted = relationSchema?.notDeleted;
        RequestTransformer.constructValidator(this.content, relationSchema?.locks);
        this.constructorConverter(relationSchema?.locks);
    }

    /**
     * ! All of these classes will provide method to add filter,sort,search !
     *                          via string method
     */

    setPage(page) {
        this.content.pagination.page = page;
        return this;
    }

    setSize(size) {
        this.content.pagination.size = size;
        return this;
    }

    clearPage() {
        this.content.pagination.page = null;
        return this;
    }

    clearSize() {
        this.content.pagination.size = null;
        return this;
    }

    setSearchValue(value) {
        this.content.search.value = value;
        return this;
    }

    addSearchCriteria(field) {
        this.content.search.criteria.push(field);
        return this;
    }

    addNotDeleted(notDeletedField) {
        this.content.notDeleted.push(
            notDeletedField
        );
        return this;
    }
}
