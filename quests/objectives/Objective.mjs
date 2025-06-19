import chalk from "chalk";
import { Location } from "../../world/Location.mjs";

export class Objective {
    constructor(description) {
        this.description = description;
        this.completed = false;
    }
    isCompleted() {
        return this.completed;
    }
}
export class TimeObjective extends Objective {
    constructor(description, deadline) {
        super(description);
        this.deadline = deadline;
    }
    validate(currentTime) {
        return currentTime <= this.deadline;
    }
}
export class LocationObjective extends Objective {
    constructor(description, location) {
        super(description);
        this.location = location;
    }
    validate(arrivedLocation) {
        if ( !(arrivedLocation instanceof Location)) {
            console.log(chalk.red("Wrong Location format"), arrivedLocation);
        }
        // console.error("this.location: ", this.location);
        // console.error("arrivedLocation: ",arrivedLocation.name);
        return arrivedLocation.name.trim() === this.location;
    }
}
export class ItemObjective extends Objective {
    constructor(description, item) {
        super(description);
        this.item = item;
    }
    validate(submittedItem) {
        return submittedItem === this.item;
    }
}
export class QuantityObjective extends Objective {
    constructor(description, completed, quantity) {
        super(description, completed);
        this.quantity = quantity;
    }
    validate(qty) {
        return qty >= this.quantity;
    }
}

