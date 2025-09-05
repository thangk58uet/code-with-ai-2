import { Injectable } from "@angular/core";
import CommonUtils from "@core/utils/utils";

@Injectable()
export class LocalStorageManagerService {
  public static readonly DBKEY_USER_DATA = "user_data";
  private static readonly DBKEY_SYNC_KEYS = "sync_keys";
  constructor() {}
  private syncKeys: string[] = [];

  public exists(key = LocalStorageManagerService.DBKEY_USER_DATA) {
    let data = sessionStorage.getItem(key);
    if (data == null) {
      data = localStorage.getItem(key);
    }
    return data != null;
  }

  public getData(key = LocalStorageManagerService.DBKEY_USER_DATA) {
    let data = this.sessionStorageGetItem(key);
    if (data == null) {
      data = this.localStorageGetItem(key);
    }
    return data;
  }

  private localStorageGetItem(key: string) {
    return CommonUtils.JSonTryParse(localStorage.getItem(key));
  }

  private sessionStorageGetItem(key: string) {
    return CommonUtils.JSonTryParse(sessionStorage.getItem(key));
  }

  public savePermanentData(data: any, key = LocalStorageManagerService.DBKEY_USER_DATA) {
    this.removeFromSessionStorage(key);
    this.localStorageSetItem(key, data);
  }

  private removeFromSessionStorage(keyToRemove: string) {
    this.removeFromSessionStorageHelper(keyToRemove);
    this.removeFromSyncKeysBackup(keyToRemove);
    localStorage.setItem("removeFromSessionStorage", keyToRemove);
    localStorage.removeItem("removeFromSessionStorage");
  }

  private removeFromSessionStorageHelper(keyToRemove: string) {
    sessionStorage.removeItem(keyToRemove);
    this.removeFromSyncKeysHelper(keyToRemove);
  }

  private removeFromSyncKeysBackup(key: string) {
    const storedSyncKeys = this.getSyncKeysFromStorage();
    const index = storedSyncKeys.indexOf(key);
    if (index > -1) {
      storedSyncKeys.splice(index, 1);
      this.localStorageSetItem(
        LocalStorageManagerService.DBKEY_SYNC_KEYS,
        storedSyncKeys
      );
    }
  }

  private removeFromSyncKeysHelper(key: string) {
    const index = this.syncKeys.indexOf(key);
    if (index > -1) {
      this.syncKeys.splice(index, 1);
    }
  }

  private localStorageSetItem(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  private getSyncKeysFromStorage(defaultValue: string[] = []): string[] {
    const data = this.localStorageGetItem(LocalStorageManagerService.DBKEY_SYNC_KEYS);
    if (data == null) {
      return defaultValue;
    } else {
      return data as string[];
    }
  }

  public clearAllStorage() {
    this.clearAllSessionsStorage();
    this.clearLocalStorage();
  }

  public clearAllSessionsStorage() {
    this.clearInstanceSessionStorage();
    // Remove DBKEY_SYNC_KEYS
    localStorage.removeItem(LocalStorageManagerService.DBKEY_SYNC_KEYS);
    // active trigger 'clearAllSessionsStorage' on other browser
    localStorage.setItem("clearAllSessionsStorage", "_dummy");
    localStorage.removeItem("clearAllSessionsStorage");
  }

  public clearLocalStorage() {
    localStorage.clear();
  }

  public clearInstanceSessionStorage() {
    sessionStorage.clear();
    this.syncKeys = [];
  }
}
