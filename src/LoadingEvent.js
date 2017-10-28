/**
 * Created by roney on 2017/9/20.
 */
const EventEmitter=require('events');
class FlexLoadingEmitter extends EventEmitter{}

export const LoadingEvent=new FlexLoadingEmitter();
export const EVENT_LOCAL_HADNDLED='EVENT_LOCAL_HADNDLED';
