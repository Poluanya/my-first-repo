import { test, expect } from '@playwright/test';

test.describe('API-тесты для Restful-booker', () => {
    const baseURL = 'https://restful-booker.herokuapp.com';
    let bookingId;
    let authToken;

    
    const initialBookingData = {
        firstname: "Polina",
        lastname: "Borovaya",
        totalprice: 100,
        depositpaid: true,
        bookingdates: {
            checkin: "2024-01-01",
            checkout: "2024-01-02"
        },
        additionalneeds: "Tea"
    };


    test('Create Booking @api', async ({ request }) => {
        const response = await request.post(`${baseURL}/booking`, {
            data: initialBookingData
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        bookingId = body.bookingid;
        expect(body.booking.firstname).toBe("Polina");
        expect(body.booking.lastname).toBe("Borovaya");
    });

   
    test('Get Booking @api', async ({ request }) => {
        const response = await request.get(`${baseURL}/booking/${bookingId}`);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.firstname).toBe("Polina");
        expect(body.lastname).toBe("Borovaya");
    });

    
    test('Update Booking @api', async ({ request }) => {
       
        const authRes = await request.post(`${baseURL}/auth`, {
            data: { username: "admin", password: "password123" }
        });
        const { token } = await authRes.json();
        authToken = token;

        
        const updatedData = {
            ...initialBookingData,
            totalprice: 200,
            additionalneeds: "Coffee"
        };

        const response = await request.put(`${baseURL}/booking/${bookingId}`, {
            headers: { 'Cookie': `token=${authToken}` },
            data: updatedData
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.firstname).toBe("Polina");
        expect(body.totalprice).toBe(200);
    });

   
    test('Delete Booking @api', async ({ request }) => {
        const response = await request.delete(`${baseURL}/booking/${bookingId}`, {
            headers: { 'Cookie': `token=${authToken}` }
        });
        expect(response.status()).toBe(201);
        
        const check = await request.get(`${baseURL}/booking/${bookingId}`);
        expect(check.status()).toBe(404);
    });
});
