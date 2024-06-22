export const initialState = 0;

enum ActionsType {
  INC = "INC",
  DEC = "DEC",
  RESET = "RESET",
}

type CounterReducer = (
  state: number,
  action: { type: string; payload?: number }
) => number;

export const countReducer: CounterReducer = (state, action) => {
  switch (action.type) {
    case ActionsType.INC: {
      return state + action.payload!;
    }
    case ActionsType.DEC: {
      return state + 1;
    }
    case ActionsType.RESET: {
      return initialState;
    }

    default:
      return state;
  }
};
