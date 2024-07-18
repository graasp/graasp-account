# ⚙️ Feature Analysis
The feature is to display all the uploaded files by user logged in in his Storage interface

## Goals

The objective of this specification is to define an API allowing all files to be retrieved from all items available in the system. This API should be used by the frontend to get a complete list of all files accessible to the logged in user.

## Design Questions

### API design reflection

### Description

- This feature will allow users to easily see all their uploaded files, along with their names, where they are located, and their sizes, making it simpler to find and manage their documents.
- User story:
  
  ```txt
    As a logged-in user,
    I want to see all my uploaded files along with their names, locations, and sizes,
    so that I can easily find and manage my documents.
  ```

### Definition

  Endpoint Specification for Viewing Uploaded Files:

- The route requires authentication to ensure that only logged-in users can access their uploaded files and folders.
- No additional rights or conditions are needed beyond standard authentication.
- What should the route be named?
  - The HTTP method used: `GET`
  - The url path to use: `/api/items/current-member/files`
  - No URL parameters are required
  - No query string parameters needed.
  - No request body is needed
- Will data be returned
  - Returned data Shape:
    ```json
        {
            "status": "success",
            "data": [
                {
                    "name": "string",           // Name of the file
                    "size": "number",           // Size of the file in bytes
                    "createdAt": "string",      // Date and time when the file was created
                    "path":"string", //location
                    "parent": {                 // Parent folder details (if available)
                        "id": "string",
                        "name": "string"
                    }
                }
            ]
        }
    ```
  - Constraints on Returned Data:

    - name: Must be a string representing the name of the file.
    - size: Must be a number representing the size of the file in bytes.
    - createdAt: must be a string representing the date and time.
    - path: must be a string representing the path indicating the location of the file.
    - parent.id: must be a string representing the ID of the parent folder (if available).
    - parent.name: must be a string representing the name of the parent folder (if available).
- What happens on failure?
    - Possible Causes of Failure:
        - Authentication Failure: User is not authenticated or token is invalid.
        - Permission Denied: User does not have the required permissions to access the item.
        - Folder Not Found: The specified folder ID (parent ID) does not exist.
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
    - 403 Forbidden
        ```json
        {
            "status": "error",
            "error_code": "403",
            "message": "Permission denied."
        }
        ```
    - 404 Not Found
        ```json 
        {
            "status": "error",
            "error_code": "404",
            "message": "Folder not found."
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
  -  None, as we are fetching a list of files from items in general.

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