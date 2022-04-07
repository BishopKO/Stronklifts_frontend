const initState = [];

const emptyExercise = { exc: '', ser: 0, reps: 0, weight: 0, unit: 'kg' };

const reducer = (state = initState, action) => {
  // console.log("Reducer:", state, action);
  const { type, payload } = action;

  switch (type) {
    case 'set_data':
      return [...payload];
    case 'update_data': {
      const { workout_number, exercise_number, value } = payload;
      state[workout_number][exercise_number] = value;
      return [...state];
    }
    case 'remove_exercise': {
      const { workout_number, exercise_number } = payload;
      state[workout_number] = state[workout_number].filter((item, index) => {
        if (index !== exercise_number) {
          return item;
        }
      });
      return [...state];
    }
    case 'add_exercise':
      state[payload].push(emptyExercise);
      return [...state];
    default:
      return [...state];
  }
};

export default reducer;
