import { JwtHelper } from "./helpers/jwt-helper";
import { AuthenticationService } from "./services/authentication.service";
import { LocalStorageManagerService } from "./services/local-store-manager.service";

export const appInitializerProviders = [ AuthenticationService, LocalStorageManagerService, JwtHelper ];