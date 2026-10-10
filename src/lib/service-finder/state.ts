import { finderIntentById, type FinderIntentId } from "@/content/site/service-finder";

export type FinderStep = "choose" | "result";

export type FinderState = {
  step: FinderStep;
  intentId: FinderIntentId | null;
};

export const initialFinderState: FinderState = {
  step: "choose",
  intentId: null,
};

export type FinderAction =
  | { type: "choose"; intentId: string }
  | { type: "back" }
  | { type: "restart" };

export function reduceFinder(state: FinderState, action: FinderAction): FinderState {
  if (action.type === "restart") return initialFinderState;
  if (action.type === "back") return { step: "choose", intentId: state.intentId };
  const intent = finderIntentById(action.intentId);
  if (!intent) return state;
  return { step: "result", intentId: intent.id };
}
