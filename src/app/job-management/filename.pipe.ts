import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filename'
})
export class FilenamePipe implements PipeTransform {

  getFilename(filepath: string) {

    if (filepath.endsWith('/')) {
      return filepath.split('/').slice(-2)[0]

    } else {
      if (filepath.indexOf('/') == -1)
        return filepath
    }
    
    return filepath.split('/').slice(-1)[0]
  }

  transform(value: string, ...args: unknown[]): unknown {
    return this.getFilename(value);
  }

}
