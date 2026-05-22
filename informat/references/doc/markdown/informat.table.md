This document is the data table documentation for the Informat low-code platform.

## Overview
The data table module is used to store and display data. After creating a data table, the system automatically generates a database table to store data. Users can view and modify data on the frontend using system-generated table views and forms. Fields in the data table can be configured using the form designer. Data tables can be referenced as data sources by data table views, dashboards, workflows, form designers, surveys, and other modules.

## Fields

### UUID (UUID)
UUID is the [primary key ID] field of the data table, used to uniquely identify a data record.

- UUID is the primary key at the database level
- UUID is not a business number
- UUID is not configurable, does not support expressions, and should not be displayed to business users
- UUID is not equivalent to the "ID (ID)" field described below

### Seq (Seq)
Seq is a record creation sequence number automatically maintained by the system, used to assist in generating business numbers.

- Seq is only a system auto-increment counter
- Seq is not a primary key
- Seq itself does not carry business meaning
- Each time a record is created, Seq automatically increments by 1. Seq values are increasing within the table (not guaranteed to be consecutive)

### Single-Line Text (SingleText)
Single-line text input field. Database storage format: varchar(200) - variable-length string, up to 200 characters.

### Multi-Line Text (MultiText)
Multi-line text input field. Database storage format: text.

### Rich Text (RichText)
Rich text is an advanced text input field. Database storage format: text.

### Integer (Integer)
Integer number input field. Database storage format: int8.

### Decimal (Double)
Decimal number input field. Database storage format: float8.

### Date (Date)
Date/time picker component. Database storage format: timestamp(6).

### List Select (ListSelect)

Single-select and multi-select have different storage types. Database storage formats:

| Selection Type | Field Type | Description |
|------------------------------|------------------------------|----------------------------------|
| Single-select | varchar(200) | Variable-length string, up to 200 characters |
| Multi-select | text[] | Array |


### Tree Select (Tree)

Database storage formats:

| Selection Type | Field Type | Description |
|------------------------------|------------------------------|----------------------------------|
| Single-select | varchar(200) | Variable-length string, up to 200 characters |
| Multi-select | text[] | Array |


### Cascader Select (Cascader)

Database storage formats:

| Selection Type | Field Type | Description | Example |
|-----------------|------------|---------------|-----------------------|
| Single-select | text[] | Array | `{Guangdong Province,Shenzhen City,Nanshan District}` |
| Multi-select | jsonb | Stores JSON data structure | `[["Shanghai City", "Municipal District", "Huangpu District"], ["Shanghai City", "Municipal District", "Pudong District"]]`|


### Attachment (Attachment)


Database storage format:

| Field Type | Description |
|-------|------------------------|
| jsonb | Stores JSON format data. JSON data structure shown below |

In data tables, attachment field data is stored in JSON format. If multi-select, it is stored as a JSON array. The JSON structure is as follows:

```ts
interface TableAttachment {
    name: string;// Name
    size: number;// Size
    id: string;// ID
    thumbnail: string;// Thumbnail
    path: string;// Path
    md5: string;// MD5 value
}
```

**Example 1: Data stored when multiple file upload is not allowed (single-select)**

```json
{
  "id": "20ff3866fcdd4c94822301eb76a04657.jpg",
  "md5": "b394f37c3180e68090e2a0f1370f2aa9",
  "name": "test.jpg",
  "path": "uilssesqv5y7o/l6h7derr6fc6v/20ff3866fcdd4c94822301eb76a04657.jpg",
  "size": 7757,
  "thumbnail": "4923f93852594511b7c507465304cdc6.jpg"
}
```

**Example 2: Data stored when multiple file upload is allowed (multi-select)**

