app.service('SpaceShipService', [function() {
    console.log('SpaceShipService has been loaded');
    const self = this;

    // An assignment is a crew paired with a ship
    self.assignments = { list: [] };
    self.ships = { list: [] };

    // Add a new space ship
    self.addShip = function (shipToAdd) {
        $http({
            method: 'POST',
            url: '/ships',
            data: shipToAdd
        }).then((response) => {
            alert('Success! Try refreshing the page?!?');
            self.getShips();
        }).catch((error) => {
            console.log('error making rent get request', error);
            alert('Something went wrong! Check the server.');
        });
    }

    // Get a list of existing ships, includes crew counts
    self.getShips = function() {
        $http({
            method: 'GET',
            url:'/ships'
        }).then((response) => {
            console.log('response', response);
            self.ships.list = response.data;
        })
        .catch((error) => {
            console.log('error making rent get request', error);
            alert('Something went wrong! Check the server.');
        });
    }

    // Delete an existing ship, must have no crew!
    self.deleteShip = function(shipId) {
        $http({
            method: 'DELETE',
            url: `/ships/${shipId}`
        }).then((response) => {
            self.getShips();
            alert('Success! Try refreshing the page?!?');
        }).catch((error) => {
            console.log('error making rent get request', error);
            alert('Something went wrong! Check the server.');
        });
    }

    // Get the crew and ship assignments
    self.getCrew = function() {
        $http({
            method: 'GET',
            url: '/crew',
        }).then((response) => {
            console.log('response', response);
            self.assignments.list = response.data;
        })
        .catch((error) => {
            console.log('error making rent get request', error);
            alert('Something went wrong! Check the server.');
        });
    }

    // Remove crew from ship
    self.removeCrewMember = function (crewId) {
        $http({
            method: 'DELETE',
            url: `/crew/${crewId}`,
        }).then((response) => {
            self.getCrew();
        })
        .catch((error) => {
            console.log('error making request', error);
            alert('Something went wrong! Check the server.');
        });
    }

    // Add crew member to an existing ship
    self.addCrewMember = function (crewMemberToAdd) {
        $http({
            method: 'POST',
            url: '/crew',
            data: crewMemberToAdd
        }).then((response) => {
            console.log('response', response);
            self.getCrew();
        })
        .catch((error) => {
            console.log('error making request', error);
            alert('Something went wrong! Check the server.');
        });
    }

    // Load initial data
    self.getShips();
    self.getCrew();
}]);