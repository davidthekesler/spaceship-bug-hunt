app.controller('CrewController', ['SpaceShipService', function (SpaceShipService) {
    console.log('CrewController has been loaded');
    const self = this;
    
    self.ships = SpaceShipService.ships;
    self.assignments = SpaceShipService.assignments;
    self.editing = false;
    self.editingId = 0;

    self.crewToAdd = {name:'', role:'', ship_id:''};

    self.editCrewMember = function (crewAssignment) {
        console.log('Editing member', crewAssignment);
        self.crewToAdd.name = crewAssignment.crew_name;
        self.crewToAdd.role = crewAssignment.crew_role;
        self.crewToAdd.ship_id = '' + self.crewToAdd.ship
    };

    self.addCrewMember = function (crewMember) {
        if (self.editing) {
                //call a put route
                // SpaceShipService.updateCrew(crewMember, editingId);
                self.editing = false;
        } else {
            SpaceShipService.addCrewMember(crewMember);
        }
        self.crewToAdd = {name:'', role:'', ship_id:''};
    };

    self.removeCrewMember = function (crewMemberId) {
        SpaceShipService.removeCrewMember(crewMemberId);
    }
}]);