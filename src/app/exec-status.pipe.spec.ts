import { ExecStatusPipe } from './exec-status.pipe';

describe('ExecStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new ExecStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
