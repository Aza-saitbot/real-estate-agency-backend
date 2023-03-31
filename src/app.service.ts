import {Injectable} from "@nestjs/common";

@Injectable()
export class AppService {

    getUser() {
        return [{id: 1, name: 'aza'}]
    }
}