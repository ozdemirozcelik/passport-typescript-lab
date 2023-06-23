// add types to Express.User
declare global {
    namespace Express {
        export interface User {
                id: number;
        }
    }
}

// export namespace
export default Express;