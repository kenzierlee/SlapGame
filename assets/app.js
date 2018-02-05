var rick = new Character("Rick")
var scaryTerry = new Character("Scary Terry")
var items = {
    crystals: new Item("Crystals", 2, "Fire using Kalaxian Crystals"),
    microverseBattery: new Item("Microverse Battery", 3, "Use a Microverse Battery for extra damage!"),
    neutrinoBomb: new Item("Neutrino Bomb", 5, "Oh whats next?!")
}
//constructor function to build characters
function Character(name) {
    this.name = name,
        this.health = 100,
        this.hits = 0,
        this.items = [],
        this.mods = [1],
        this.wins = 0
}
//constructor function to build mods
function Item(name, modifier, description) {
    this.name = name,
        this.modifier = modifier,
        this.description = description
}
//Attacks
function freezeGun() {
    scaryTerry.hits++
    scaryTerry.health -= 1 * (rick.mods[rick.mods.length - 1])
    if (scaryTerry.health <= 0) {
        scaryTerry.health = 0;
    }
    return update()
}
function laserGun() {
    scaryTerry.hits++
    scaryTerry.health -= 2 * (rick.mods[rick.mods.length - 1])
    if (scaryTerry.health <= 0) {
        scaryTerry.health = 0;
    }
    return update()
}
function rayGun() {
    scaryTerry.hits++
    scaryTerry.health -= 3 * (rick.mods[rick.mods.length - 1])
    if (scaryTerry.health <= 0) {
        scaryTerry.health = 0;
    }
    return update()
}
//updates the healthbar hit count and wins also posts the game results
function update() {
    document.getElementById("comp-health").innerHTML = `
    <div class="progress">
    <div class="progress-bar bg-danger" role="progressbar" style="width:${scaryTerry.health}%" aria-valuenow="${scaryTerry.health}" aria-valuemin= "0" aria-volumemax="100">${scaryTerry.health}%
    </div>
    </div>`
    document.getElementById("comp-hits").innerHTML = scaryTerry.hits
    document.getElementById("user-health").innerHTML = `
    <div class="progress">
    <div class="progress-bar bg-success" role="progressbar" style="width:${rick.health}%" aria-valuenow="${rick.health}" aria-valuemin= "0" aria-volumemax="100">${rick.health}%
    </div>
    </div>`
    document.getElementById("user-hits").innerHTML = rick.hits
    if (scaryTerry.health <= 0) {
        return document.getElementById("result").innerHTML = `
        <h1>${rick.name} you've defeated ${scaryTerry.name}!
        <button type="button" class="btn btn-secondary" onClick="reset()">Reset</button></h2>`
    } if (rick.health <= 0) {
        return document.getElementById("result").innerHTML = `
        <h1>${rick.name} you've lost to ${scaryTerry.name}!
        <button type="button" class="btn btn-secondary" onClick="reset()">Reset</button></h2>`
    }
}
//function to reset the game 
function reset() {
    rick.health = 100
    rick.hits = 0
    scaryTerry.health = 100
    scaryTerry.hits = 0
    document.getElementById("result").innerHTML = `
    <img src="https://occ-0-2433-1001.1.nflxso.net/art/34326/5d6e1471b3937f2a08ec0d1f53a8e294f5634326.png" class="title"alt="Rick and Morty">
    <p>Beat Scary Terry!</p>
    <p>Select a Mod (green) first then your Attack (red) to add more damage!</p>`
    return update()
}
//function to get the sum of the modifiers
function addMods() {
    var totalMod = 0
    for (var i = 0; i < rick.items.length; i++) {
        var mod = rick.items[i];
        totalMod += mod.modifier
    }
    return rick.mods.push(totalMod)
}
//applies the mods to the character only 1 mod per attack
function giveCrystals() {
    if (rick.mods.length > 0) {
        rick.items.pop(items.crystals);
        rick.items.push(items.crystals)
    } else if (rick.mods.length <= 0) {
        rick.items.push(items.crystals)
    }
    return addMods()
}
function giveMicroverseBattery() {
    if (rick.mods.length > 0) {
        rick.items.pop(items.microverseBattery);
        rick.items.push(items.microverseBattery)
    } else if (rick.mods.length <= 0) {
        rick.items.push(items.microverseBattery)
    }
    return addMods()
}
function giveNeutrinoBomb() {
    if (rick.mods.length > 0) {
        rick.items.pop(items.neutrinoBomb);
        rick.items.push(items.neutrinoBomb)
    } else if (rick.mods.length <= 0) {
        rick.items.push(items.neutrinoBomb)
    }
    return addMods()
}
//comp randomized attack
function compAttack() {
    var slap = (Math.floor(Math.random() * 10) + 1)
    rick.health -= slap
    rick.hits++
    if (rick.health <= 0) {
        rick.health = 0
    }
    update()
}

update()