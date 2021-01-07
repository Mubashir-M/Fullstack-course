const FilterReducer = (state = '', action) => {

  switch(action.type) {
    case 'SET_SEARCH':
      return action.data
    default:
      return state
  }
}

export const setFilter = (search) => {
  return {
    type: 'SET_SEARCH',
    data: search
  }
}

export default FilterReducer