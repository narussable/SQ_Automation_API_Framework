"use strict";

export const dynamic_user = {
    id: (id: number) => { return id },
    username: (username: string) => { return username; },
    firstName: (firstName: string) => { return firstName; },
    lastName: (lastName: string) => { return lastName; },
    email: (email: string) => { return email; },
    password: (password: string) => { return password; },
    phone: (phone: string) => { return phone; },
    userStatus: (status: number) => { return status; },
};