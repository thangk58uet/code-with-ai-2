type HTTPMETHOD = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface Right {
  api: string;
  httpMethod: HTTPMETHOD;
  id: string;
  name: string;
  parentId: string | number;
}

interface Menus {
  manuId: number | string;
  manuName: string;
  parentId: number;
  url: string;
  sortOrder?: number;
  child?: Array<Menus>;
}

interface InfoUser {
  menus: Menus[];
  rights: Right[];
}

export interface Login {
  token: string;
  expires_in: number;
}
