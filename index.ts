import "reflect-metadata";
import { injectable, inject, Container } from "inversify";

// 1. Declare interfaces
interface Warrior {
  fight(): string;
  sneak(): string;
}

interface Weapon {
  hit(): string;
}

interface ThrowableWeapon {
  throw(): string;
}

// 2. Declare types
const TYPES = {
  Warrior: Symbol("Warrior"),
  Weapon: Symbol("Weapon"),
  ThrowableWeapon: Symbol("ThrowableWeapon")
};

// 3. Declare classes
@injectable()
class Katana implements Weapon {
  public hit() {
    return "cut!";
  }
}

@injectable()
class Shuriken implements ThrowableWeapon {
  public throw() {
    return "hit!";
  }
}

@injectable()
class Ninja implements Warrior {

  public constructor(
    @inject(TYPES.Weapon) private katana: Weapon,
    @inject(TYPES.ThrowableWeapon) private shuriken: ThrowableWeapon
  ) { }

  public fight() {
    return this.katana.hit();
  };

  public sneak() {
    return this.shuriken.throw();
  };

}

// 4. Create instance of Container & declare type bindings
const myContainer = new Container();
myContainer.bind<Warrior>(TYPES.Warrior).to(Ninja);
myContainer.bind<Weapon>(TYPES.Weapon).to(Katana);
myContainer.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken);

// 5. Resolve Warrior type
const ninja = myContainer.get<Warrior>(TYPES.Warrior);

// 6. Check “Katana” and “Shuriken” has been injected into “Ninja”
console.log(ninja.fight()); // "cut!"
console.log(ninja.sneak()); // "hit!"
