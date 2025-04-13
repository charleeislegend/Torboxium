import { ApiKey } from "./apikey.ts";

export class TmdbApi {
    async GetImdbIdByTmdbId(showId: number): Promise<string | null> {
        const showDetailsUrl = `https://api.themoviedb.org/3/tv/${showId}/external_ids?api_key=${ApiKey.TmdbApiKey}`;
        try {
            const detailsResponse = await fetch(showDetailsUrl);
            
            if (!detailsResponse.ok) {
                if (detailsResponse.status === 401) {
                    throw new Error("TMDB API error: Invalid API key.");
                } else if (detailsResponse.status === 404) {
                    throw new Error(
                        `TMDB API error: Show not found with ID ${showId}.`,
                    );
                } else if (detailsResponse.status === 429) {
                    throw new Error("TMDB API error: Rate limit exceeded.");
                } else {
                    throw new Error(
                        `TMDB API error: ${detailsResponse.status} - ${detailsResponse.statusText}`,
                    );
                }
            }

            const detailsData = await detailsResponse.json();
            const imdbId: string | undefined = detailsData.imdb_id;
            
            if (imdbId) {
                return imdbId;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    }

    async SearchShows(query: string) {
        const encodedQuery = encodeURIComponent(query);
        const searchUrl = `https://api.themoviedb.org/3/search/tv?api_key=${ApiKey.TmdbApiKey}&query=${encodedQuery}`;

        try {
            const searchResponse = await fetch(searchUrl);

            if (!searchResponse.ok) {
                if (searchResponse.status === 401) {
                    throw new Error("TMDB API error: Invalid API key.");
                } else if (searchResponse.status === 429) {
                    throw new Error("TMDB API error: Rate limit exceeded.");
                } else {
                    throw new Error(
                        `TMDB API error: ${searchResponse.status} - ${searchResponse.statusText}`,
                    );
                }
            }

            const searchData = await searchResponse.json();

            if (searchData.results && searchData.results.length > 0) {
                return searchData.results;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    }
}