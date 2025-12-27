export function countWordsInParagraph(paragraph: string): number {
	// Extraire tous les mots du paragraphe (ignorer la ponctuation)
	const words = paragraph
		.split(/\s+/)
		.map(word => word.replace(/[^A-Za-zÀ-ÿ]/g, ""))
		.filter(word => word.length > 0);

	return words.length;
}

