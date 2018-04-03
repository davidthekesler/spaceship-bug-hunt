app.controller('CrewController', ['SpaceShipService', function (SpaceShipService) {
    console.log('CrewController has been loaded');
    const self = this;
    self.ships = SpaceShipService.ships;
    self.assignments = SpaceShipService.assignments;

    const crewToAdd = {name:'', role:'', ship_id:''};

    self.addCrewMember = function (crewMember) {
        SpaceShipService.addCrewMember(crewMember);
    };

    self.removeCrewMember = function (crewMemberId) {
        SpaceShipService.removeCrewMember(crewMemberId);
    }
}]);