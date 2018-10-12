import LowLevelAPI from '../src/LowLevelAPI';

describe('LowLevelAPI', function() {
    let lowLevelAPI;

    beforeEach(function() {
        lowLevelAPI = new LowLevelAPI();
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
