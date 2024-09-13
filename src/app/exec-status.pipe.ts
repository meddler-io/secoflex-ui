import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'execStatus',
})
export class ExecStatusPipe implements PipeTransform {

  transform(exec_status: string): string {
    let _status: string;

    switch (exec_status) {
      case 'FAILURE':
      case 'TIMEOUT':
        _status = 'danger';
        break;
      case 'SUCCESS':
        _status = 'success';
        break;

      case 'COMPLETED':
        _status = 'success';
        break;
      case 'ENQUEUED':
      case 'INITIATED':
        _status = 'primary';
        break;
      case 'UNKNOWN':
        _status = 'basic';
        break;
      default:
        _status = 'unknown';  // For unexpected values
        break;
    }

    return _status;
  }


}
