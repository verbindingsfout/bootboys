import httpService from "./httpClient";
import { AddressApi } from "./Adress";
import { DockApi } from "./Dock";
import { UserApi } from "./User";

export const Api = {
    dock: DockApi(httpService),
    address: AddressApi(httpService),
    user: UserApi(httpService)
};

