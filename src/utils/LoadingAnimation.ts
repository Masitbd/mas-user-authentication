import { stdout } from 'process';

export function startSpinner(params?: string) {
  const characters = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  const cursorEsc = {
    hide: '\u001B[?25l',
    show: '\u001B[?25h',
  };
  stdout.write(cursorEsc.hide);

  let i = 0;
  const timer = setInterval(function () {
    stdout.write('\r' + characters[i++] + ' ' + (params ?? ' '));
    i = i >= characters.length ? 0 : i;
  }, 150);

  return () => {
    clearInterval(timer);
    stdout.write('\r');
    stdout.write(cursorEsc.show);
    stdout.write('\n');
  };
}
