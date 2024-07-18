# ⚙️ Display the uploaded files by current member in Stroage interface
Complement the "Storage" page with a list of the files owned by the user, sorted by size, allowing identification of the specific files that fill up the user storage quota.
### Goals
We define an API allowing to retrieve the list of the largest files owned by the user. This API should be used by the frontend to inform the user of which files take up storage space, helping them decide how to free-up some storage.


### Description

- This feature will allow users to easily see all their uploaded files, along with their names, where they are located, and their sizes, making it simpler to find which files are the biggest and take action to free some storage space.
- User story:
  
  ```txt
    As a user with little available space left, 
    I want to see which files take up the most space, 
    so I can free some storage.
  ```

### Definition

  Endpoint Specification for Viewing Uploaded Files:

- The route requires authentication to ensure that only logged-in users can access their uploaded files.
- No additional rights or conditions are needed beyond standard authentication.
- What should the route be named?
  - The HTTP method used: `GET`
  - The url path to use: `/members/current/storage/list?page=2&pageSize=20`
  - Query string parameters: query string parameters are needed for pagination
    - page (integer): The page number to fetch.
    - pageSize (integer): The number of items per page.
  - No request body is needed
- Will data be returned
  - Returned data Shape:
    ```json
        {
          "data": [
            {
              "id":"string", // Item's id
              "name": "string",           // Name of the file
              "size": "number",           // Size of the file in bytes
              "updated": "string",      // Date and time when the item was updated
              "path": "string",           // Location of the file
              "parent": {                 // Parent folder details (if available)
                "id": "string",
                "name": "string"
              }
            }
          ],
          "pagination": {
            "totalItems": 100,           // Total number of items
            "totalPages": 5,             // Total number of pages
            "currentPage": 2,            // Current page number
            "pageSize": 20               // Number of items per page
          }
        }

    ```
  - Constraints on Returned Data:

    - name: must be a string representing the name of the file.
    - size: must be a number representing the size of the file in bytes.
    - updatedAt: must be a string representing the item's date and time of creation.
    - path: must be a string representing the path indicating the location of the file.
    - parent.id: must be a string representing the ID of the parent folder (if available).
    - parent.name: must be a string representing the name of the parent folder (if available).
  - Example of the returned data:
    ```json
        {
          "data": [
            {
              "id":"001",
              "name": "Document1.pdf",
              "size": 102400,
              "createdAt": "2024-07-01T12:00:00Z",
              "path": "/documents/Document1.pdf",
              "parent": {
                "id": "folder123",
                "name": "Documents"
              }
            },
            {
              "id":"002",
              "name": "Image1.png",
              "size": 204800,
              "createdAt": "2024-07-02T14:30:00Z",
              "path": "/images/Image1.png",
              "parent": {
                "id": "folder456",
                "name": "Images"
              }
            },
            {
              "id":"003",
              "name": "Presentation.pdf",
              "size": 512000,
              "createdAt": "2024-07-03T09:15:00Z",
              "path": "/presentations/Presentation.pdf",
              "parent": null
            }
          ],
          "pagination": {
            "totalItems": 100,
            "totalPages": 5,
            "currentPage": 2,
            "pageSize": 20
          }
        }
    ```
- What happens on failure?
    - Possible Causes of Failure:
        - Authentication Failure: User is not authenticated or token is invalid.
        - Invalid query parameters: The query parameters are missing or invalid.
        - Server Error: Internal server error occurs while processing the request.
  - What error code and error data is used? 
    - 401 Unauthorized:
        ```json 
        {
            "status": "error",
            "error_code": "401",
            "message": "User not authenticated."
        }
        ```
    - 400 Bad request
        ```json 
        {
          "status": "error",
          "message": "Invalid query parameters"
        }
        ```
    - 500 Internal Server Error
        ``` json
        {
            "status": "error",
            "error_code": "500",
            "message": "An unexpected error occurred. Please try again later."
        }
        ```


### Frontend design

- Is this a hook or a mutation? 
  - This is a hook because we are fetching data from the backend to display in the frontend UI. 
- What are the parameters of the hook?
  -  Parameters for the hook will include:
      - page: The page number to fetch.
      - pageSize: The number of items per page.

      These parameters will map to the query string parameters used in the backend endpoint (`/members/current/storage/list?page=2&pageSize=20`).

### Backend design

- Where should this go? Is this a new service? Does it extend an already existing service?
  - This functionality can extend an existing service that manages items. If no such service exists, a new service specifically for managing items (files and folders) should be created.
- Will this update a table? How will previous data be affected?
  - This feature will not modify any data but rather fetch information for display.
- Do we need to create a new entity? What will the table shape be?

  -   No new entity creation is necessary since we are querying existing entities (files and potentially folders). The table shape should align with the data structure defined earlier:
      ``` 
      For files:
        id: string
        name: string
        size: number
        createdAt: datetime
        path: string 
        parentId: string (foreign key reference to the parent folder, if applicable)

        For folders:
        id: string
        name: string
       ```