Client <> API <> knex <> adapter <> DB (Server)

### Object Relational Mapper (ORM)

#### Objects
In Javascript we express an object like this:
```javascript
  const student = {
    name: 'jon',
    email: 'jon@email.com',
    cohorts: ['WEBPT4']
  }
```

#### Relations (Tables)
In a relational model when we think about student it is represented like this:
student row []

Table: Students
| id | name | email |
| --- | --- | --- |
| 1 | 'jon' | 'jon@email.com' |

Table: Cohorts
| id | name |
| --- | --- |
| 1 | WEBPT4 |

Table: CohortAssignments
| id | cohort_id | student_id |
| --- | --- | --- |
| 1 | 1 | 1

- ORMs include a Query Builder

- Query Builders translates between a programming language and SQL

#### Steps
- [x] Create a database
- [x] Add roles table to the DB
- [x] Install knex
- [x] Configure knex to talk to our DB
- [x] List all roles
- [x] Add a role
- [x] List a role by id
- [x] Update a role
- [x] Remove a role
