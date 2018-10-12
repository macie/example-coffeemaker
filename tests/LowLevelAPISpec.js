import LowLevelAPI from '../src/LowLevelAPI';

describe('LowLevelAPI', function() {
    let lowLevelAPI;

    beforeEach(function() {
        lowLevelAPI = new LowLevelAPI();
    });

    describe('for boiler', function() {
        it.each(['ON', 'OFF'])('should be able to change state for valid state', function(validState) {
            lowLevelAPI.SetBoilerState(validState);

            expect(lowLevelAPI.boilerState).toEqual(validState);
        });

        it('should preserve current state when given invalid state', function() {
            let invalidState = 'STAND_BY';

            lowLevelAPI.SetBoilerState(invalidState);

            expect(lowLevelAPI.boilerState).not.toEqual(invalidState);
        });

        it('should be able to respond with valid status', function() {
            let validStatuses = ['EMPTY', 'NOT_EMPTY'];

            let result = lowLevelAPI.GetBoilerStatus();

            expect(validStatuses).toContain(result);
        });
    });

    describe('for warmer', function() {
        it.each(['ON', 'OFF'])('should be able to change state for valid state', function(validState) {
            lowLevelAPI.SetWarmerState(validState);

            expect(lowLevelAPI.warmerState).toEqual(validState);
        });

        it('should preserve current state when given invalid state', function() {
            let invalidState = 'STAND_BY';

            lowLevelAPI.SetWarmerState(invalidState);

            expect(lowLevelAPI.warmerState).not.toEqual(invalidState);
        });

        it('should be able to respond with valid plate status', function() {
            let validStatuses = ['WARMER_EMPTY', 'POT_EMPTY', 'POT_NOT_EMPTY'];

            let result = lowLevelAPI.GetWarmerPlateStatus();

            expect(validStatuses).toContain(result);
        });
    });

    describe('for indicator', function() {
        it.each(['ON', 'OFF'])('should be able to change state for valid state', function(validState) {
            lowLevelAPI.SetIndicatorState(validState);

            expect(lowLevelAPI.indicatorState).toEqual(validState);
        });

        it('should preserve current state when given invalid state', function() {
            let invalidState = 'FLASHING';

            lowLevelAPI.SetIndicatorState(invalidState);

            expect(lowLevelAPI.indicatorState).not.toEqual(invalidState);
        });
    });

    describe('for relief valve', function() {
        it.each(['OPEN', 'CLOSED'])('should be able to change state for valid state', function(validState) {
            lowLevelAPI.SetReliefValveState(validState);

            expect(lowLevelAPI.reliefValveState).toEqual(validState);
        });

        it('should preserve current state when given invalid state', function() {
            let invalidState = 'HALF_OPEN';

            lowLevelAPI.SetReliefValveState(invalidState);

            expect(lowLevelAPI.reliefValveState).not.toEqual(invalidState);
        });
    });
});
