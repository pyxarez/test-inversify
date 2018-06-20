"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
// 2. Declare types
const TYPES = {
    Warrior: Symbol("Warrior"),
    Weapon: Symbol("Weapon"),
    ThrowableWeapon: Symbol("ThrowableWeapon")
};
// 3. Declare classes
let Katana = class Katana {
    hit() {
        return "cut!";
    }
};
Katana = __decorate([
    inversify_1.injectable()
], Katana);
let Shuriken = class Shuriken {
    throw() {
        return "hit!";
    }
};
Shuriken = __decorate([
    inversify_1.injectable()
], Shuriken);
let Ninja = class Ninja {
    constructor(katana, shuriken) {
        this.katana = katana;
        this.shuriken = shuriken;
    }
    fight() {
        return this.katana.hit();
    }
    ;
    sneak() {
        return this.shuriken.throw();
    }
    ;
};
Ninja = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(TYPES.Weapon)),
    __param(1, inversify_1.inject(TYPES.ThrowableWeapon)),
    __metadata("design:paramtypes", [Object, Object])
], Ninja);
// 4. Create instance of Container & declare type bindings
const myContainer = new inversify_1.Container();
myContainer.bind(TYPES.Warrior).to(Ninja);
myContainer.bind(TYPES.Weapon).to(Katana);
myContainer.bind(TYPES.ThrowableWeapon).to(Shuriken);
// 5. Resolve Warrior type
const ninja = myContainer.get(TYPES.Warrior);
// 6. Check “Katana” and “Shuriken” has been injected into “Ninja”
console.log(ninja.fight()); // "cut!"
console.log(ninja.sneak()); // "hit!"
