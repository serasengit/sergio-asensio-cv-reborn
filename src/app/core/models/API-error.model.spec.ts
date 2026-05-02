import { APICode } from './API-error.model';

describe('API-error.model', () => {
    it('exposes the expected API codes', () => {
        expect(APICode.InternalServerError).toBe('internal_server_error');
        expect(APICode.OperationCouldNotBeCompleted).toBe('operation_could_not_be_completed');
        expect(APICode.InvalidAccessToken).toBe('invalid_access_token');
        expect(APICode.SessionExpired).toBe('session_expired');
    });
});
