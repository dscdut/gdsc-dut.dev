import { MediaResolver } from 'core/api/media';
import { ApiDocument } from 'core/config/swagger.config';
import { HandlerResolver } from '../../packages/handler/HandlerResolver';
import { DepartmentResolver } from './department/department.resolver';
import { PositionResolver } from './position/position.resolver';
import { MemberResolver } from './member/member.resolver';
import { GenResolver } from './gen/gen.resolver';
import { ProductResolver } from './product/product.resolver';
import { SponsorResolver } from './sponsor/sponsor.resolver';
import { EventResolver } from './event/event.resolver';
import { AuthGoogleResolver } from './auth/auth.resolver';

export const ModuleResolver = HandlerResolver.builder()
    .addSwaggerBuilder(ApiDocument)
    .addModule([
        MediaResolver,
        DepartmentResolver,
        PositionResolver,
        MemberResolver,
        SponsorResolver,
        GenResolver,
        ProductResolver,
        EventResolver,
        AuthGoogleResolver
    ]);