```json
[
  {
    "id": "k06s3kc79i2rtb4r225d2.docx",
    "md5": "16e5ad6839a13c51066e95b00fdd4a41",
    "name": "Secondary Development Platform Features.docx",
    "path": "uilssesqv5y7o/p3klf0kagl0yg/k06s3kc79i2rtb4r225d2.docx",
    "size": 735916
  },
  {
    "id": "wdn8dqk58z59jox7ywpmk.jpeg",
    "md5": "db2ce954f12e2f5b3914170a1205a912",
    "name": "Resume.jpeg",
    "path": "uilssesqv5y7o/p3klf0kagl0yg/wdn8dqk58z59jox7ywpmk.jpeg",
    "size": 537100,
    "thumbnail": "cbrf1bhgfei0pbocdhg79.jpeg"
  }
]
```

### Checkbox or Switch (Checkbox)

Database storage format:

| Field Type | Description |
|--------------------------------------------------------|----------------------------------|
| bool | Stores Boolean data |

### User Select (User)

Database storage format:

| Field Type | Description |
|--------------------------------------------------------|----------------------------------|
| jsonb | Stores JSON format data. JSON data structure shown below |

In data tables, user select field data is stored in JSON format. If multi-select, it is stored as a JSON array. The JSON structure is as follows:

```ts
interface TableAccountSimple {
	id:string;// ID
	name:string;// Name
	avatar:string;// Avatar
}
```

### Department Select (Department)

Database storage format:

| Field Type | Description |
|--------------------------------------------------------|----------------------------------|
| jsonb | Stores JSON format data. JSON data structure shown below |

In data tables, department select field data is stored in JSON format. If multi-select, it is stored as a JSON array. The JSON structure is as follows:

```ts
interface TableDepartmentSimple {
	id:string;// ID
	name:string;// Name
	shortName:string;// Short name
	path:string;// Path
}
```

### Handwritten Signature (Signature)

Database storage format:

| Field Type | Description |
|--------------------------------------------------------|----------------------------------|
| jsonb | Stores JSON format data. JSON data structure shown below |

In data tables, handwritten signature field data is stored in JSON format. If multi-select, it is stored as a JSON array. The JSON structure is as follows:

```ts
interface TableSignature {
	id:string;// ID
	accountId:string;// Account ID
	accountName:string;// Account name
	uploadTime:Date;// Upload time
	path:string;// Path
}
```

**Example 1: Data stored when multiple signatures are not allowed (single-select)**
```json
{
	"accountId":"skydu2",
	"accountName":"skydu2",
	"id":"vyu0art5s0reflpad09v7.jpg",
	"path":"otxlyqyjacgnx/sr7gnmk90asb2/vyu0art5s0reflpad09v7.jpg",
	"uploadTime":1721359223688
}
```

**Example 2: Data stored when multiple signatures are allowed (multi-select)**
```json
[{
	"accountId":"skydu2",
	"accountName":"skydu2",
	"id":"or3yjjhn0bf98f5uy6j6n.jpg",
	"path":"otxlyqyjacgnx/ffr7s7spbxb76/or3yjjhn0bf98f5uy6j6n.jpg",
	"uploadTime":1721295355794
},
{
	"accountId":"skydu2",
	"accountName":"skydu2",
	"id":"ng326htx6ob2ci2c8e7zv.jpg",
	"path":"otxlyqyjacgnx/ffr7s7spbxb76/ng326htx6ob2ci2c8e7zv.jpg",
	"uploadTime":1721295370334
}]
```

### Geolocation Coordinate (Coordinate)

Database storage format:

| Field Type | Description |
|--------------------------------------------------------|----------------------------------|
| jsonb | Stores JSON format data. JSON data structure shown below |

In data tables, geolocation field data is stored in JSON format. The JSON structure is as follows:
```ts
interface TableCoordinate {
	lng:Number;// Longitude
	lat:Number;// Latitude
    address:string;// Address
}
```

### Formula (Formula)

Can use PostgreSQL functions to combine and calculate a result from other fields. Formula fields are not actually stored; the result is computed dynamically at runtime.

Database storage format: not stored in the database.

### Relation List (Relation)

Used to express weak associations or many-to-many relationships.

### Relation Record (RelationRecord)

Foreign key field, used to reference a record from another table in the current table (stores the target record ID).

