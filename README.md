# AI DB Search

**AI DB Search** is an open-source project that allows you to input natural language text and search for relevant answers in a local database by dynamically generating SQL queries. Built with TypeScript, this project provides a simple and flexible way to interact with databases using natural language queries.

## Features

- Automatic generation of SQL queries from natural language input
- Seamless local database search functionality
- Easy integration into TypeScript projects

## Installation

To install **AI DB Search**, use npm:

```bash
npm install ai-db-search
```


## Usage
Here’s an example of how to use AI DB Search:

```
import { query, connectDb } from 'ai-db-search';

//connecting with db
let db = connectDb({type:"sqlite", "database":"./sqldb.sqlite"});
```

The connectDb function accepts DataSourceOptions as a parameter. For detailed configuration options, refer to the [DataSourceOptions Documetation](https://orkhan.gitbook.io/typeorm/docs/data-source-options)
<br>

### Example Query
To generate AI-driven SQL queries, you’ll need to connect to an LLM service.[Groq](https://groq.com/) offers APIs to interact with Llama models hosted in the cloud.
<br>
Here’s how to execute a query:

```
let result = query(db, 'how many dogs who are missing from home in ahmedabad ?', '');
```
