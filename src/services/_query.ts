import { SqlDatabase } from "langchain/sql_db";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { Ollama } from "@langchain/ollama";




const _getLLMChain = (llmUrl: string):Ollama => {
  return new Ollama({
      model: "llama3",
      temperature: 0,
      baseUrl: llmUrl,
    });
}


const _prepareInitialPrompt = () => {
  return   PromptTemplate.fromTemplate(`Based on the provided SQL table schema below, give answer.
    ------------
    SCHEMA: {schema}
    ------------
    QUESTION: {question}`);
}


const _getSqlQueryChain = (sqlDb: SqlDatabase, llm: Ollama) => {
    const prompt = _prepareInitialPrompt()
    const sqlQueryChain = RunnableSequence.from([
        {
          schema: async () => sqlDb.getTableInfo(),
          question: (input: { question: string }) => input.question,
        },
        prompt,
        llm.bind({ stop: ["\nSQLResult:"] }),
        new StringOutputParser(),
      ]);
    return sqlQueryChain
}



export const query = async (db: SqlDatabase, question: string, llmUrl: string) => {
  const llm:Ollama = _getLLMChain(llmUrl)
  const sqlQueryChain = _getSqlQueryChain(db, llm)
  const result = await sqlQueryChain.invoke({ question });
  return result;
}