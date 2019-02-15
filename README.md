# House-Rental

A RESTful web service API for house renting management

### Software Requirement

* [Node.js](https://nodejs.org/en/)
* [Postgres](https://www.postgresql.org/download/)
* [npm](https://www.npmjs.com/get-npm)

### Running Application

Install dependencies

`npm install`

Start the application

`npm start`

### Testing

`npm test`


### Available Endpoints

**Get all payment items:** 

URL: GET /payments
On successful response: 

```json
{
    "message": "Query all payment items successfully",
    "results": [
        {
            "id": 114,
            "contractId": 1,
            "description": "Rent payment",
            "value": 1000,
            "time": "2019-02-14T23:44:34.193Z",
            "isImported": false,
            "createdAt": "2019-02-14T23:44:34.193Z",
            "updatedAt": "2019-02-14T23:44:34.193Z",
            "isDeleted": false
        },
        {
            "id": 115,
            "contractId": 1,
            "description": "Rent payment",
            "value": 1000,
            "time": "2019-02-14T23:44:33.174Z",
            "isImported": false,
            "createdAt": "2019-02-14T23:44:33.174Z",
            "updatedAt": "2019-02-14T23:44:33.174Z",
            "isDeleted": false
        },
    ]
}
```

**Get payment items for a specific contract**

URL: GET /payments/:contractId?startDate=YYYY-DD-MM&endDate=YYYY-DD-MM
On successful response: 
```json
{
    "message": "Query payment items successfully",
    "results": {
        "items": [
            {
                "id": 114,
                "contractId": 1,
                "description": "Rent payment",
                "value": 1000,
                "time": "2019-02-14T23:44:34.193Z",
                "isImported": false,
                "createdAt": "2019-02-14T23:44:34.193Z",
                "updatedAt": "2019-02-14T23:44:34.193Z",
                "isDeleted": false
            },
            {
                "id": 115,
                "contractId": 1,
                "description": "Rent payment",
                "value": 1000,
                "time": "2019-02-14T23:44:33.174Z",
                "isImported": false,
                "createdAt": "2019-02-14T23:44:33.174Z",
                "updatedAt": "2019-02-14T23:44:33.174Z",
                "isDeleted": false
            }
        ],
        "sum": 2000
    }
}
```
**Create new payment to a contract**
URL: POST /payments

Request body: 
```json
{
    "contractId": 1,
    "description": "Rent payment",
    "value": 200,
    "time": "2019-02-14T23:44:33.174Z",
    "isImported": false,
    "createdAt": "2019-02-14T23:44:33.174Z",
    "updatedAt": "2019-02-14T23:44:33.174Z",
    "isDeleted": false
}
```
On successful response: 
````json
{
    "message": "Payment item added"
}
````

**Update existing payment item**
URL: PUT /payments/:id

Request body: 
```json
{
    "description": "Rent to be paid",
    "value": 400
}
```
On successful response: 
````json
{
    "message": "Payment item updated"
}
````

**Delete existing payment item**
URL: DELETE /payments/:id

On successful response: 
````json
{
    "message": "Payment item id [payment ID] deleted"
}
````