Database storage format:

Follows the storage type of the related table's primary key ID (may be integer or string).

| Storage Field Type | Field Type | Description |
|------------------------------|------------------------------|----------------------------------|
| String | varchar(64) | Variable-length string, up to 64 characters |
| Integer | int8 | Integer |

### Relation Record Field (RelationRecordField)

Foreign key field mapping. Reads and displays a specific field value from the target table through the RelationRecord foreign key field (does not store data).
Usage rule: A RelationRecord must be defined first before defining a RelationRecordField that depends on it.

### Lookup List (LookupList)

Lookup list, used to model a collection of child table records in a one-to-many (1:N) relationship. The association condition must be explicitly specified through a filter.

### Children (Children)

Children is a string composed of tags and delimiters, e.g.: recordId1.recordId2.recordId3

- Tag: the parent's record ID
- Path: the tag itself is also the path

For example, the structure of data table department is as follows:

| Field | Type | Description |
|--------|--------|-----------|
| id | String | Record ID |
| name | Single-Line Text | Name |
| parent | Children | Parent-child relationship between departments |

The data in the table is as follows:

| id   | name | parent    |
|------|------|-----------|
| 0000 | Headquarters |           |
| 0001 | Technology Dept | 0000      |
| 0002 | Product Dept | 0000      |
| 0003 | Operations Dept | 0000      |
| 0004 | Technology Team 1 | 0000.0001 |

[Structural Field] Only used to build tree/hierarchical structures within the [same table] (Parent -> Children).
Typical scenarios: organizational structure, department tree, category tree, administrative divisions.
Warning: Children does not represent business relationships, is not equivalent to master-detail tables, cannot span tables, and does not store business data.

### Relation Rollup (RelationRollup)

Performs aggregate statistics on related records based on the Relation (Relation List) field in the current table. Only applicable to one-to-many Relations with a clear direction.

### Lookup Rollup (LookupRollup)

Performs aggregate statistics on child table records based on the child table's RelationRecord foreign key field, and displays the result in the master table (standard 1:N rollup method).

### ID (ID)

ID is a [readable business identifier] for business use, not a database primary key.

Warning: Must remember
- ID is not UUID
- ID is a "business field", UUID is the "system primary key"
- For each "ID" field, the system independently maintains an auto-increment sequence seq

Database storage format:

| Field Type | Description |
|--------------------------------------------------------|----------------------------------|
| varchar(128) | Variable-length string, up to 128 characters |

ID Generation Rules

Each ID field has an auto-increment sequence `seq` automatically generated by the system. Each time a record is created, the `seq` value increments by 1. The ID is calculated by an expression, and the expression's return value is a string.
In the expression, you can use a combination of the current record `record` and `seq` to generate the ID. When no expression is set, the ID equals seq.

**Example 1**
The ID is an incrementing 6-digit number, e.g., T000001
T${String.lpad(seq,6,'0')}

**Example 2**
The ID is an incrementing 6-digit number with a date, e.g., 2024-07-19-000001
${Misc.formatDate(Date.sysdate(),'yyyy-MM-dd')}-${String.lpad(seq,6,'0')}


### Create Time (CreateTime)

Database storage format:

| Field Type | Description |
|--------------------------------------------------------|----------------------------------|
| timestamp(6) | Stores date and time |


### Last Modify Time (LastModifyTime)

Database storage format:

| Field Type | Description |
|--------------------------------------------------------|----------------------------------|
| timestamp(6) | Stores date and time |


### Create User (CreateUser)

The create user field stores the user ID of the user who created the record.

Database storage format:

| Field Type | Description |
|--------------------------------------------------------|----------------------------------|
| varchar(128) | Variable-length string, up to 128 characters |

### Last Modify User (LastModifyUser)

The last modify user field stores the user ID of the user who last modified the record.

Database storage format:

| Field Type | Description |
|--------------------------------------------------------|----------------------------------|
| varchar(128) | Variable-length string, up to 128 characters |
