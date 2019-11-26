# Berkshire Hathaway Homestate Companies - TSA

## Hosted: 
### https://cameronbrownfield-bhhcse2tsa.web.app/
### https://cameronbrownfield-bhhcse2tsa.firebaseapp.com/

## Services:
### https://us-central1-bhhc-se2-tsa.cloudfunctions.net/api/**

### How to use this document:
1. Checkout the hosted link. 
2. Checkout the trello board: https://trello.com/invite/b/gRWjjUyT/2f71093259d30095295692c8c11b0e03/bhhc-tsa
3. Checkout the files of interest listed below. 
4. Contact me, and let me screen share the deployment process and answer any additional questions you may have. 
---

### Goals: 
- Write an application that displays three or more reasons that you would like to work for BHHC.  Persist the list of reasons and use any means to display them.
- Show off your in-depth knowledge of a particular subject area or tools.
- We are interested in seeing your use of patterns and best practices in the design and coding techniques.
- We want to see the interaction between logical layers: Presentation, Services, & Persistence
- Feel free to reference specific tools and/or libraries (JQuery, Bootstrap, Kendo UI, AutoMapper, Entity Framework, Dapper, Swagger etc.)
- Comment the code to assist us in understanding it.
- Provide sample automated test cases where appropriate.
- Make sure it is your original work and not the intellectual property of someone else.
- Avoid reposting the sample code from a book, blog, question answer site, or training site.
- Join my development board: https://trello.com/invite/b/gRWjjUyT/2f71093259d30095295692c8c11b0e03/bhhc-tsa

---

### Intended Solution Proposal:
#### Persistence Layer
    - Firestore Datastore/SDK
    - Interacted with via CloudFunctions or Services
#### Service
    - Server Services:
        - CloudFunctions
            - Node.js 8.15
        - Testing: Postman/Newman(CI)
    - Local Business Logic:
        - Typescript (Transpiled to Javascript)
        - Mocha/Chai (Unit Testing)
#### Presentation Layer
    - HTML
    - Bootstrap (CSS) 
#### Continuous Integration
    - Github Actions
---

### Noteworthy Files/Dir (For Interviewer Easy Access):
#### This Document
- [README](README.md) 

#### Client Side Scripts & Unit Testing Example
- [Client-Side Scripts](src/) 
- [Client-Side Example Class](src/lib/ArrayUtil.ts)
- [Client-Side Example Unit Testing](src/tests/ArrayUtil.test.ts)
- [Client-Side Compiled Docs](docs/index.html) (Pull down Locally and then Open @docs/index.html)

#### Server Side Index/Services
- [Server-Side Scripts](functions/src)
- [Express and App Configuration](functions/src/index.ts)
- [Services](functions/src/services)
- [Services-NoteService](functions/src/services/NoteService.ts)

#### Presentation Layer (If static would be at public/)
- [Views](functions/views)
- [WebApp Main Page](functions/views/index.hbs)

#### Scripts & Dependencies
- [NPM-Scripts](package.json)
