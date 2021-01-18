import RxjsBus from '@21epub/rxjs-event-bus'
export const AppBus = new RxjsBus()

AppBus.register('Rotate$')
// AppBus.register('RequestAgain$');
