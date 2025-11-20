# rag-mcp-prototype

A simple RAG pipeline exposed through a simple MCP server.

# Post-prototype features
1. [Add logging and error handling](https://modelcontextprotocol.io/docs/develop/build-server) - This documentation expresses that we should log to a file (winston)
2. Add support for other non markdown documents
3. Swap in-memory vector store for a real vector database
5. Multi-vector capabilities (advanced RAG strategies)
6. Unit tests

# Sources

- [Boilerplate](https://dev.to/wizdomtek/typescript-express-building-robust-apis-with-nodejs-1fln)
- [Vector Store Guide](https://www.geeksforgeeks.org/advance-java/vector-store-api-basics/)
- [Model Context Protocol Guide](https://modelcontextprotocol.io/docs/develop/build-server#node)
- [Using pre-trained models for inference using Pipeline API](https://huggingface.co/docs/transformers.js/en/pipelines)
- [Using Transformers.js with Node](https://huggingface.co/docs/transformers.js/en/tutorials/node)
- [Transformers.js Feature Extraction (extracting Vector features from text)](https://huggingface.co/tasks/feature-extraction)