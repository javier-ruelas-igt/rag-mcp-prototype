import express from "express";
import { VectorStore } from "./store";
import { DocumentLoader } from "./loader";
import { TextSplitter } from "./splitter";
import { Embedder } from "./embedder";

const app = express();
const port = process.env.PORT || 3000;

const docsDir = "./docs";
const cacheDir = "./cache";

const store: VectorStore = new VectorStore();
const loader: DocumentLoader = new DocumentLoader(docsDir, cacheDir);
const splitter = new TextSplitter();
const embedder = new Embedder();

/**
 * Initializes our RAG pipeline.
 */
// async function initialize() {
// 	const documentsToProcess = await loader.loadDocuments();
// 	documentsToProcess.forEach((doc) => {
// 		const chunks = await splitter.split(doc);
// 		chunks.forEach((chunk) => {
// 			const embedding = await embedder.embed()
// 			store.add(embedding);
// 		})
// 	})
// }

app.listen(port, () => {
	console.log(`MCP Server running on port ${port}`);
});
