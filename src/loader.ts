import { promises as fs } from "fs";

interface Document {
	path: string;
	content: string;
	hash: string;
	embedding?: number[];
}

type Cache = Record<string, Document>;

/**
 * Manages document loading and change detection for RAG pipeline.
 * Handles file watching, hash-based caching, and determining which
 * documents need reprocessing.
 */
export class DocumentLoader {
	#docsDir: string;
	#cacheDir: string;
	#cache: Cache = {};

	constructor(docsDir: string, cacheDir: string) {
		this.#docsDir = docsDir;
		this.#cacheDir = cacheDir;
	}

	#fetchCache(): void {}

	#fetchDocuments(): Document[] {
		// pull all files in the docs/ directory including the cache.json file

		// return all files
		return [];
	}

	/**
	 * Processes a document and handles the cache.
	 */
	#processDocument(doc: Document) {}
}
