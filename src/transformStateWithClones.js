'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let newState = structuredClone(state);

  for (const act of actions) {
    newState = structuredClone(newState);

    if (act.type === 'addProperties') {
      for (const date in act.extraData) {
        newState[date] = act.extraData[date];
      }
      result.push(newState);
    }

    if (act.type === 'removeProperties') {
      for (const key of act.keysToRemove) {
        delete newState[key];
      }
      result.push(newState);
    }

    if (act.type === 'clear') {
      newState = {};
      result.push(newState);
    }
  }

  return result;
}

module.exports = transformStateWithClones;
