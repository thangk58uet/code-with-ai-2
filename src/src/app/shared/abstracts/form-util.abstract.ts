import { FormType } from '@shared/models/form-type.model';

export abstract class FormUtilAbstractComponent {
    constructor() {
    }

    getFormItem(item: FormType<any>[], formControlName: string) {
      return item.find(x => x.key === formControlName);
    }
}
