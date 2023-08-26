"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const reviews_controller_1 = require("./reviews/reviews.controller");
const reviews_service_1 = require("./reviews/reviews.service");
const reviews_module_1 = require("./reviews/reviews.module");
const typeorm_1 = require("@nestjs/typeorm");
const ormconfig_1 = require("../ormconfig");
const movies_module_1 = require("./movies/movies.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({ useFactory: ormconfig_1.ormConfig }),
            movies_module_1.MoviesModule,
            reviews_module_1.ReviewsModule,
        ],
        controllers: [app_controller_1.AppController, reviews_controller_1.ReviewsController],
        providers: [app_service_1.AppService, reviews_service_1.ReviewsService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map