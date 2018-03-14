export default function Reducers(state = {}, action) {
  const { type } = action;
  if (action.progress) {
    delete action.type;
  } else {
    action = action.loading;
  }
  return { ...state, [type]: action };
}
