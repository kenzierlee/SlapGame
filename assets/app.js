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
    document.getElementById("result").innerHTML = ``
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
//applies the mods to the character
function giveCrystals() {
    rick.items.push(items.crystals)
    return addMods()
}
function giveMicroverseBattery() {
    rick.items.push(items.microverseBattery)
    return addMods()
}
function giveNeutrinoBomb() {
    rick.items.push(items.neutrinoBomb)
    return addMods()
}
//comp randomized attack
function compAttack() {
    var slap = (Math.floor(Math.random() * 12) + 1)
    rick.health -= slap
    rick.hits++
    if (rick.health <= 0) {
        rick.health = 0
    }
    update()
}

update()