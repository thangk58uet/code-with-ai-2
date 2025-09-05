import { AbstractControl } from '@angular/forms';
import { FILE_EXTENSION_SIGNATURE } from '@shared/constants/form-item.constant';
import { Observable, Observer, of } from 'rxjs';
export const generateFileValidator = (allowedFileExtension: string[], isTypeBase64: boolean) => {
    return (control: AbstractControl): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
        if (typeof (control.value) === 'string') {
            return of(null);
        }
        const file = control.value as File;
        const fileReader = new FileReader();

        const frObs = new Observable((observer: Observer<{ [key: string]: any }>) => {
            fileReader.addEventListener('loadend', () => {
                const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
                let header = '';
                let isValid = false;
                for (let i = 0; i < arr.length; i++) {
                    header += arr[i].toString(16);
                }
                
                if (allowedFileExtension) {
                    let fileNameSplit = file.name.split('.')
                    const type = fileNameSplit[fileNameSplit.length - 1];
                    
                    allowedFileExtension.forEach(fileType => {
                        const isAllowed = FILE_EXTENSION_SIGNATURE[fileType].findIndex(x => x === header);
                        if (isAllowed > -1 && fileType === type ) {
                            isValid = true;
                            return;
                        }
                    })
                }
                
                if (isValid) {
                    observer.next(null);

                    if (isTypeBase64) {
                        var reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => {
                            control.setValue(reader.result);
                        };
                        reader.onerror = function (error) {
                        };
                    }
                } else {
                    observer.next({ invalidMimeType: true });
                }

                observer.complete();
            });
            if (file) {
                fileReader.readAsArrayBuffer(file);
            }
        });

        return frObs;
    };
}