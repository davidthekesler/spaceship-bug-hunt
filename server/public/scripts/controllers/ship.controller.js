app.controller('SpaceShipController', ['SpaceShipService', function (SpaceShipService) {
    console.log('SpaceShipController has been loaded');
    const self = this;

    self.ships = SpaceShipService.ships.list;

    self.addShip = function(ship) {
        SpaceShipService.addShip(ship);
    }
    self.removeShip = function (ship) {
        if(ship.current_crew > 0) {
            alert(`You can't delete a ship with crew on board!`);
        } else {
            SpaceShipService.deleteShip(ship.id);
        }
    }
}]);