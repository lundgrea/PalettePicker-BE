# Happy Little Palette Picker Back End

### Access The Active API:

API Base URL:<br>
[Happy Little Palette Picker Back End](https://palette-picker-be-ac.herokuapp.com/)<br>

Overview: 
This project is half of a full stack application built in a two person team over the course of 10 days. The one-to-many PostgresSQL database schema was migrated and seeded using Knex, alongside an Express server with fetch calls to the Node.js API endpoints.

The front end of the applicaiton can be access at the [[Happy Little Palette Picker Front End](https://happy-little-palette-picker.herokuapp.com/)

---

### Table Of Contents
- [Database and Schema](#database-and-schema)
- [Setup](#setup)
- [Basic Repo Info](#basic-repo-info)
- [API End Points](#api-end-points)
- [Authors](#authors)

---

## Database and Schema
![screenshot](https://user-images.githubusercontent.com/38546045/66725871-25fc4080-ee25-11e9-9214-1128086b1216.png)
The database is a PostgreSQL database, made up of two tables.
<br>

The first is saved Folders, seeded with:
 - Name
<br>

The second displays saved color Palettes, which each contain:
 - Name
 - Color 1
 - Color 2
 - Color 3
 - Color 4 
 - Color 5
<br>

---

## Setup

#### Clone this repository:

  ```
  git clone https://github.com/lundgrea/PalettePicker-BE
  ```
  ```
  cd BYOB
  ```

#### Updgrade pip and install dependencies

  ```shell
  npm install
  ```

#### Set up databases using PostgreSQL

  ```shell
  CREATE DATABASE palette_picker;
  \c palette_picker
  ```

#### Migrate/Seed

  ```shell
  knex migrate:latest
  knex seed:run
  knex migrate:latest --env test
  knex seed:run --env test
  ```

#### Run the Server

To see your code in action locally, you need to fire up a development server. Use the command:

```shell
npm start
```

Once the server is running, visit API endpoints in your browser:

* `http://localhost:3001/` to run your application.

<br>

---


## Basic Repo Info:

### Versions/Prerequisites

##### Tech Stack:
To Install and run this application please be aware of the following versions and requirements:
- PostgreSQL 10+
- Express
- JavaScript

---

## API End Points
This is a restful API.

---











### Folders

##### GET REQUESTS
<br>

To get one folder:

```
GET /api/v1/folders/:folder_id
```

The folder will be returned to look like:

```
[
    {
        "id": 10,
        "name": "Shy",
        "created_at": "2019-10-11T19:15:40.738Z",
        "updated_at": "2019-10-11T19:15:40.738Z"
    }
]
```


<br>
To get all folders:

```
GET /api/v1/folders
```

The folders will be returned in as JSON to look like:

```
{
    "folders": [
        {
            "id": 10,
            "name": "Shy",
            "created_at": "2019-10-11T19:15:40.738Z",
            "updated_at": "2019-10-11T19:15:40.738Z"
        },
        {
            "id": 12,
            "name": "Monster Mash",
            "created_at": "2019-10-11T19:15:40.740Z",
            "updated_at": "2019-10-11T19:15:40.740Z"
        },
        {
            "id": 13,
            "name": "Winding Down",
            "created_at": "2019-10-11T19:15:40.740Z",
            "updated_at": "2019-10-11T19:15:40.740Z"
        }
...
}
```

<br>


##### POST REQUESTS
<br>
To create a folder item send:

```
POST /api/v1/folders, params: 
{
"name": "Jump & Jive"
}
```

This will return the new folder's primary key in the database.

Sample Response:
```
{
"id": 16
}
```

<br>



##### PATCH REQUESTS
<br>
To edit a folder name send:

```
PATCH /api/v1/folders/:folder_id, params: 
{
"name": "Soul Searching"
}
```

This will return the update folder's entire table row data from the database.

Sample Response:
```
[
    {
        "id": 13,
        "name": "Soul Searching",
        "created_at": "2019-10-11T19:15:40.740Z",
        "updated_at": "2019-10-11T19:15:40.740Z"
    }
]
```

<br>


##### DELETE REQUESTS

<br>
To delete a folder and the associated palettes:

```
DELETE /api/folders/:folder_id
```

It will return a message as JSON about the success of the deletion.

Sample Response:
```
"Folder and all associated palettes with Primary Folder ID: 13 has been deleted"
```


### Color Palettes
Color Palettes has traditional RESTFUL routes for its index and single color palettes.

##### GET REQUESTS

To get one color palette:

```
GET /api/v1/palettes/:palette_id
```

The color palette will be returned to look like:

```
[
    {
        "id": 20,
        "name": "Whale Life",
        "c1": "#586BA4",
        "c2": "#594157",
        "c3": "#A0D2DB",
        "c4": "#BEE7E8",
        "c5": "#CFBCDF",
        "folder_id": 11,
        "created_at": "2019-10-11T19:15:40.747Z",
        "updated_at": "2019-10-11T19:15:40.747Z"
    }
]
```
<br>


<br>
To request all color palettes in the database:

```
GET /api/v1/palettes
```

The color palettes will be returned in as JSON to look like:

```
[
    {
        "id": 20,
        "name": "Whale Life",
        "c1": "#586BA4",
        "c2": "#594157",
        "c3": "#A0D2DB",
        "c4": "#BEE7E8",
        "c5": "#CFBCDF",
        "folder_id": 11,
        "created_at": "2019-10-11T19:15:40.747Z",
        "updated_at": "2019-10-11T19:15:40.747Z"
    },
    {
        "id": 21,
        "name": "Blushing",
        "c1": "#F2CCC3",
        "c2": "#E78F8E",
        "c3": "#FFE6E8",
        "c4": "#ACD8AA",
        "c5": "#F48498",
        "folder_id": 10,
        "created_at": "2019-10-11T19:15:40.747Z",
        "updated_at": "2019-10-11T19:15:40.747Z"
    },
...
]
```

<br>
To request all color palettes associated with one folder in the database:

```
GET /api/v1/folders/:folder_id/palettes
```

The color palettes will be returned in as JSON to look like:

```

[
    {
        "id": 24,
        "name": "Ghosted",
        "c1": "#C4E7D4",
        "c2": "#C4DACF",
        "c3": "#B9C0DA",
        "c4": "#998DA0",
        "c5": "#63585E",
        "folder_id": 12,
        "created_at": "2019-10-11T19:15:40.751Z",
        "updated_at": "2019-10-11T19:15:40.751Z"
    },
    {
        "id": 25,
        "name": "Magnets",
        "c1": "#94AE89",
        "c2": "#A8BCA1",
        "c3": "#CODA74",
        "c4": "#BEEDAA",
        "c5": "#D5FFD9",
        "folder_id": 12,
        "created_at": "2019-10-11T19:15:40.752Z",
        "updated_at": "2019-10-11T19:15:40.752Z"
    },
...
]
```

<br>

To request a specific folder by name:

```
GET /api/v1/folders?name=Smoke
```

The folder will be returned in as JSON to look like:

```

[
    {
        "id": 24,
        "name": "Smoke",
        "created_at": "2019-10-11T19:15:40.751Z",
        "updated_at": "2019-10-11T19:15:40.751Z"
    }
]
```

<br>

##### POST REQUESTS
<br>
To create a new palette send:

```
POST /api/v1/folders/:folder_id/palettes, params: 
  {
    "name": "Mocha",
    "c1": "#69626D",
    "c2": "#BCAF9C",
    "c3": "#CBBEB3",
    "c4": "#D9BDC5",
    "c5": "#E8C7D3",
	  "folder_id": 10
  }



```

This will return the new palettes's primary key in the database.

Successful sample Response: 

```
{
  "id": 34
}
```

<br>

##### PATCH REQUESTS
<br>
To edit a palette name send:

```
PATCH /api/v1/palettes/:palette_id, params: 

{
  "name": "Smoke & Fire"
}

```

This will return the all of the color palettes in the database.

Sample Response:
```
[
    {
        "id": 33,
        "name": "Jam Jam",
        "c1": "#686BA4",
        "c2": "#719098",
        "c3": "#AA8F95",
        "c4": "EAB6CD",
        "c5": "DFBCDF",
        "folder_id": 10,
        "created_at": "2019-10-13T22:52:31.469Z",
        "updated_at": "2019-10-13T22:52:31.469Z"
    },
    {
        "id": 34,
        "name": "Smoke & Fire",
        "c1": "#69626D",
        "c2": "#BCAF9C",
        "c3": "#CBBEB3",
        "c4": "#D9BDC5",
        "c5": "#E8C7D3",
        "folder_id": 10,
        "created_at": "2019-10-14T01:36:59.390Z",
        "updated_at": "2019-10-14T01:36:59.390Z"
    },
...
]
```

<br>

##### DELETE Requests

To remove the a color palette:

```
DELETE /api/v1/palettes/:palette_id
```

It will return a JSON success response.

<br>



---

### Authors
- [Ann Cerveny](https://github.com/CervAnn)
- [Alyssa Lundgren](https://github.com/lundgrea)
