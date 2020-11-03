## ;TLDR

An app to summarise profitability for the appointments of medical practitioners

Deployed app at [https://admin-cp.herokuapp.com/](https://admin-cp.herokuapp.com/)

---

## Animated demo below

![](/docs/demo.gif)

## Notes

### Design considerations

1. React will be used as the frontend framework to implement the UI behavior requirements
2. Based on the requirements, "out-of-the-box" React APIs is adequate (ie: hooks - useReducer) without the need to introduce additional frameworks on top of what React provides. There will be a "filter" state - that manages what filter criterias. Lastly, there will be a "report" state - that consumes the filter criterias to generate the financial report for each practitioner.
3. Caching is considered when there are many records of practitioner and appoinments to avoid a non-performant UI. Imagine having 100,000 practitioners and each with 100,000 appoitments. Iterating them and calculating financial information on the frontend will be slow.
4. GraphQL would be an option in this case to handle data caching and pagination when displaying a long list of practitioners or appointments. The frontend now can just query what the UI needs to display. This will make UI performant and a smooth experience for the user.
5. Another possiblity is to expose a grapqhQL mutation to perform a server side calculation on financial information (ie: cost, revenue and etc) and the frontend only displays it.
6. [Error boundaries](https://github.com/bvaughn/react-error-boundary) should be placed on react components that fetches data from the server to handle timeouts from a graphQL or server request, in order to display useful error messages to the user.

### Assumptions

1. This is not an UX exercise and focus was placed on demonstrating frontend functionality
2. Basic UX considerations was applied (ie: filter validation)
3. This exercise does not demonstrated how data fetching is handled and any server side data (ie: mocked data provider in `src/data`) is assumed passed in as a prop to the App.js (`src/components/App/`) component. A react hook can be easily implemented to handle data fetching requirements for pracitioners and appoinmtents data.
4. Pagination is not introduced in this exercise as it is not a UX requirement at this stage but would be useful to give an indication to the user how much data is there to look through.

## Instructions

To run on a your local machine

1. Clone this repo
2. run `yarn install`
3. run `yarn start`
4. On a browser, go to `localhost:3000`

To run test

1. run `yarn test`
