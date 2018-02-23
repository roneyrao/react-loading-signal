// @Flow
const EventEmitter = require('events');

class FlexLoadingEmitter extends EventEmitter {}

export const LoadingEvent: FlexLoadingEmitter = new FlexLoadingEmitter();
export const EVENT_LOCAL_HADNDLED: string = 'EVENT_LOCAL_HADNDLED';
