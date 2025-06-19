export class ConditionEvaluator {
  static evaluate(conditions = [], player) {
    //console.log("Evaluating quest with conditions:", conditions);
    return conditions.every(condition => {
      switch (condition.type) {
        case "player_level":
          return ConditionEvaluator.compare(player.level, condition.operator, condition.value);

        case "currentLocation":
          return player.currentLocation?.name === condition.value;

        case "currentLocationType":
          return player.currentLocation?.type === condition.value;

        case "has_completed":
          return player.completedQuests?.includes(condition.value);

        case "has_killed":
          return player.kills?.includes(condition.value);

        default:
          console.warn(`Unknown condition type: ${condition.type}`);
          return false;
      }
    });
  }

  static compare(a, operator, b) {
    switch (operator) {
      case ">": return a > b;
      case "<": return a < b;
      case ">=": return a >= b;
      case "<=": return a <= b;
      case "==": return a == b;
      case "!=": return a != b;
      default:
        console.warn(`Unknown operator: ${operator}`);
        return false;
    }
  }
}