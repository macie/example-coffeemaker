import LowLevelAPI from '../src/LowLevelAPI';

describe('LowLevelAPI', () => {
    let lowLevelAPI;

    beforeEach(() => {
        lowLevelAPI = new LowLevelAPI();
    });

    describe('for boiler', () => {
        it.each(['ON', 'OFF'])('should be able to change state for valid state', (validState) => {
            lowLevelAPI.SetBoilerState(validState);

            expect(lowLevelAPI.boilerState).toEqual(validState);
        });

        it('should preserve current state when given invalid state', () => {
            let invalidState = 'STAND_BY';

            lowLevelAPI.SetBoilerState(invalidState);

            expect(lowLevelAPI.boilerState).not.toEqual(invalidState);
        });

        it('should be able to respond with valid status', () => {
            let validStatuses = ['EMPTY', 'NOT_EMPTY'];

            let result = lowLevelAPI.GetBoilerStatus();

            expect(validStatuses).toContain(result);
        });
    });

    describe('for relief valve', () => {
        it.each(['OPEN', 'CLOSED'])('should be able to change state for valid state', (validState) => {
            lowLevelAPI.SetReliefValveState(validState);

            expect(lowLevelAPI.reliefValveState).toEqual(validState);
        });

        it('should preserve current state when given invalid state', () => {
            let invalidState = 'HALF_OPEN';

            lowLevelAPI.SetReliefValveState(invalidState);

            expect(lowLevelAPI.reliefValveState).not.toEqual(invalidState);
        });
    });

    describe('for warmer', () => {
        it.each(['ON', 'OFF'])('should be able to change state for valid state', (validState) => {
            lowLevelAPI.SetWarmerState(validState);

            expect(lowLevelAPI.warmerState).toEqual(validState);
        });

        it('should preserve current state when given invalid state', () => {
            let invalidState = 'STAND_BY';

            lowLevelAPI.SetWarmerState(invalidState);

            expect(lowLevelAPI.warmerState).not.toEqual(invalidState);
        });

        it('should be able to respond with valid plate status', () => {
            let validStatuses = ['WARMER_EMPTY', 'POT_EMPTY', 'POT_NOT_EMPTY'];

            let result = lowLevelAPI.GetWarmerPlateStatus();

            expect(validStatuses).toContain(result);
        });
    });

    it('for brew button should be able to respond with valid status', () => {
        let validStatuses = ['PUSHED', 'NOT_PUSHED'];

        let result = lowLevelAPI.GetBrewButtonStatus();

        expect(validStatuses).toContain(result);
    });

    describe('for indicator', () => {
        it.each(['ON', 'OFF'])('should be able to change state for valid state', (validState) => {
            lowLevelAPI.SetIndicatorState(validState);

            expect(lowLevelAPI.indicatorState).toEqual(validState);
        });

        it('should preserve current state when given invalid state', () => {
            let invalidState = 'FLASHING';

            lowLevelAPI.SetIndicatorState(invalidState);

            expect(lowLevelAPI.indicatorState).not.toEqual(invalidState);
        });
    });
});
