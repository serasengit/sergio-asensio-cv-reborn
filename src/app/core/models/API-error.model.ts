export enum APICode {
    InternalServerError = 'internal_server_error',
    OperationCouldNotBeCompleted = 'operation_could_not_be_completed',
    InvalidAccessToken = 'invalid_access_token',
    InvalidRefreshToken = 'invalid_refresh_token',
    SessionExpired = 'session_expired',
    RestrictedAccess = 'restricted_access',
}

export interface APIError {
    code: APICode;
    message: string;
    errors: { code: string; message: string }[];
    status: number;
}
