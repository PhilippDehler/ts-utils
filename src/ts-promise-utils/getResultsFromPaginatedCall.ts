export async function* getAllResultsFromPaginatedCall<TPage>(
  loadNextPage: (
    previousPage: TPage | null,
    allLoadedPages: TPage[],
  ) => Promise<TPage>,
  hasNextPage: (previousPage: TPage, allLoadedPages: TPage[]) => boolean,
): AsyncGenerator<TPage> {
  let nextPageExists = true;
  const pages: TPage[] = [];
  while (nextPageExists) {
    const previousPage = pages.at(-1) ?? null;
    const page = await loadNextPage(previousPage, pages);
    pages.push(page);
    nextPageExists = hasNextPage(page, pages);
    yield page;
  }
  return pages;
}
