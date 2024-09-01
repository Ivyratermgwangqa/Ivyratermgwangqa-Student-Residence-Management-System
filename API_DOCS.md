# Residence API Documentation

## Base URL

```
http://localhost:3000/api/residences
```

## Endpoints

### 1. **Get All Residences**

- **Method**: `GET`
- **Endpoint**: `/api/residences`
- **Description**: Retrieves a list of all residences.
- **Response**:
  - **Status 200**: An array of residence objects.
  - **Example Response**:
    ```json
    [
      {
        "id": 1,
        "name": "Residence Name",
        "address": "123 Main St",
        "capacity": 100,
        "createdAt": "2024-09-01T05:47:35.000Z",
        "updatedAt": "2024-09-01T05:47:35.000Z"
      },
      ...
    ]
    ```

### 2. **Get Residence by ID**

- **Method**: `GET`
- **Endpoint**: `/api/residences/:id`
- **Description**: Retrieves a residence by its ID.
- **Parameters**:
  - **Path Parameter**: `id` - ID of the residence (integer).
- **Response**:
  - **Status 200**: A residence object.
  - **Status 404**: Residence not found.
  - **Example Response**:
    ```json
    {
      "id": 1,
      "name": "Residence Name",
      "address": "123 Main St",
      "capacity": 100,
      "createdAt": "2024-09-01T05:47:35.000Z",
      "updatedAt": "2024-09-01T05:47:35.000Z"
    }
    ```

### 3. **Create a New Residence**

- **Method**: `POST`
- **Endpoint**: `/api/residences`
- **Description**: Creates a new residence.
- **Request Body**:
  - **Content-Type**: `application/json`
  - **Example Request Body**:
    ```json
    {
      "name": "New Residence",
      "address": "456 Elm St",
      "capacity": 150
    }
    ```
- **Response**:
  - **Status 201**: Created residence object.
  - **Status 400**: Bad request (e.g., missing required fields).
  - **Example Response**:
    ```json
    {
      "id": 3,
      "name": "New Residence",
      "address": "456 Elm St",
      "capacity": 150,
      "createdAt": "2024-09-01T06:00:00.000Z",
      "updatedAt": "2024-09-01T06:00:00.000Z"
    }
    ```

### 4. **Update a Residence**

- **Method**: `PUT`
- **Endpoint**: `/api/residences/:id`
- **Description**: Updates an existing residence.
- **Parameters**:
  - **Path Parameter**: `id` - ID of the residence to update (integer).
- **Request Body**:
  - **Content-Type**: `application/json`
  - **Example Request Body**:
    ```json
    {
      "name": "Updated Residence",
      "address": "789 Oak St",
      "capacity": 200
    }
    ```
- **Response**:
  - **Status 200**: Updated residence object.
  - **Status 400**: Bad request (e.g., invalid ID).
  - **Status 404**: Residence not found.
  - **Example Response**:
    ```json
    {
      "id": 1,
      "name": "Updated Residence",
      "address": "789 Oak St",
      "capacity": 200,
      "createdAt": "2024-09-01T05:47:35.000Z",
      "updatedAt": "2024-09-01T06:10:00.000Z"
    }
    ```

### 5. **Delete a Residence**

- **Method**: `DELETE`
- **Endpoint**: `/api/residences/:id`
- **Description**: Deletes a residence by its ID.
- **Parameters**:
  - **Path Parameter**: `id` - ID of the residence to delete (integer).
- **Response**:
  - **Status 204**: No content (successful deletion).
  - **Status 404**: Residence not found.

## Error Responses

- **400 Bad Request**: Invalid request data.
- **404 Not Found**: Resource not found.
- **500 Internal Server Error**: Unexpected server error.

## Example Requests

You can use tools like Postman or curl to test these endpoints.

**Example curl command to create a residence:**

```bash
curl -X POST http://localhost:3000/api/residences \
-H "Content-Type: application/json" \
-d '{"name": "New Residence", "address": "456 Elm St", "capacity": 150}'
```

**Example curl command to get all residences:**

```bash
curl http://localhost:3000/api/residences
```
