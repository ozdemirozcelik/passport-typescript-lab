// add types to Express.User
declare global {
    namespace Express {
        export interface User {
                id: number;
                name: string;
                email: string;
                password: string;
        }
    }
}

// export namespace
export default Express;